import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CardEntity } from "./card";

@Entity()
export class KeywordEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  slug?: string;

  @Column()
  text?: string;

  @ManyToOne(() => CardEntity, (card) => card.keywordIds)
  @JoinColumn({ name: "keywordsId" })
  card?: CardEntity;
}
