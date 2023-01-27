import { Column, Entity } from "typeorm";

@Entity()
export class RarityEntity {
  @Column()
  id?: number;

  @Column()
  name?: string;
}
