import {Column, Model, PrimaryKey, Table, HasMany} from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";

@Table({tableName: 'invoice' })
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  document: string

  @Column({ allowNull: false })
  street: string

  @Column({ allowNull: false })
  number: string

  @Column({ allowNull: false })
  complement: string

  @Column({ allowNull: true })
  city: string

  @Column({ allowNull: true })
  state: string

  @Column({ allowNull: true })
  zipcode: string

  @HasMany(() => InvoiceItemModel)
  items: InvoiceItemModel[]

  @Column({ allowNull: false })
  createdAt: Date

  @Column({ allowNull: false })
  updatedAt: Date
}
