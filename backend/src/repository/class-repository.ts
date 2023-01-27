import { ClassEntity } from "../database";
import { GenericRepository } from "./generic-repository";

export class ClassRepository extends GenericRepository<ClassEntity> {
  constructor() {
    super(ClassEntity);
  }
}
