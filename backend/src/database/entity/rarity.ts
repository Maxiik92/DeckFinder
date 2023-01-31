import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { CardEntity } from "./card";

@Entity()
export class RarityEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;

  @OneToOne(() => CardEntity, (card) => card.rarityId)
  @JoinColumn({ name: "rarityId" })
  card?: Promise<CardEntity[]>;
}
