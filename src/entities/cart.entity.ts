import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";

import { Dvd } from "./product.entity";

import { v4 as uuid } from "uuid";

@Entity()
export class Cart {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  paid: boolean;

  @Column("float")
  total: number;

  @ManyToMany((type) => Dvd, {
    eager: true,
  })
  @JoinTable()
  dvds: Dvd[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
