import { Entity, Column } from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity("card")
export class CardEntity extends BaseEntity {
  @Column()
  hearthstone_id?: number;

  @Column()
  name?: string;

  @Column()
  classId?: number;

  @Column()
  cardTypeId?: number;

  @Column()
  cardsetId?: number;

  @Column()
  rarityId?: number;

  @Column()
  manaCost?: number;

  @Column()
  image?: string;

  @Column()
  keywordIds?: number[];
}
