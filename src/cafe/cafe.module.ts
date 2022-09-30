import { Module } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CafeEntity } from './entities/cafe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CafeEntity])],
  providers: [CafeService],
})
export class CafeModule {}
