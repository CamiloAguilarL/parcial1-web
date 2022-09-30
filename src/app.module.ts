import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CafeModule } from './cafe/cafe.module';
import { CafeEntity } from './cafe/entities/cafe.entity';
import { TiendaEntity } from './tienda/entities/tienda.entity';
import { TiendaModule } from './tienda/tienda.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres123',
      database: 'db',
      entities: [CafeEntity, TiendaEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    CafeModule,
    TiendaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
