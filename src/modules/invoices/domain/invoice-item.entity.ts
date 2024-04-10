import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

interface InvoiceItemProps {
  id?: Id
  name: string
  price: number
}

export default class InvoiceItem extends BaseEntity {
  private _name: string
  private _price: number

  constructor (props: InvoiceItemProps) {
    super(props.id)
    this._name = props.name
    this._price = props.price
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
