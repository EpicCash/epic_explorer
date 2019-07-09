import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlockchainBlock } from './BlockchainBlock';

@Entity('blockchain_input', { schema: 'public' })
export class BlockchainInput {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  Id: number;

  @Column('character varying', {
    nullable: false,
    length: 66,
    name: 'data',
  })
  Data: string;

  @Column('character varying', {
    nullable: false,
    primary: true,
    length: 64,
    name: 'block_id',
  })
  BlockId: string;

  @ManyToOne(
    type => BlockchainBlock,
    blockchain_block => blockchain_block.BlockchainInputs,
    { nullable: false },
  )
  @JoinColumn({ name: 'block_id' })
  Block: BlockchainBlock | null;
}
