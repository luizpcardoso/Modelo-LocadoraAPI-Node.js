import { Entity, Column, PrimaryColumn } from "typeorm";

import { v4 as uuid } from "uuid";

@Entity()
export class Stock {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  quantity: number;

  @Column("float")
  price: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
