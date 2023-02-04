import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { CardEntity } from "./card";

@Entity()
export class SetEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;

  @OneToOne(() => CardEntity, (card) => card.cardSetId)
  @JoinColumn({ name: "cardsetId" })
  card?: Promise<CardEntity[]>;
}
