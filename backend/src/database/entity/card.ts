import { Entity, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { ClassEntity } from "./class";
import { CardTypeEntity } from "./card-type";
import { SetEntity } from "./sets";
import { RarityEntity } from "./rarity";
import { KeywordEntity } from "./keyword";

@Entity("card")
export class CardEntity extends BaseEntity {
  @Column()
  hearthstone_id?: number;

  @Column()
  name?: string;

  @Column()
  manaCost?: number;

  @Column()
  image?: string;

  @OneToOne(() => CardTypeEntity, (cardtype) => cardtype.id)
  cardTypeId?: number;
  @JoinColumn()
  cardType?: CardTypeEntity;

  @OneToOne(() => SetEntity, (set) => set.id)
  cardsetId?: number;
  @JoinColumn()
  set?: SetEntity;

  @OneToOne(() => RarityEntity, (rarity) => rarity.id)
  rarityId?: number;
  @JoinColumn()
  rarity?: RarityEntity;

  @OneToMany(() => KeywordEntity, (keyword) => keyword.id)
  keywordIds?: number[];
  @JoinColumn()
  keyWords?: KeywordEntity[];

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.id)
  classId?: number;
  @JoinColumn()
  classIds?: ClassEntity[];
}
