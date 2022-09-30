/* eslint-disable prettier/prettier */
/*archivo src/museum/museum.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CafeService } from './cafe.service';
import { CafeEntity } from './entities/cafe.entity';
import { faker } from '@faker-js/faker';

describe('CafeService', () => {
  let service: CafeService;
  let repository: Repository<CafeEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CafeService],
    }).compile();

    service = module.get<CafeService>(CafeService);
    repository = module.get<Repository<CafeEntity>>(
      getRepositoryToken(CafeEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new cafe', async () => {
    const cafe: CafeEntity = {
      id: '',
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      price: faker.datatype.number({
        min: 10,
        max: 50,
      }),
      tiendas: [],
    };

    const newCafe: CafeEntity = await service.createCafe(cafe);
    expect(newCafe).not.toBeNull();

    const storedCafe: CafeEntity = await repository.findOne({
      where: { id: newCafe.id },
    });
    expect(storedCafe).not.toBeNull();
    expect(storedCafe.name).toEqual(newCafe.name);
    expect(storedCafe.description).toEqual(newCafe.description);
    expect(storedCafe.price).toEqual(newCafe.price);
  });

  it('create should throw an exception because of price value', async () => {
    const cafe: CafeEntity = {
      id: '',
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      price: faker.datatype.number({
        min: -100,
        max: -50,
      }),
      tiendas: [],
    };

    await expect(() => service.createCafe(cafe)).rejects.toHaveProperty(
      'message',
      'El precio del cafe debe ser positivo.',
    );
  });
});
