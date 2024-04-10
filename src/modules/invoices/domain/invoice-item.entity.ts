import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

export default class InvoiceItem extends BaseEntity {
  private _name: string
  private _price: number

  constructor (name: string, price: number) {
    super()
    this._name = name
    this._price = price
  }

  get name () {
    return this._name
  }

  set name (name: string) {
    this._name = name
  }

  get price () {
    return this._price
  }

  set price (price: number) {
    this._price = price
  }
}
