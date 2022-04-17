import { Child } from '~/entities/Child';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parents')
export class Parent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'name', nullable: false })
  name!: string;

  @OneToMany(() => Child, (child) => child.parent, {
    eager: true,
    nullable: false,
    cascade: ['insert', 'remove', 'update'],
    createForeignKeyConstraints: true,
  })
  children!: Child[];
}
