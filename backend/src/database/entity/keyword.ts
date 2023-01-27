import { Column, Entity } from "typeorm";

@Entity()
export class KeywordEntity {
  @Column()
  id?: number;

  @Column()
  slug?: string;

  @Column()
  text?: string;
}
