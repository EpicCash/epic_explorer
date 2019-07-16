import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlockchainBlock } from './BlockchainBlock';

@Entity('blockchain_kernel', { schema: 'public' })
export class BlockchainKernel {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  Id: number;

  @Column('text', {
    nullable: false,
    name: 'features',
  })
  Features: string;

  @Column('integer', {
    nullable: false,
    name: 'fee',
  })
  Fee: number;

  @Column('integer', {
    nullable: false,
    name: 'lock_height',
  })
  LockHeight: number;

  @Column('character varying', {
    nullable: false,
    length: 66,
    name: 'excess',
  })
  Excess: string;

  @Column('character varying', {
    nullable: false,
    length: 142,
    name: 'excess_sig',
  })
  ExcessSig: string;

  @Column('character varying', {
    nullable: false,
    primary: true,
    length: 64,
    name: 'block_id',
  })
  BlockId: string;

  @ManyToOne(
    type => BlockchainBlock,
    blockchain_block => blockchain_block.BlockchainKernels,
    { nullable: false },
  )
  @JoinColumn({ name: 'block_id' })
  Block: BlockchainBlock | null;
}
