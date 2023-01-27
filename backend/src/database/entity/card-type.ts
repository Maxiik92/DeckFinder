import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class CardTypeEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;
}
