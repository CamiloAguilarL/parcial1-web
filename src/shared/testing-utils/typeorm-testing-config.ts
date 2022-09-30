/* eslint-disable prettier/prettier */

import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeEntity } from './../../cafe/entities/cafe.entity';
import { TiendaEntity } from './../../tienda/entities/tienda.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [CafeEntity, TiendaEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([CafeEntity, TiendaEntity]),
];
