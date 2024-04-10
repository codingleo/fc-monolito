import {FindInvoiceUseCaseOutputDTO} from "./find-invoice.usecase.dto";
import FindInvoiceUseCase from "./find-invoice.usecase";

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

  const output: FindInvoiceUseCaseOutputDTO = {
    id: '1',
    name: 'name',
    document: '000.000.000/0001-00',
    address: {
      street: 'street',
      number: '123',
      complement: 'complement',
      city: 'Anapolis',
      state: 'GO',
      zipCode: '75000-000',
    },
    items: [item1, item2],
    total: item1.price + item2.price,
    createdAt: new Date(),
  }

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
    expect(result.items).toEqual(output.items)
    expect(result.total).toEqual(item1.price + item2.price)
  })
})
