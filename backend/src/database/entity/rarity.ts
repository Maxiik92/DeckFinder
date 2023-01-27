import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RarityEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;
}
