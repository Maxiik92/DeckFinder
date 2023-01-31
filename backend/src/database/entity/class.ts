import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CardEntity } from "./card";

@Entity()
export class ClassEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;

  @ManyToOne(() => CardEntity, (card?) => card.classId)
  @JoinColumn({ name: "classId" })
  card?: Promise<CardEntity[]>;
}
