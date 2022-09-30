import { TiendaEntity } from './../../tienda/entities/tienda.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CafeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToMany(() => TiendaEntity, (tienda) => tienda.cafes)
  tiendas: TiendaEntity[];
}
