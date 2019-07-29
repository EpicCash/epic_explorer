import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BlockchainInput } from './BlockchainInput';
import { BlockchainKernel } from './BlockchainKernel';
import { BlockchainOutput } from './BlockchainOutput';

@Entity('blockchain_block', { schema: 'public' })
export class BlockchainBlock {
  @Index()
  @Column('character varying', {
    nullable: false,
    primary: true,
    length: 64,
    name: 'hash',
  })
  Hash: string;

  @Column('integer', {
    nullable: false,
    name: 'version',
  })
  Version: number;

  @Column('integer', {
    nullable: false,
    name: 'height',
  })
  Height: number;

  @Column('timestamp with time zone', {
    nullable: false,
    name: 'timestamp',
  })
  Timestamp: Date;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'output_root',
  })
  OutputRoot: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'range_proof_root',
  })
  RangeProofRoot: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'kernel_root',
  })
  KernelRoot: string;

  @Column('text', {
    nullable: false,
    name: 'nonce',
  })
  Nonce: string;

  @Column('bigint', {
    nullable: false,
    name: 'total_difficulty_cuckaroo',
  })
  TotalDifficultyCuckaroo: string;

  @Column('bigint', {
    nullable: false,
    name: 'total_difficulty_cuckatoo',
  })
  TotalDifficultyCuckatoo: string;

  @Column('bigint', {
    nullable: false,
    name: 'total_difficulty_progpow',
  })
  TotalDifficultyProgpow: string;

  @Column('bigint', {
    nullable: false,
    name: 'total_difficulty_randomx',
  })
  TotalDifficultyRandomx: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'previous_id',
  })
  PreviousId: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'total_kernel_offset',
  })
  TotalKernelOffset: string;

  @Column('integer', {
    nullable: false,
    name: 'edge_bits',
  })
  EdgeBits: number;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'proof',
  })
  Proof: string;

  @Column('character varying', {
    nullable: false,
    length: 64,
    name: 'prev_root',
  })
  PrevRoot: string;

  @Column('integer', {
    nullable: false,
    name: 'secondary_scaling',
  })
  SecondaryScaling: number;

  @OneToMany(
    type => BlockchainInput,
    blockchain_input => blockchain_input.Block,
  )
  BlockchainInputs: BlockchainInput[];

  @OneToMany(
    type => BlockchainKernel,
    blockchain_kernel => blockchain_kernel.Block,
  )
  BlockchainKernels: BlockchainKernel[];

  @OneToMany(
    type => BlockchainOutput,
    blockchain_output => blockchain_output.Block,
  )
  BlockchainOutputs: BlockchainOutput[];
}
