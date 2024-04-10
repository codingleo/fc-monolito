import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItem from "./invoice-item.entity";

interface InvoiceProps {
  id?: Id
  name: string
  document: string
  address: Address
  items: InvoiceItem[]
  createdAt?: Date
  updatedAt?: Date
}

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string
  private _document: string
  private _address: Address
  private _items: InvoiceItem[]

  constructor (props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._document = props.document
    this._address = props.address
    this._items = props.items
  }

  get name () {
    return this._name
  }

  set name (name: string) {
    this._name = name
  }

  get document () {
    return this._document
  }

  set document (document: string) {
    this._document = document
  }

  get address () {
    return this._address
  }

  set address (address: Address) {
    this._address = address
  }

  get items () {
    return this._items
  }

  set items (items: InvoiceItem[]) {
    this._items = items
  }
}
