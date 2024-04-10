import InvoiceGateway from "../../gateway/invoice.gateway";
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "./find-invoice.usecase.dto";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";

export default class FindInvoiceUseCase implements UseCaseInterface {
  constructor(readonly invoiceRepository: InvoiceGateway) {}

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      })),
      createdAt: invoice.createdAt,
      total: invoice.items.reduce((acc, item) => acc + item.price, 0)
    }
  }
}
