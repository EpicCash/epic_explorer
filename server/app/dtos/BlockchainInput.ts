import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BlockchainInputCreateDto {
  @IsString()
  @IsNotEmpty()
  public Data: string;

  @IsString()
  @IsNotEmpty()
  public Block: any;
}

export class BlockchainInputUpdateDto {
  @IsInt()
  @IsNotEmpty()
  public Id: number;

  @IsString()
  public Data: string;

  @IsString()
  public Block: any;
}

export class BlockchainInputSingleViewDto {
  @IsString()
  @IsNotEmpty()
  Id: string;
}

export class BlockchainInputPaginationDto {
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
