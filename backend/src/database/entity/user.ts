import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity("user")
export class UserEntity extends BaseEntity{

  @Column()
  name?: string;

  @Column()
  password?: string;

  @Column()
  email?: string;
}
