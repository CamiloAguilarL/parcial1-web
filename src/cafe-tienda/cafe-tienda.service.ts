import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CafeEntity } from './../cafe/entities/cafe.entity';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/business-errors';
import { TiendaEntity } from './../tienda/entities/tienda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CafeTiendaService {
  constructor(
    @InjectRepository(TiendaEntity)
    private readonly tiendaRepository: Repository<TiendaEntity>,
    @InjectRepository(CafeEntity)
    private readonly cafeRepository: Repository<CafeEntity>,
  ) {}

  async addCafeToTienda(
    cafeId: string,
    tiendaId: string,
  ): Promise<TiendaEntity> {
    const cafe: CafeEntity = await this.cafeRepository.findOne({
      where: { id: cafeId },
    });
    if (!cafe)
      throw new BusinessLogicException(
        'El cafe con dicho Id no existe',
        BusinessError.NOT_FOUND,
      );

    const tienda: TiendaEntity = await this.tiendaRepository.findOne({
      where: { id: tiendaId },
      relations: ['cafes'],
    });
    if (!tienda)
      throw new BusinessLogicException(
        'La tienda con dicho Id no existe',
        BusinessError.NOT_FOUND,
      );

    tienda.cafes = [...tienda.cafes, cafe];
    return await this.tiendaRepository.save(tienda);
  }
}
