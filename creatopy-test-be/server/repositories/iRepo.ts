export interface IRepo<T> {
  findAllByField(value: any, filedName: string): Promise<T[]>;
  findAllByWhereClause(whereObj: any): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
  findOneByField(value: any, filedName: string): Promise<T | null>;
  create(obj: T): Promise<any>;
  update(id: string, obj: T): Promise<any>;
}
