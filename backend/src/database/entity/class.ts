import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ClassEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;
}
