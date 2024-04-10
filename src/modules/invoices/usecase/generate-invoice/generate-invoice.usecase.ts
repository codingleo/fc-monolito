import InvoiceGateway from "../../gateway/invoice.gateway";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.usecase.dto";
import Invoice from "../../domain/invoice.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItem from "../../domain/invoice-item.entity";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(readonly invoiceRepository: InvoiceGateway) {}

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice = new Invoice({
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
      items: input.items.map(item => new InvoiceItem({ id: new Id(item.id), name: item.name, price: item.price })),
      updatedAt: new Date(),
      createdAt: new Date()
    })

    const result = await this.invoiceRepository.generate(invoice);

    return {
      id: result.id.id,
      name: result.name,
      street: result.address.street,
      number: result.address.number,
      complement: result.address.complement,
      city: result.address.city,
      state: result.address.state,
      zipCode: result.address.zipCode,
      document: result.document,
      items: result.items.map(item => ({ id: item.id.id, name: item.name, price: item.price })),
      total: result.items.reduce((acc, item) => acc + item.price, 0),
    }
  }
}
