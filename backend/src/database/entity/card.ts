import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";
import { ClassEntity } from "./class";
import { CardTypeEntity } from "./card-type";
import { SetEntity } from "./sets";
import { RarityEntity } from "./rarity";
import { KeywordEntity } from "./keyword";

@Entity("card")
export class CardEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  manaCost?: number;

  @Column()
  image?: string;

  @ManyToOne(() => CardTypeEntity, (cardType) => cardType.id)
  cardTypeId?: CardTypeEntity;
  @JoinColumn()
  card?: CardEntity;

  @OneToOne(() => SetEntity, (set) => set.id)
  cardSetId?: number;
  @JoinColumn()
  set?: SetEntity;

  @OneToOne(() => RarityEntity, (rarity) => rarity.id)
  rarityId?: number;
  @JoinColumn({ name: "rarityId" })
  rarity?: RarityEntity;

  @OneToMany(() => KeywordEntity, (keyword) => keyword.id)
  keywordIds?: number[];
  @JoinColumn()
  keyWords?: KeywordEntity[];

  @OneToMany(() => ClassEntity, (classEntity) => classEntity.id)
  classId?: number;
  @JoinColumn()
  classIds?: ClassEntity[];
  /*
  @Column({ type: "simple-array", nullable: true })
  multiClassIds?: number[];*/
}
