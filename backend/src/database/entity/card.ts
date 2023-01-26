import { Entity, Column } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity("card")
export class CardEntity extends BaseEntity {
  @Column()
  hearthstone_id?: number;

  @Column()
  name?: string;

  @Column()
  class_id?: number;

  @Column()
  cardset_id?: number;

  @Column()
  rarity_id?: number;

  @Column()
  manacost?: number;

  @Column()
  image?: string;

  @Column()
  keyword_id?: number;
}
