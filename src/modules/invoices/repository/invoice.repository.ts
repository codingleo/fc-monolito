import InvoiceGateway from "../gateway/invoice.gateway";
import {FindInvoiceUseCaseOutputDTO} from "../usecase/find-invoice/find-invoice.usecase.dto";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto
} from "../usecase/generate-invoice/generate-invoice.usecase.dto";
import InvoiceModel from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItemModel from "./invoice-item.model";
import Invoice from "../domain/invoice.entity";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItem from "../domain/invoice-item.entity";

export default class InvoiceRepository implements InvoiceGateway {
  async find (id: string): Promise<Invoice> {
    const result = await InvoiceModel.findOne({where: { id }, include: {all: true}});

    if (!result) {
      throw new Error('Invoice not found');
    }

    return new Invoice({
      id: new Id(result.id),
      name: result.name,
      document: result.document,
      address: new Address(

          result.street,
          result.number,
          result.complement,
          result.city,
          result.state,
          result.zipcode

      ),
      items: result.items.map(item => {
        return new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price
        })
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    })
  }

  async generate (invoice: Invoice): Promise<Invoice> {
    const items = invoice.items.map(item => InvoiceItemModel.build({
      id: item.id.id,
      name: item.name,
      price: item.price,
    }))

    const result = await InvoiceModel.create({
      id: new Id().id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipcode: invoice.address.zipCode,
      items: items
    }, {include: {all: true}})

    return new Invoice({
      id: new Id(result.id),
      name: result.name,
      document: result.document,
      address: new Address(
        result.street,
        result.number,
        result.complement,
        result.city,
        result.state,
        result.zipcode
      ),
      items: result.items.map(item => {
        return new InvoiceItem({
          id: new Id(item.id),
          name: item.name,
          price: item.price
        })
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    })
  }
}
