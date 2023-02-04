import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { CardEntity } from "./card";

@Entity()
export class CardTypeEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;

  @OneToMany(() => CardEntity, (card) => card.cardTypeId)
  card?: CardEntity[];
}
