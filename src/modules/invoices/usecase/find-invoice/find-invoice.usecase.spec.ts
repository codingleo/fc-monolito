import {FindInvoiceUseCaseOutputDTO} from "./find-invoice.usecase.dto";
import FindInvoiceUseCase from "./find-invoice.usecase";
import {GenerateInvoiceUseCaseInputDto} from "../generate-invoice/generate-invoice.usecase.dto";
import Invoice from "../../domain/invoice.entity";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItem from "../../domain/invoice-item.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

describe('FindInvoiceUseCase', () => {
  const item1 = {
    id: '1',
    name: 'item',
    price: 123.45
  }
  const item2 = {
    id: '2',
    name: 'item2',
    price: 321.45
  }

  const invoice = {
    name: 'name',
    document: '000.000.000/0001-00',
    street: 'street',
    number: '123',
    complement: 'complement',
    city: 'Anapolis',
    state: 'GO',
    zipCode: '75000-000',
    items: [item1, item2]
  }

  const output = new Invoice({
    name: invoice.name,
    address: new Address(
      invoice.street,
      invoice.number,
      invoice.complement,
      invoice.city,
      invoice.state,
      invoice.zipCode
    ),
    document: invoice.document,
    items: [item1, item2].map(item => new InvoiceItem({ id: new Id(item.id), name: item.name, price: item.price })),
    updatedAt: new Date(),
    createdAt: new Date()
  })

  const MockInvoiceRepository = () => ({
    generate: jest.fn(),
    find: jest.fn().mockResolvedValue(Promise.resolve(output)),
  })

  it('should generate an invoice', async () => {
    const repository = MockInvoiceRepository()
    const usecase = new FindInvoiceUseCase(repository)

    const input = { id: '1' }

    const result =  await usecase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(output.name)
    expect(result.document).toEqual(output.document)
    expect(result.address.street).toEqual(output.address.street)
    expect(result.address.number).toEqual(output.address.number)
    expect(result.address.complement).toEqual(output.address.complement)
    expect(result.address.city).toEqual(output.address.city)
    expect(result.address.state).toEqual(output.address.state)
    expect(result.address.zipCode).toEqual(output.address.zipCode)
    expect(result.items.length).toEqual(2)
    expect(result.items[0].id).toEqual(item1.id)
    expect(result.items[0].name).toEqual(item1.name)
    expect(result.items[0].price).toEqual(item1.price)
    expect(result.items[1].id).toEqual(item2.id)
    expect(result.items[1].name).toEqual(item2.name)
    expect(result.items[1].price).toEqual(item2.price)
    expect(result.total).toEqual(item1.price + item2.price)
  })
})
