import InvoiceGateway from "../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO
} from "../usecase/find-invoice/find-invoice.usecase.dto";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto
} from "../usecase/generate-invoice/generate-invoice.usecase.dto";
import InvoiceModel from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItemModel from "./invoice-item.model";

export default class InvoiceRepository implements InvoiceGateway {
  async find(params: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await InvoiceModel.findOne({where: {id: params.id}, include: {all: true}});

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    return {
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipcode
      },
      items: invoice.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price
      })),
      total: invoice.items.reduce((acc, item) => acc + item.price, 0),
      createdAt: invoice.createdAt,
    }
  }

  async generate(params: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const items = params.items.map(item => InvoiceItemModel.build({
      id: new Id(item.id).id,
      name: item.name,
      price: item.price,
    }))

    const result = await InvoiceModel.create({
      id: new Id().id,
      name: params.name,
      document: params.document,
      street: params.street,
      number: params.number,
      complement: params.complement,
      city: params.city,
      state: params.state,
      zipcode: params.zipCode,
      items: items
    }, {include: {all: true}})

    return {
      id: result.id,
      name: result.name,
      document: result.document,
      street: result.street,
      number: result.number,
      complement: result.complement,
      city: result.city,
      state: result.state,
      zipCode: result.zipcode,
      items: result.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price
      })),
      total: result.items.reduce((acc, item) => acc + item.price, 0),
    }
  }
}
