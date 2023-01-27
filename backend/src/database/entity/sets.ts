import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SetEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;
}
