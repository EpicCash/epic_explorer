import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BlockchainKernelCreateDto {
  @IsString()
  @IsNotEmpty()
  public Features: string;

  @IsInt()
  @IsNotEmpty()
  public Fee: number;

  @IsInt()
  @IsNotEmpty()
  public LockHeight: number;

  @IsString()
  @IsNotEmpty()
  public Excess: string;

  @IsString()
  @IsNotEmpty()
  public ExcessSig: string;

  @IsString()
  @IsNotEmpty()
  public Block: any;
}

export class BlockchainKernelUpdateDto {
  @IsInt()
  @IsNotEmpty()
  public Id: number;

  @IsString()
  public Features: string;

  @IsInt()
  public Fee: number;

  @IsInt()
  public LockHeight: number;

  @IsString()
  public Excess: string;

  @IsString()
  public ExcessSig: string;

  @IsString()
  public Block: any;
}

export class BlockchainKernelSingleViewDto {
  @IsString()
  @IsNotEmpty()
  Id: string;
}

export class BlockchainKernelPaginationDto {
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

export class TransactionFeeDto {
  @IsString()
  public FromDate: string;

  @IsString()
  public ToDate: string;

  @IsString()
  public Interval: string;
}
