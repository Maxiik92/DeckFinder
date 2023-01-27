import { Column, Entity } from "typeorm";

@Entity()
export class ClassEntity {
  @Column()
  id?: number;

  @Column()
  name?: string;
}
