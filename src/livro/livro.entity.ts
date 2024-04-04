import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'livros' })
export class LivroEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'categoria_id', length: 100, nullable: false })
  categoriaId: string;

  @Column({ name: 'autor_id', length: 100, nullable: false })
  autorId: string;

  @Column({ name: 'titulo', length: 100, nullable: false })
  titulo: string;

  @Column({ name: 'resumo', length: 500, nullable: false })
  resumo: string;

  @Column({ name: 'sumario', length: 100, nullable: false })
  sumario: string;

  @Column({ name: 'preco', nullable: false })
  preco: number;

  @Column({ name: 'num_paginas', nullable: false })
  numPaginas: number;

  @Column({ name: 'ISBN', length: 100, nullable: false })
  ISBN: string;

  @Column({ name: 'dataPublicacao', nullable: false, type: 'date' })
  dataPublicacao: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}