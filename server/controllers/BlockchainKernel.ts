import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { validationMiddleware, redisMiddleware } from '../middlewares';
import { Global } from "../global";
import * as path from 'path';
import {
  InternalServerErrorException,
  NoDataFoundException,
} from '../exceptions';
import { BlockchainKernel } from '../entities';
import {
  BlockchainKernelCreateDto,
  BlockchainKernelSingleViewDto,
  BlockchainKernelUpdateDto,
  BlockchainKernelPaginationDto,
  TransactionFeeDto,
} from '../dtos';
import { Paginate } from '../utils';
const http = require('http');

var moment = require('moment');

export class BlockchainKernelController {
  public path = '/blockchain_kernel';
  public router = express.Router();

  constructor() {
    this.IntializeRoutes();
  }

  IsJsonString(str) {
    try {
     var dataJson = JSON.parse(str);
    } catch (e) {
        return [];
    }
    return dataJson;
  }

  public IntializeRoutes() {
    /**
     * @swagger
     * /epic_explorer/v1/blockchain_kernel:
     *   post:
     *     tags:
     *       - name: BLOCKCHAIN_KERNEL | BLOCKCHAIN_KERNEL CONTROLLER
     *     summary: create a blockchain_kernel
     *     description: create a blockchain_kernel
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: BlockchainKernel
     *         description: create a blockchain_kernel
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/BlockchainKernelDto'
     *     responses:
     *       200:
     *         description: blockchain_kernel created successfully
     * definitions:
     *   BlockchainKernelDto:
     *    description: Dto
     *    properties:
     *      Id:
     *           type: integer
     *      Features:
     *           type: string
     *      Fee:
     *           type: integer
     *      LockHeight:
     *           type: integer
     *      Excess:
     *           type: string
     *      ExcessSig:
     *           type: string
     *      Block:
     *           type: string
     */

    this.router.post(
      `${this.path}`,
      validationMiddleware(BlockchainKernelCreateDto),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.BlockchainKernelCreate,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_kernel/transactionfee:
     *   get:
     *     tags:
     *       - name: BLOCKCHAIN_KERNEL | BLOCKCHAIN_KERNEL CONTROLLER
     *     summary: create a blockchain_kernel
     *     description: create a blockchain_kernel
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: FromDate
     *         description: Enter the From date
     *         in: query
     *         type: string
     *       - name: ToDate
     *         description: Enter the To date
     *         in: query
     *         type: string
     *       - name: Interval
     *         description: Try to give Intevals such as 1 week/ 15 days/ 30 days/ 60 days/ 3 months
     *         in: query
     *         type: string
     *     responses:
     *       200:
     *         description: Transaction fee chart fetched successfully
     */
    this.router.get(
      `${this.path}/transactionfee`,
      validationMiddleware(TransactionFeeDto, true),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.TransactionFee,
    );

    /**
     * @swagger
     * /epic_explorer/v1/translator:
     *   get:
     *     tags:
     *       - name: Translator | Translator CONTROLLER
     *     summary: create a translator
     *     description: create a translator
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: lang
     *     responses:
     *       200:
     *         description: Transaction fee chart fetched successfully
     */
    this.router.get(
      `${this.path}/translator`,
      this.Translator,
    );


     /**
     * @swagger
     * /epic_explorer/v1/network:
     *   get:
     *     tags:
     *       - name: Network | Network CONTROLLER
     *     summary: change a network
     *     description: change a network
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: network
     *     responses:
     *       200:
     *         description: Network Changed successfully
     */
    this.router.get(
      `${this.path}/network`,
      this.changeNetwok,
    );

    /**
     * @swagger
     * /epic_explorer/v1/getpeers:
     *   get:
     *     tags:
     *       - name: Translator | Translator CONTROLLER
     *     summary: create a translator
     *     description: create a translator
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: lang
     *     responses:
     *       200:
     *         description: Transaction fee chart fetched successfully
     */
    this.router.get(
      `${this.path}/getpeers`,
      redisMiddleware(3600),
      this.getPeers,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_kernel/transactionheatmap:
     *   get:
     *     tags:
     *       - name: BLOCKCHAIN_KERNEL | BLOCKCHAIN_KERNEL CONTROLLER
     *     summary: Transaction Heatmap
     *     description: Transaction Heatmap (Input/output/kernal)
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Transaction heatmap chart fetched successfully
     */
    this.router.get(
      `${this.path}/transactionheatmap`,
      validationMiddleware(TransactionFeeDto, true),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.HeatmapChart,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_kernel/transactionlinechart:
     *   get:
     *     tags:
     *       - name: BLOCKCHAIN_KERNEL | BLOCKCHAIN_KERNEL CONTROLLER
     *     summary: Transaction line chart
     *     description: Transaction line chart
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: FromDate
     *         description: Enter the From date
     *         in: query
     *         type: string
     *       - name: ToDate
     *         description: Enter the To date
     *         in: query
     *         type: string
     *       - name: Interval
     *         description: Try to give Intevals such as 1 week/ 15 days/ 30 days/ 60 days/ 3 months
     *         in: query
     *         type: string
     *     responses:
     *       200:
     *         description: Transaction line chart fetched successfully
     */
    this.router.get(
      `${this.path}/transactionlinechart`,
      validationMiddleware(TransactionFeeDto, true),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.TransactionChart,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_kernel/list:
     *   get:
     *     tags:
     *       - name: BLOCKCHAIN_KERNEL | BLOCKCHAIN_KERNEL CONTROLLER
     *     description: pagination blockchain_kernel
     *     summary: pagination blockchain_kernel
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: current_page
     *         description: current page specification
     *         in: query
     *         type: integer
     *         required: true
     *       - name: page_size
     *         description: page size specification
     *         in: query
     *         type: integer
     *         required: true
     *       - name: max_pages
     *         description: max pages specification
     *         in: query
     *         type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: blockchain_kernel list fetched successfully
     */
    this.router.get(
      `${this.path}/list`,
      validationMiddleware(BlockchainKernelPaginationDto),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.BlockchainKernelPagination,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_kernel/id:
     *   get:
     *     tags:
     *       - name: BLOCKCHAIN_KERNEL | BLOCKCHAIN_KERNEL CONTROLLER
     *     summary:  get single blockchain_kernel
     *     description: get single blockchain_kernel
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Id
     *         in: path
     *         description: blockchain_kernel id
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: blockchain_kernel successfully fetched for given id..
     */
    this.router.get(
      `${this.path}/:id`,
      validationMiddleware(BlockchainKernelSingleViewDto),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.BlockchainKernelFetch,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_kernel:
     *   patch:
     *     tags:
     *       - name: BLOCKCHAIN_KERNEL | BLOCKCHAIN_KERNEL CONTROLLER
     *     summary:  update a blockchain_kernel
     *     description:  update a blockchain_kernel
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: blockchain_kernel
     *         description:
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/BlockchainKernelDto'
     *     responses:
     *       200:
     *         description: blockchain_kernel updated successfully
     */
    this.router.patch(
      `${this.path}`,
      validationMiddleware(BlockchainKernelUpdateDto),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.BlockchainKernelUpdate,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_kernel/id:
     *   delete:
     *     tags:
     *       - name: BLOCKCHAIN_KERNEL | BLOCKCHAIN_KERNEL CONTROLLER
     *     summary:  delete a blockchain_kernel
     *     description: delete a blockchain_kernel
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Id
     *         in: path
     *         description: blockchain_kernel id
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: blockchain_kernel successfully deleted for given id..
     */
    this.router.delete(
      `${this.path}/:id`,
      validationMiddleware(BlockchainKernelSingleViewDto),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.BlockchainKernelDelete,
    );
  }

  private BlockchainKernelCreate = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainKernelRequestData: BlockchainKernelCreateDto =
        request.body;
      const BlockchainKernelCreateQuery = await getConnection(Global.network).getRepository(
        BlockchainKernel,
      ).save(BlockchainKernelRequestData);
      response.status(200).json({
        status: 200,
        timestamp: Date.now(),
        message: 'blockchain_kernel created successfully',
        response: BlockchainKernelCreateQuery,
      });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainKernelFetch = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainKernelFetchQuery = await getConnection(Global.network).getRepository(
        BlockchainKernel,
      ).findOne({
        where: { id: request.params.id },
      });
      BlockchainKernelFetchQuery
        ? response.status(200).json({
          status: 200,
          timestamp: Date.now(),
          message: 'blockchain_kernelsuccessfully fetched for given id.',
          response: { ...BlockchainKernelFetchQuery },
        })
        : next(new NoDataFoundException());
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainKernelUpdate = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainKernelRequestData: BlockchainKernelUpdateDto =
        request.body;
      const BlockchainKernelUpdateQuery = await getConnection(Global.network).getRepository(
        BlockchainKernel,
      ).update(BlockchainKernelRequestData.Id, BlockchainKernelRequestData);
      response.status(200).json({
        status: 200,
        timestamp: Date.now(),
        message: 'blockchain_kernel updated succesfully',
        response: { ...BlockchainKernelUpdateQuery },
      });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainKernelDelete = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainKernelDeleteQuery = await getConnection(Global.network).getRepository(
        BlockchainKernel,
      ).delete(request.params.Id);
      BlockchainKernelDeleteQuery
        ? response.status(200).json({
          status: 200,
          timestamp: Date.now(),
          message: 'blockchain_kernel successfully deleted for given id.',
          response: { ...BlockchainKernelDeleteQuery },
        })
        : next(new NoDataFoundException());
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainKernelPagination = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainKernelRequestData: BlockchainKernelPaginationDto =
        request.query;
      const BlockchainKernelCountQuery = await getConnection(Global.network).getRepository(
        BlockchainKernel,
      ).findAndCount({});
      if (BlockchainKernelCountQuery[1]) {
        const PaginationReponseData = Paginate(
          BlockchainKernelCountQuery[1],
          BlockchainKernelRequestData.CurrentPage,
          BlockchainKernelRequestData.PageSize,
          BlockchainKernelRequestData.MaxPages,
        );
        const BlockchainKernelPaginationQuery = await getConnection(Global.network).getRepository(
          BlockchainKernel,
        ).find({
          skip: PaginationReponseData.startIndex,
          take: PaginationReponseData.pageSize,
          order: {
            Id: 'DESC',
          },
        });
        response.status(200).json({
          status: 200,
          timestamp: Date.now(),
          message: 'blockchain_kernel list fetched successfully',
          response: {
            ...PaginationReponseData,
            ...BlockchainKernelPaginationQuery,
          },
        });
      } else {
        next(new NoDataFoundException());
      }
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private changeNetwok = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      Global.network = request.query.network;
      console.log(Global.network);
      //const network = request.query.network;
      response.status(200).json({
        status: 200,
        timestamp: Date.now(),
        message: 'Network Changed successfully',
        response: request.query.network,
      });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };
  private Translator = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const lang = request.query.lang;

      /*  response.status(200).json({
          status: 200,
          timestamp: Date.now(),
          message: 'Transaction fee chart fetched successfully',
          response: {
            lang: lang
          },
        }); */
      console.log(path.resolve(__dirname + '/../i18n/' + request.query.lang + '.json'));
      console.log("Without :", path.resolve('/../i18n/' + request.query.lang + '.json'));
      response.header("Content-Type", 'application/json');
      response.sendFile(path.resolve(__dirname + '/../i18n/' + request.query.lang + '.json'));

    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private getPeers = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    var self = this;
    try {
      if(Global.network == "Floonet"){
          var peer_url = process.env.FLOONET_PEER_URL;
      }else{
        var peer_url = process.env.TESTNET_PEER_URL;
      }
      http.get(peer_url,
      async (resp) => {
        // console.log('resp resp respresp',resp);
        let data = '';
        let result ;

        // A chunk of data has been recieved.
        await new Promise((resolve) => {
        resp.on('data', function (chunk) {
           data += chunk;

           let dataJson = self.IsJsonString(data);
           if(dataJson.length > 0){

          result = dataJson.map(function (value, i) {
              value['id'] = i;
              return value;
           });
         }
         resolve();
         });
      });
        response.status(200).json({
          status: 200,
          timestamp: Date.now(),
          message: 'Peers list fetched successfully',
          response: {
          dataJson:  result
          },
        });
      });
    } catch (error) {
      console.log('error 3###########', error);
      next(new InternalServerErrorException(error));
    }
  };


  private TransactionFee = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const TransactionFeeRequestData: TransactionFeeDto = request.query;
      if (TransactionFeeRequestData.Interval) {
        var timeIntervalQry =
          "timestamp > current_date - interval '" +
          TransactionFeeRequestData.Interval +
          "'";
      } else if (
        TransactionFeeRequestData.FromDate ||
        TransactionFeeRequestData.ToDate
      ) {
        let fromdate = moment(TransactionFeeRequestData.FromDate)
          .utc()
          .format('YYYY-MM-DD');
        let todate = moment(TransactionFeeRequestData.ToDate)
          .utc()
          .format('YYYY-MM-DD');

        var timeIntervalQry =
          'timestamp BETWEEN SYMMETRIC ' + fromdate + ' AND ' + todate;
      } else {
        var timeIntervalQry = "timestamp > current_date - interval '30 days'";
      }
      const TransactionFeeQuery = await getConnection(Global.network)
        .query(
          "select 1 as hash, date(DATE_TRUNC('day', timestamp)) as date, sum(fee)/1000000 as fee \
            from blockchain_block t1 join blockchain_kernel t2 on t2.block_id=t1.hash  where " +
          timeIntervalQry +
          "group by DATE_TRUNC('day', timestamp) order by date",
        )
        .catch(err_msg => {
          next(err_msg);
        });
      let date = [],
        Fee = [];
      TransactionFeeQuery.forEach(e => {
        date.push(moment(e.date).format('YYYY-MM-DD'));
        Fee.push(parseInt(e.fee));
      });

      if(date.length == 0){
        date = [moment(Date.now()).format('YYYY-MM-DD')];
        Fee = [0];
      }
      response.status(200).json({
        status: 200,
        timestamp: Date.now(),
        message: 'Transaction fee chart fetched successfully',
        response: {
          Date: date,
          Fee: Fee,
        },
      });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private HeatmapChart = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      // const TransactionFeeRequestData: TransactionFeeDto = request.query;
      // if (TransactionFeeRequestData.Interval) {
      //   var timeIntervalQry =
      //     "timestamp > current_date - interval '" +
      //     TransactionFeeRequestData.Interval +
      //     "'";
      // } else if (
      //   TransactionFeeRequestData.FromDate ||
      //   TransactionFeeRequestData.ToDate
      // ) {
      let fromdate = moment()
        .subtract(7, 'd')
        .format('YYYY-MM-DD');
      let todate = moment()
        .subtract(1, 'd')
        .format('YYYY-MM-DD');

      // var timeIntervalQry =
      //   'timestamp BETWEEN SYMMETRIC ' + fromdate + ' AND ' + todate;
      // } else {
      //   var timeIntervalQry = "timestamp > current_date - interval '30 days'";
      // }
      const TransactionHeatmapChartQuery = await getConnection(Global.network)
        .query(
          "with hours as ( \
            SELECT generate_series('" +
          fromdate +
          " 00:00:00'::timestamp, '" +
          todate +
          " 23:00:00', '1 hours') as hour ) select hours.hour, t1.totalinput, t1.totalkernal, t1.totaloutput \
            from hours left join(select to_char(x.timestamp,'YYYY-MM-DD HH24:00:00') as hour_of_day ,\
                    SUM(x.input_count) as totalinput, SUM(x.kernal_count) as totalkernal, SUM(x.output_count) as totaloutput\
            from ( SELECT blockchain_block.hash, \
              blockchain_block.timestamp, \
              sum(bi.block_id_count)  AS input_count,\
sum(bk.block_id_count) AS kernal_count, \
              sum(bo.block_id_count) AS output_count \
       FROM   blockchain_block \
              LEFT JOIN (select block_id, count(block_id) as block_id_count from blockchain_input group by block_id) as bi  \
                     ON blockchain_block.hash = \
                        bi.block_id  \
LEFT JOIN (select block_id, count(block_id) as block_id_count from blockchain_kernel where features != 'Coinbase' group by block_id) as bk  \
                     ON blockchain_block.hash = \
                        bk.block_id \
LEFT JOIN (select block_id, count(block_id) as block_id_count from blockchain_output where output_type != 'Coinbase' group by block_id) as bo \
                     ON blockchain_block.hash = \
                        bo.block_id WHERE blockchain_block.timestamp >= '" +
          fromdate +
          " 00:00:00' \
                          AND blockchain_block.timestamp <= '" +
          todate +
          " 23:59:59' \
       GROUP  BY blockchain_block.hash \
       ORDER  BY blockchain_block.timestamp DESC ) as x \
                group by to_char(x.timestamp,'YYYY-MM-DD HH24:00:00') \
                order by hour_of_day asc) as t1 on to_timestamp(t1.hour_of_day, 'YYYY-MM-DD HH24:00:00') = hours.hour",
        )
        .catch(err_msg => {
          next(err_msg);
        });
      let date = [],
        hour = [],
        totalinput = [],
        totalkernal = [],
        totaloutput = [],
        innerhour = [],
        innertotalinput = [],
        innertotalkernal = [],
        innertotaloutput = [],
        prev_date = '';

      //   for(var i=0 ; i < 7 ; i++){
      //     date.push(moment().subtract(7, 'days').add(i, 'days').format('YYYY-MM-DD'));
      //  }

      TransactionHeatmapChartQuery.forEach(e => {
        var dateformat = moment(e.hour)
          .format('YYYY-MM-DD HH')
          .split(' ');

        if (date.indexOf(dateformat[0]) >= 0 && prev_date == dateformat[0]) {
          innerhour.push(dateformat[1]);
          innertotalinput.push(e.totalinput != null ? e.totalinput : 0);
          innertotalkernal.push(e.totalkernal != null ? e.totalkernal : 0);
          innertotaloutput.push(e.totaloutput != null ? e.totaloutput : 0);
        } else {
          date.push(dateformat[0]);
          innerhour.length > 0 ? hour.push(innerhour) : '';
          innertotalinput.length > 0 ? totalinput.push(innertotalinput) : '';
          innertotalkernal.length > 0 ? totalkernal.push(innertotalkernal) : '';
          innertotaloutput.length > 0 ? totaloutput.push(innertotaloutput) : '';
          (innerhour = []),
            (innertotalinput = []),
            (innertotalkernal = []),
            (innertotaloutput = []);
          innerhour.push(dateformat[1]);
          innertotalinput.push((e.totalinput! = null ? e.totalinput : 0));
          innertotalkernal.push(e.totalkernal != null ? e.totalkernal : 0);
          innertotaloutput.push(e.totaloutput != null ? e.totaloutput : 0);
          prev_date = dateformat[0];
        }
      });
      hour.push(innerhour);
      totalinput.push(innertotalinput);
      totalkernal.push(innertotalkernal);
      totaloutput.push(innertotaloutput);

      response.status(200).json({
        status: 200,
        timestamp: Date.now(),
        message: 'Transaction heatmap chart fetched successfully',
        response: {
          date,
          hour,
          totalinput,
          totalkernal,
          totaloutput,
        },
      });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private TransactionChart = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const TransactionFeeRequestData: TransactionFeeDto = request.query;
      if (TransactionFeeRequestData.Interval) {
        var timeIntervalQry =
          "blockchain_block.timestamp > current_date - interval '" +
          TransactionFeeRequestData.Interval +
          "'";
        var seriesquery =
          "now() - interval '" +
          TransactionFeeRequestData.Interval +
          "', now()";
      } else if (
        TransactionFeeRequestData.FromDate ||
        TransactionFeeRequestData.ToDate
      ) {
        var timeIntervalQry =
          'blockchain_block.timestamp BETWEEN SYMMETRIC ' +
          TransactionFeeRequestData.FromDate +
          ' AND ' +
          TransactionFeeRequestData.ToDate;
        var seriesquery =
          "'" +
          TransactionFeeRequestData.FromDate +
          "'::timestamp, '" +
          TransactionFeeRequestData.ToDate +
          "'";
      } else {
        var timeIntervalQry =
          "blockchain_block.timestamp > current_date - interval '30 days'";
        var seriesquery = "now() - interval '30 days', now()";
      }
      const TransactionHeatmapChartQuery = await getConnection(Global.network)
        .query(
          'with hours as ( SELECT hour::date from generate_series(' +
          seriesquery +
          ", '1 day') as hour) select hours.hour, \
              t1.totalinput, \
              t1.totalkernal, \
              t1.totaloutput \
            from hours left join(select to_char(x.timestamp,'YYYY-MM-DD') as hour_of_day , \
                    SUM(x.input_count) as totalinput, SUM(x.kernal_count) as totalkernal, SUM(x.output_count) as totaloutput \
            from (  SELECT blockchain_block.hash, \
              blockchain_block.timestamp, \
              sum(bi.block_id_count)  AS input_count,\
sum(bk.block_id_count) AS kernal_count, \
              sum(bo.block_id_count) AS output_count \
       FROM   blockchain_block \
              LEFT JOIN (select block_id, count(block_id) as block_id_count from blockchain_input group by block_id) as bi  \
                     ON blockchain_block.hash = \
                        bi.block_id  \
LEFT JOIN (select block_id, count(block_id) as block_id_count from blockchain_kernel where features != 'Coinbase' group by block_id) as bk  \
                     ON blockchain_block.hash = \
                        bk.block_id \
LEFT JOIN (select block_id, count(block_id) as block_id_count from blockchain_output where output_type != 'Coinbase' group by block_id) as bo \
                     ON blockchain_block.hash = \
                        bo.block_id WHERE " +
          timeIntervalQry +
          " \
       GROUP  BY blockchain_block.hash \
       ORDER  BY blockchain_block.timestamp DESC) as x \
                group by to_char(x.timestamp,'YYYY-MM-DD') \
                order by hour_of_day asc) as t1 on to_timestamp(t1.hour_of_day, 'YYYY-MM-DD') = hours.hour",
        )
        .catch(err_msg => {
          next(err_msg);
        });
      let date = [],
        totalinput = [],
        totalkernal = [],
        totaloutput = [];

      TransactionHeatmapChartQuery.forEach(e => {
        date.push(moment(e.hour).format('YYYY-MM-DD'));
        totalinput.push(e.totalinput != null ? e.totalinput : 0);
        totalkernal.push(e.totalkernal != null ? e.totalkernal : 0);
        totaloutput.push(e.totaloutput != null ? e.totaloutput : 0);
      });

      response.status(200).json({
        status: 200,
        timestamp: Date.now(),
        message: 'Transaction chart fetched successfully',
        response: {
          date,
          totalinput,
          totalkernal,
          totaloutput,
        },
      });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };
}
