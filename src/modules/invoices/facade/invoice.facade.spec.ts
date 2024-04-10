import {Sequelize} from "sequelize-typescript";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import InvoiceItem from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";

describe('InvoiceFacade', () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true}
    })

    sequelize.addModels([InvoiceItemModel, InvoiceModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should generate an invoice', async () => {
    const facade = InvoiceFacadeFactory.create()

    const result = await facade.generate({
      name: "Nivaldo Rego",
      document: "000.000.000/0001-00",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Anapolis",
      state: "GO",
      zipCode: "88888-888",
      items: [{id: '1', name: "item1", price: 123.45}]
    })

    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual("Nivaldo Rego")
    expect(result.document).toEqual("000.000.000/0001-00")
    expect(result.street).toEqual("Rua 123")
    expect(result.number).toEqual("99")
    expect(result.complement).toEqual("Casa Verde")
    expect(result.city).toEqual("Anapolis")
    expect(result.state).toEqual("GO")
    expect(result.zipCode).toEqual("88888-888")
    expect(result.items).toBeDefined()
    expect(result.items.length).toEqual(1)
    expect(result.items[0].id).toBeDefined()
    expect(result.items[0].name).toEqual("item1")
    expect(result.items[0].price).toEqual(123.45)
  });

  it('should find an invoice', async () => {
    const facade = InvoiceFacadeFactory.create()

    const result = await facade.generate({
      name: "Nivaldo Rego",
      document: "000.000.000/0001-00",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Anapolis",
      state: "GO",
      zipCode: "88888-888",
      items: [{id: '1', name: "item1", price: 123.45}]
    })

    const invoice = await facade.find({id: result.id})

    expect(invoice).toBeDefined()
    expect(invoice.id).toBeDefined()
    expect(invoice.name).toEqual("Nivaldo Rego")
    expect(invoice.document).toEqual("000.000.000/0001-00")
    expect(invoice.address.street).toEqual("Rua 123")
    expect(invoice.address.number).toEqual("99")
    expect(invoice.address.complement).toEqual("Casa Verde")
    expect(invoice.address.city).toEqual("Anapolis")
    expect(invoice.address.state).toEqual("GO")
    expect(invoice.address.zipCode).toEqual("88888-888")
    expect(invoice.items).toBeDefined()
    expect(invoice.items.length).toEqual(1)
    expect(invoice.items[0].id).toBeDefined()
    expect(invoice.items[0].name).toEqual("item1")
    expect(invoice.items[0].price).toEqual(123.45)

  });
})
