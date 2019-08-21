import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { getRepository,getConnection } from 'typeorm';
import { validationMiddleware, redisMiddleware } from '../middlewares';
import {
  InternalServerErrorException,
  NoDataFoundException,
} from '../exceptions';
import { Global } from "../global";

import { BlockchainInput } from '../entities';
import {
  BlockchainInputCreateDto,
  BlockchainInputSingleViewDto,
  BlockchainInputUpdateDto,
  BlockchainInputPaginationDto,
} from '../dtos';
import { Paginate } from '../utils';

export class BlockchainInputController {
  public path = '/blockchain_input';
  public router = express.Router();

  constructor() {
    this.IntializeRoutes();
  }

  public IntializeRoutes() {
    /**
     * @swagger
     * /epic_explorer/v1/blockchain_input:
     *   post:
     *     tags:
     *       - name: BLOCKCHAIN_INPUT | BLOCKCHAIN_INPUT CONTROLLER
     *     summary: create a blockchain_input
     *     description: create a blockchain_input
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: BlockchainInput
     *         description: create a blockchain_input
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/BlockchainInputDto'
     *     responses:
     *       200:
     *         description: blockchain_input created successfully
     * definitions:
     *   BlockchainInputDto:
     *    description: Dto
     *    properties:
     *      Id:
     *           type: integer
     *      Data:
     *           type: string
     *      Block:
     *           type: string
     */

    this.router.post(
      `${this.path}`,
      validationMiddleware(BlockchainInputCreateDto),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.BlockchainInputCreate,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_input/list:
     *   get:
     *     tags:
     *       - name: BLOCKCHAIN_INPUT | BLOCKCHAIN_INPUT CONTROLLER
     *     description: pagination blockchain_input
     *     summary: pagination blockchain_input
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
     *         description: blockchain_input list fetched successfully
     */
    this.router.get(
      `${this.path}/list`,
      validationMiddleware(BlockchainInputPaginationDto),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.BlockchainInputPagination,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_input/id:
     *   get:
     *     tags:
     *       - name: BLOCKCHAIN_INPUT | BLOCKCHAIN_INPUT CONTROLLER
     *     summary:  get single blockchain_input
     *     description: get single blockchain_input
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Id
     *         in: path
     *         description: blockchain_input id
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: blockchain_input successfully fetched for given id..
     */
    this.router.get(
      `${this.path}/:id`,
      validationMiddleware(BlockchainInputSingleViewDto),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.BlockchainInputFetch,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_input:
     *   patch:
     *     tags:
     *       - name: BLOCKCHAIN_INPUT | BLOCKCHAIN_INPUT CONTROLLER
     *     summary:  update a blockchain_input
     *     description:  update a blockchain_input
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: blockchain_input
     *         description:
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/BlockchainInputDto'
     *     responses:
     *       200:
     *         description: blockchain_input updated successfully
     */
    this.router.patch(
      `${this.path}`,
      validationMiddleware(BlockchainInputUpdateDto),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.BlockchainInputUpdate,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_input/id:
     *   delete:
     *     tags:
     *       - name: BLOCKCHAIN_INPUT | BLOCKCHAIN_INPUT CONTROLLER
     *     summary:  delete a blockchain_input
     *     description: delete a blockchain_input
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Id
     *         in: path
     *         description: blockchain_input id
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: blockchain_input successfully deleted for given id..
     */
    this.router.delete(
      `${this.path}/:id`,
      validationMiddleware(BlockchainInputSingleViewDto),
      redisMiddleware(process.env.REDIS_EXPIRY),
      this.BlockchainInputDelete,
    );
  }

  private BlockchainInputCreate = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainInputRequestData: BlockchainInputCreateDto = request.body;
      const BlockchainInputCreateQuery = await getConnection(Global.network).getRepository(
        BlockchainInput,
      ).save(BlockchainInputRequestData);
      response.status(200).json({
        status: 200,
        timestamp: Date.now(),
        message: 'blockchain_input created successfully',
        response: BlockchainInputCreateQuery,
      });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainInputFetch = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainInputFetchQuery = await getConnection(Global.network).getRepository(
        BlockchainInput,
      ).findOne({
        where: { id: request.params.id },
      });
      BlockchainInputFetchQuery
        ? response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'blockchain_inputsuccessfully fetched for given id.',
            response: { ...BlockchainInputFetchQuery },
          })
        : next(new NoDataFoundException());
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainInputUpdate = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainInputRequestData: BlockchainInputUpdateDto = request.body;
      const BlockchainInputUpdateQuery = await getConnection(Global.network).getRepository(
        BlockchainInput,
      ).update(BlockchainInputRequestData.Id, BlockchainInputRequestData);
      response.status(200).json({
        status: 200,
        timestamp: Date.now(),
        message: 'blockchain_input updated succesfully',
        response: { ...BlockchainInputUpdateQuery },
      });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainInputDelete = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainInputDeleteQuery = await getConnection(Global.network).getRepository(
        BlockchainInput,
      ).delete(request.params.Id);
      BlockchainInputDeleteQuery
        ? response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'blockchain_input successfully deleted for given id.',
            response: { ...BlockchainInputDeleteQuery },
          })
        : next(new NoDataFoundException());
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainInputPagination = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainInputRequestData: BlockchainInputPaginationDto =
        request.query;
      const BlockchainInputCountQuery = await getConnection(Global.network).getRepository(
        BlockchainInput,
      ).findAndCount({});
      if (BlockchainInputCountQuery[1]) {
        const PaginationReponseData = Paginate(
          BlockchainInputCountQuery[1],
          BlockchainInputRequestData.CurrentPage,
          BlockchainInputRequestData.PageSize,
          BlockchainInputRequestData.MaxPages,
        );
        const BlockchainInputPaginationQuery = await getConnection(Global.network).getRepository(
          BlockchainInput,
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
          message: 'blockchain_input list fetched successfully',
          response: {
            ...PaginationReponseData,
            ...BlockchainInputPaginationQuery,
          },
        });
      } else {
        next(new NoDataFoundException());
      }
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };
}
