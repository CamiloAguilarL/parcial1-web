/* eslint-disable prettier/prettier */
/*archivo src/museum/museum.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TiendaEntity } from './entities/tienda.entity';
import { TiendaService } from './tienda.service';
import { faker } from '@faker-js/faker';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: Repository<TiendaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaService],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
    repository = module.get<Repository<TiendaEntity>>(
      getRepositoryToken(TiendaEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new tienda', async () => {
    const tienda: TiendaEntity = {
      id: '',
      name: faker.company.name(),
      direction: faker.address.direction(),
      phone: faker.phone.number('350#######'),
      cafes: [],
    };

    const newTienda: TiendaEntity = await service.createTienda(tienda);
    expect(newTienda).not.toBeNull();

    const storedTienda: TiendaEntity = await repository.findOne({
      where: { id: newTienda.id },
    });
    expect(storedTienda).not.toBeNull();
    expect(storedTienda.name).toEqual(newTienda.name);
    expect(storedTienda.direction).toEqual(newTienda.direction);
    expect(storedTienda.phone).toEqual(newTienda.phone);
  });

  it('create should throw an exception because of phone length', async () => {
    const tienda: TiendaEntity = {
      id: '',
      name: faker.company.name(),
      direction: faker.address.direction(),
      phone: faker.phone.number('350########'),
      cafes: [],
    };

    await expect(() => service.createTienda(tienda)).rejects.toHaveProperty(
      'message',
      'El telefono debe tener diez caracteres',
    );
  });
});
