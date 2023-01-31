import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { CardEntity } from "./card";

@Entity()
export class CardTypeEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;

  @OneToOne(() => CardEntity, (card) => card.cardTypeId)
  @JoinColumn({ name: "cardTypeId" })
  card?: Promise<CardEntity[]>;
}
