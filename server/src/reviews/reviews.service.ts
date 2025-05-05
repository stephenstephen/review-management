import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    const review = this.reviewRepo.create({ ...dto, product });
    return this.reviewRepo.save(review);
  }

  findAll(productId?: number): Promise<Review[]> {
    return this.reviewRepo.find({
      where: productId ? { product: { id: productId } } : {},
      relations: ['product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepo.findOne({ where: { id }, relations: ['product'] });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: number, dto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    Object.assign(review, dto);
    return this.reviewRepo.save(review);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reviewRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Review not found');
  }
}
