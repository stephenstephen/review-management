import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ description: 'Note sur 5' })
  rating: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Commentaire' })
  comment?: string;

  @IsInt()
  @ApiProperty({ description: 'Id du produit' })
  productId: number;
}
