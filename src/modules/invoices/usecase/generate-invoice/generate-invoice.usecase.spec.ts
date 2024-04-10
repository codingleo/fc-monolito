import {GenerateInvoiceUseCaseInputDto} from "./generate-invoice.usecase.dto";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoice-item.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/domain/value-object/address";

describe('GenerateInvoiceUsecase', () => {
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

  const input: GenerateInvoiceUseCaseInputDto = {
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
    name: input.name,
    address: new Address(
      input.street,
      input.number,
      input.complement,
      input.city,
      input.state,
      input.zipCode
    ),
    document: input.document,
    items: [item1, item2].map(item => new InvoiceItem({ id: new Id(item.id), name: item.name, price: item.price })),
    updatedAt: new Date(),
    createdAt: new Date()
  })

  const MockInvoiceRepository = () => ({
    generate: jest.fn().mockResolvedValue(Promise.resolve(output)),
    find: jest.fn()
  })

  it('should generate an invoice', async () => {
    const repository = MockInvoiceRepository()
    const usecase = new GenerateInvoiceUseCase(repository)

    const result =  await usecase.execute(input)

    expect(repository.generate).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.document).toEqual(input.document)
    expect(result.street).toEqual(input.street)
    expect(result.number).toEqual(input.number)
    expect(result.complement).toEqual(input.complement)
    expect(result.city).toEqual(input.city)
    expect(result.state).toEqual(input.state)
    expect(result.zipCode).toEqual(input.zipCode)
    expect(result.items).toEqual(input.items)
    expect(result.total).toEqual(item1.price + item2.price)
  })
})
