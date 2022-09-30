import { CafeEntity } from './../../cafe/entities/cafe.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TiendaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  direction: string;

  @Column()
  phone: string;

  @ManyToMany(() => CafeEntity, (cafe) => cafe.tiendas)
  @JoinTable()
  cafes: CafeEntity[];
}
