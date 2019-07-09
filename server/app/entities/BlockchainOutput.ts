import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { BlockchainBlock } from './BlockchainBlock';

@Entity('blockchain_output', { schema: 'public' })
export class BlockchainOutput {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  Id: number;

  @Column('text', {
    nullable: false,
    name: 'output_type',
  })
  OutputType: string;

  @Column('character varying', {
    nullable: false,
    length: 66,
    name: 'commit',
  })
  Commit: string;

  @Column('boolean', {
    nullable: false,
    name: 'spent',
  })
  Spent: boolean;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'proof_hash',
  })
  ProofHash: string;

  @Column('text', {
    nullable: true,
    name: 'merkle_proof',
  })
  MerkleProof: string | null;

  @Column('text', {
    nullable: true,
    name: 'proof',
  })
  Proof: string | null;

  @Column('integer', {
    nullable: true,
    name: 'block_height',
  })
  BlockHeight: number | null;

  @Column('integer', {
    nullable: true,
    name: 'mmr_index',
  })
  MmrIndex: number | null;

  @Column('character varying', {
    nullable: false,
    primary: true,
    length: 64,
    name: 'block_id',
  })
  BlockId: string;

  @ManyToOne(
    type => BlockchainBlock,
    blockchain_block => blockchain_block.BlockchainOutputs,
    { nullable: false },
  )
  @JoinColumn({ name: 'block_id' })
  Block: BlockchainBlock | null;
}
