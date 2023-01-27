import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class KeywordEntity {
  @PrimaryColumn()
  id?: number;

  @Column()
  slug?: string;

  @Column()
  text?: string;
}
