import { Column, Entity } from "typeorm";

@Entity()
export class CardTypeEntity {
  @Column()
  id?: number;

  @Column()
  name?: string;
}
