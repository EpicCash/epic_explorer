import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BlockchainOutputCreateDto {
  @IsString()
  @IsNotEmpty()
  public OutputType: string;

  @IsString()
  @IsNotEmpty()
  public Commit: string;

  @IsString()
  @IsNotEmpty()
  public Spent: boolean;

  @IsString()
  @IsNotEmpty()
  public ProofHash: string;

  @IsString()
  @IsNotEmpty()
  public Block: any;

  @IsString()
  @IsNotEmpty()
  public MerkleProof: string;

  @IsString()
  @IsNotEmpty()
  public Proof: string;

  @IsInt()
  @IsNotEmpty()
  public BlockHeight: number;

  @IsInt()
  @IsNotEmpty()
  public MmrIndex: number;
}

export class BlockchainOutputUpdateDto {
  @IsInt()
  @IsNotEmpty()
  public Id: number;

  @IsString()
  public OutputType: string;

  @IsString()
  public Commit: string;

  @IsString()
  public Spent: boolean;

  @IsString()
  public ProofHash: string;

  @IsString()
  public Block: any;

  @IsString()
  public MerkleProof: string;

  @IsString()
  public Proof: string;

  @IsInt()
  public BlockHeight: number;

  @IsInt()
  public MmrIndex: number;
}

export class BlockchainOutputSingleViewDto {
  @IsString()
  @IsNotEmpty()
  Id: string;
}

export class BlockchainOutputPaginationDto {
  @IsInt()
  @IsNotEmpty()
  public CurrentPage: number;

  @IsInt()
  @IsNotEmpty()
  public PageSize: number;

  @IsInt()
  @IsNotEmpty()
  public MaxPages: number;
}
