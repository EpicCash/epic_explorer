import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BlockchainBlockCreateDto {
  @IsInt()
  @IsNotEmpty()
  public Version: number;

  @IsInt()
  @IsNotEmpty()
  public Height: number;

  @IsString()
  @IsNotEmpty()
  public Timestamp: Date;

  @IsString()
  @IsNotEmpty()
  public OutputRoot: string;

  @IsString()
  @IsNotEmpty()
  public RangeProofRoot: string;

  @IsString()
  @IsNotEmpty()
  public KernelRoot: string;

  @IsString()
  @IsNotEmpty()
  public Nonce: string;

  @IsString()
  @IsNotEmpty()
  public TotalDifficulty: string;

  @IsString()
  @IsNotEmpty()
  public Previous: any;

  @IsString()
  @IsNotEmpty()
  public TotalKernelOffset: string;

  @IsInt()
  @IsNotEmpty()
  public EdgeBits: number;

  @IsString()
  @IsNotEmpty()
  public CuckooSolution: number[];

  @IsString()
  @IsNotEmpty()
  public PrevRoot: string;

  @IsInt()
  @IsNotEmpty()
  public SecondaryScaling: number;
}

export class BlockchainBlockUpdateDto {
  @IsString()
  @IsNotEmpty()
  public Hash: string;

  @IsInt()
  public Version: number;

  @IsInt()
  public Height: number;

  @IsString()
  public Timestamp: Date;

  @IsString()
  public OutputRoot: string;

  @IsString()
  public RangeProofRoot: string;

  @IsString()
  public KernelRoot: string;

  @IsString()
  public Nonce: string;

  @IsString()
  public TotalDifficulty: string;

  @IsString()
  public Previous: any;

  @IsString()
  public TotalKernelOffset: string;

  @IsInt()
  public EdgeBits: number;

  @IsString()
  public CuckooSolution: number[];

  @IsString()
  public PrevRoot: string;

  @IsInt()
  public SecondaryScaling: number;
}

export class BlockchainBlockSingleViewDto {
  @IsString()
  @IsNotEmpty()
  Hash: string;
}

export class BlockchainBlockPaginationDto {
  @IsString()
  @IsNotEmpty()
  public CurrentPage: string;

  @IsString()
  @IsNotEmpty()
  public PageSize: string;

  // @IsString()
  // @IsNotEmpty()
  // public MaxPages: string;
}

export class TotalDifficultyNBlockDto {
  @IsString()
  public FromDate: string;

  @IsString()
  public ToDate: string;

  @IsString()
  public Interval: string;

  @IsString()
  public Type: string;

  @IsString()
  public Difftype: string;

}
