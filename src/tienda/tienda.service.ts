import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/business-errors';
import { Repository } from 'typeorm';
import { UpdateTiendaDto } from './dto/update-tienda.dto';
import { TiendaEntity } from './entities/tienda.entity';

@Injectable()
export class TiendaService {
  constructor(
    @InjectRepository(TiendaEntity)
    private readonly tiendaRepository: Repository<TiendaEntity>,
  ) {}
  async createTienda(tienda: TiendaEntity): Promise<TiendaEntity> {
    if (tienda.phone.length !== 10)
      throw new BusinessLogicException(
        'El telefono debe tener diez caracteres',
        BusinessError.PRECONDITION_FAILED,
      );
    return await this.tiendaRepository.save(tienda);
  }

  findAll() {
    return `This action returns all tienda`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tienda`;
  }

  update(id: number, updateTiendaDto: UpdateTiendaDto) {
    return `This action updates a #${id} tienda`;
  }

  remove(id: number) {
    return `This action removes a #${id} tienda`;
  }
}
