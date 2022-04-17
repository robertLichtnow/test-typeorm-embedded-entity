import { Parent } from '~/entities/Parent';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('children')
export class Child {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'name', nullable: false })
  name!: string;

  @ManyToOne(() => Parent, (parent) => parent.children, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent!: Parent;
}
