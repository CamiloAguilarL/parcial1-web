import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/business-errors';
import { Repository } from 'typeorm';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';
import { CafeEntity } from './entities/cafe.entity';

@Injectable()
export class CafeService {
  constructor(
    @InjectRepository(CafeEntity)
    private readonly cafeRepository: Repository<CafeEntity>,
  ) {}
  async createCafe(cafe: CafeEntity): Promise<CafeEntity> {
    if (cafe.price < 0)
      throw new BusinessLogicException(
        'El precio del cafe debe ser positivo.',
        BusinessError.PRECONDITION_FAILED,
      );
    return await this.cafeRepository.save(cafe);
  }
  findAll() {
    return `This action returns all cafe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cafe`;
  }

  update(id: number, updateCafeDto: UpdateCafeDto) {
    return `This action updates a #${id} cafe`;
  }

  remove(id: number) {
    return `This action removes a #${id} cafe`;
  }
}
