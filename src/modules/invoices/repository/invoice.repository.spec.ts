import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../../@shared/domain/value-object/address"
import Invoice from "../domain/invoice.entity";
import InvoiceItem from "../domain/invoice-item.entity";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceRepository from "./invoice.repository";
import {GenerateInvoiceUseCaseInputDto} from "../usecase/generate-invoice/generate-invoice.usecase.dto";

describe("Invoice Repository test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceItemModel, InvoiceModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should generate a invoice", async () => {
    const repository = new InvoiceRepository()


    const input: GenerateInvoiceUseCaseInputDto = {
      name: "Nivaldo Rego",
      document: "000.000.000/0001-00",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Anapolis",
      state: "GO",
      zipCode: "88888-888",
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 123.45
        }
      ]
    }

    await repository.generate(input)

    const invoiceDb = await InvoiceModel.findOne({ where: { document: "000.000.000/0001-00" }, include: { all: true }})

    expect(invoiceDb).toBeDefined()
    expect(invoiceDb.id).toBeDefined()
    expect(invoiceDb.name).toEqual(input.name)
    expect(invoiceDb.document).toEqual(input.document)
    expect(invoiceDb.street).toEqual(input.street)
    expect(invoiceDb.number).toEqual(input.number)
    expect(invoiceDb.complement).toEqual(input.complement)
    expect(invoiceDb.city).toEqual(input.city)
    expect(invoiceDb.state).toEqual(input.state)
    expect(invoiceDb.zipcode).toEqual(input.zipCode)
    expect(invoiceDb.items).toBeDefined()
    expect(invoiceDb.items.length).toEqual(1)
    expect(invoiceDb.items[0].id).toBeDefined()
    expect(invoiceDb.items[0].name).toEqual(input.items[0].name)
    expect(invoiceDb.items[0].price).toEqual(input.items[0].price)
    expect(invoiceDb.createdAt).toBeDefined()
    expect(invoiceDb.updatedAt).toBeDefined()
  })

  it("should find a invoice", async () => {

    const invoiceItem1 = InvoiceItemModel.build({
      id: new Id('2').id,
      name: "Item 1",
      price: 123.45
    })

    const invoiceItem2 = InvoiceItemModel.build({
      id: new Id('3').id,
      name: "Item 2",
      price: 321.45
    })

    const invoice = await InvoiceModel.create({
      id: '1',
      name: 'Lucian',
      email: 'lucian@123.com',
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipcode: "88888-888",
      items: [invoiceItem1, invoiceItem2],
      createdAt: new Date(),
      updatedAt: new Date()
    }, { include: { all: true } })

    const repository = new InvoiceRepository()
    const result = await repository.find({ id: invoice.id })

    expect(result.id).toEqual(invoice.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.address.street).toEqual(invoice.street)
    expect(result.address.number).toEqual(invoice.number)
    expect(result.address.complement).toEqual(invoice.complement)
    expect(result.address.city).toEqual(invoice.city)
    expect(result.address.state).toEqual(invoice.state)
    expect(result.address.zipCode).toEqual(invoice.zipcode)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
    expect(result.items).toBeDefined()
    expect(result.items.length).toEqual(2)
    expect(result.items[0].id).toEqual(invoice.items[0].id)
    expect(result.items[0].name).toEqual(invoice.items[0].name)
    expect(result.items[0].price).toEqual(invoice.items[0].price)
    expect(result.items[1].id).toEqual(invoice.items[1].id)
    expect(result.items[1].name).toEqual(invoice.items[1].name)
    expect(result.items[1].price).toEqual(invoice.items[1].price)

  })
})
