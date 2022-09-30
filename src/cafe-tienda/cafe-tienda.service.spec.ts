/* eslint-disable prettier/prettier */
/*archivo src/museum/museum.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';
import { CafeEntity } from '../cafe/entities/cafe.entity';
import { CafeTiendaService } from './cafe-tienda.service';
import { TiendaEntity } from '../tienda/entities/tienda.entity';

describe('CafeTiendaService', () => {
  let service: CafeTiendaService;
  let cafeRepository: Repository<CafeEntity>;
  let tiendaRepository: Repository<TiendaEntity>;
  let cafes: CafeEntity[];
  let tiendas: TiendaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CafeTiendaService],
    }).compile();

    service = module.get<CafeTiendaService>(CafeTiendaService);
    cafeRepository = module.get<Repository<CafeEntity>>(
      getRepositoryToken(CafeEntity),
    );
    tiendaRepository = module.get<Repository<TiendaEntity>>(
      getRepositoryToken(TiendaEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    cafeRepository.clear();
    tiendaRepository.clear();

    cafes = [];
    tiendas = [];

    for (let i = 0; i < 5; i++) {
      const cafe: CafeEntity = await cafeRepository.save({
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        price: faker.datatype.number({
          min: 10,
          max: 50,
        }),
        tiendas: [],
      });
      cafes.push(cafe);
    }

    const tienda = await tiendaRepository.save({
      name: faker.company.name(),
      direction: faker.address.direction(),
      phone: faker.phone.number('350########'),
      cafes: cafes,
    });
    tiendas.push(tienda);
  };

  it('addCafeToTienda should add a cafe to a tienda', async () => {
    const newCafe: CafeEntity = await cafeRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      price: faker.datatype.number({
        min: 10,
        max: 50,
      }),
      tiendas: [],
    });

    const newTienda: TiendaEntity = await tiendaRepository.save({
      name: faker.company.name(),
      direction: faker.address.direction(),
      phone: faker.phone.number('350########'),
      cafes: [],
    });

    const result: TiendaEntity = await service.addCafeToTienda(
      newCafe.id,
      newTienda.id,
    );

    expect(result.cafes.length).toBe(1);
    expect(result.cafes[0]).not.toBeNull();
    expect(result.cafes[0].name).toBe(newCafe.name);
    expect(result.cafes[0].description).toBe(newCafe.description);
    expect(result.cafes[0].price).toBe(newCafe.price);
  });

  it('addCafeToTienda should thrown exception for an invalid cafe', async () => {
    const newTienda: TiendaEntity = await tiendaRepository.save({
      name: faker.company.name(),
      direction: faker.address.direction(),
      phone: faker.phone.number('350########'),
      cafes: [],
    });

    await expect(() =>
      service.addCafeToTienda('0', newTienda.id),
    ).rejects.toHaveProperty('message', 'El cafe con dicho Id no existe');
  });

  it('addCafeToTienda should thrown exception for an invalid tienda', async () => {
    const newCafe: CafeEntity = await cafeRepository.save({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      price: faker.datatype.number({
        min: 10,
        max: 50,
      }),
      tiendas: [],
    });

    await expect(() =>
      service.addCafeToTienda(newCafe.id, '0'),
    ).rejects.toHaveProperty('message', 'La tienda con dicho Id no existe');
  });
});
