import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  password?: string;

  @Column()
  mail?: string;
}
