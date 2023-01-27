import { Column, Entity } from "typeorm";

@Entity()
export class SetEntity {
  @Column()
  id?: number;

  @Column()
  name?: string;
}
