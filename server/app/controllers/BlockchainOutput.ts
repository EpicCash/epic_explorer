import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { validationMiddleware } from '../middlewares';
import {
  InternalServerErrorException,
  NoDataFoundException,
} from '../exceptions';
import { BlockchainOutput } from '../entities';
import {
  BlockchainOutputCreateDto,
  BlockchainOutputSingleViewDto,
  BlockchainOutputUpdateDto,
  BlockchainOutputPaginationDto,
} from '../dtos';
import { Paginate } from '../utils';

export class BlockchainOutputController {
  public path = '/public';
  public router = express.Router();

  constructor() {
    this.IntializeRoutes();
  }

  public IntializeRoutes() {
    /**
     * @swagger
     * /epic_explorer/v1/blockchain_output:
     *   post:
     *     tags:
     *       - name: BLOCKCHAIN_OUTPUT | BLOCKCHAIN_OUTPUT CONTROLLER
     *     summary: create a blockchain_output
     *     description: create a blockchain_output
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: BlockchainOutput
     *         description: create a blockchain_output
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/BlockchainOutputDto'
     *     responses:
     *       200:
     *         description: blockchain_output created successfully
     * definitions:
     *   BlockchainOutputDto:
     *    description: Dto
     *    properties:
     *      Id:
     *           type: integer
     *      OutputType:
     *           type: string
     *      Commit:
     *           type: string
     *      Spent:
     *           type: string
     *      ProofHash:
     *           type: string
     *      Block:
     *           type: string
     *      MerkleProof:
     *           type: string
     *      Proof:
     *           type: string
     *      BlockHeight:
     *           type: integer
     *      MmrIndex:
     *           type: integer
     */

    this.router.post(
      `${this.path}`,
      validationMiddleware(BlockchainOutputCreateDto),
      this.BlockchainOutputCreate,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_output/list:
     *   get:
     *     tags:
     *       - name: BLOCKCHAIN_OUTPUT | BLOCKCHAIN_OUTPUT CONTROLLER
     *     description: pagination blockchain_output
     *     summary: pagination blockchain_output
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
     *         description: blockchain_output list fetched successfully
     */
    this.router.get(
      `${this.path}/list`,
      validationMiddleware(BlockchainOutputPaginationDto),
      this.BlockchainOutputPagination,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_output/id:
     *   get:
     *     tags:
     *       - name: BLOCKCHAIN_OUTPUT | BLOCKCHAIN_OUTPUT CONTROLLER
     *     summary:  get single blockchain_output
     *     description: get single blockchain_output
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Id
     *         in: path
     *         description: blockchain_output id
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: blockchain_output successfully fetched for given id..
     */
    this.router.get(
      `${this.path}/:id`,
      validationMiddleware(BlockchainOutputSingleViewDto),
      this.BlockchainOutputFetch,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_output:
     *   patch:
     *     tags:
     *       - name: BLOCKCHAIN_OUTPUT | BLOCKCHAIN_OUTPUT CONTROLLER
     *     summary:  update a blockchain_output
     *     description:  update a blockchain_output
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: blockchain_output
     *         description:
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/BlockchainOutputDto'
     *     responses:
     *       200:
     *         description: blockchain_output updated successfully
     */
    this.router.patch(
      `${this.path}`,
      validationMiddleware(BlockchainOutputUpdateDto),
      this.BlockchainOutputUpdate,
    );

    /**
     * @swagger
     * /epic_explorer/v1/blockchain_output/id:
     *   delete:
     *     tags:
     *       - name: BLOCKCHAIN_OUTPUT | BLOCKCHAIN_OUTPUT CONTROLLER
     *     summary:  delete a blockchain_output
     *     description: delete a blockchain_output
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Id
     *         in: path
     *         description: blockchain_output id
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: blockchain_output successfully deleted for given id..
     */
    this.router.delete(
      `${this.path}/:id`,
      validationMiddleware(BlockchainOutputSingleViewDto),
      this.BlockchainOutputDelete,
    );
  }

  private BlockchainOutputCreate = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainOutputRequestData: BlockchainOutputCreateDto =
        request.body;
      const BlockchainOutputCreateQuery = await getRepository(
        BlockchainOutput,
      ).save(BlockchainOutputRequestData);
      response.status(200).json({
        status: 200,
        timestamp: Date.now(),
        message: 'blockchain_output created successfully',
        response: BlockchainOutputCreateQuery,
      });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainOutputFetch = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainOutputFetchQuery = await getRepository(
        BlockchainOutput,
      ).findOne({
        where: { id: request.params.id },
      });
      BlockchainOutputFetchQuery
        ? response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'blockchain_outputsuccessfully fetched for given id.',
            response: { ...BlockchainOutputFetchQuery },
          })
        : next(new NoDataFoundException());
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainOutputUpdate = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainOutputRequestData: BlockchainOutputUpdateDto =
        request.body;
      const BlockchainOutputUpdateQuery = await getRepository(
        BlockchainOutput,
      ).update(BlockchainOutputRequestData.Id, BlockchainOutputRequestData);
      response.status(200).json({
        status: 200,
        timestamp: Date.now(),
        message: 'blockchain_output updated succesfully',
        response: { ...BlockchainOutputUpdateQuery },
      });
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainOutputDelete = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainOutputDeleteQuery = await getRepository(
        BlockchainOutput,
      ).delete(request.params.Id);
      BlockchainOutputDeleteQuery
        ? response.status(200).json({
            status: 200,
            timestamp: Date.now(),
            message: 'blockchain_output successfully deleted for given id.',
            response: { ...BlockchainOutputDeleteQuery },
          })
        : next(new NoDataFoundException());
    } catch (error) {
      next(new InternalServerErrorException(error));
    }
  };

  private BlockchainOutputPagination = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const BlockchainOutputRequestData: BlockchainOutputPaginationDto =
        request.query;
      const BlockchainOutputCountQuery = await getRepository(
        BlockchainOutput,
      ).findAndCount({});
      if (BlockchainOutputCountQuery[1]) {
        const PaginationReponseData = Paginate(
          BlockchainOutputCountQuery[1],
          BlockchainOutputRequestData.CurrentPage,
          BlockchainOutputRequestData.PageSize,
          BlockchainOutputRequestData.MaxPages,
        );
        const BlockchainOutputPaginationQuery = await getRepository(
          BlockchainOutput,
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
          message: 'blockchain_output list fetched successfully',
          response: {
            ...PaginationReponseData,
            ...BlockchainOutputPaginationQuery,
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
