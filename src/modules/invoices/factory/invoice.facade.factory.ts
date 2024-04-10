import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "../facade/invoice.facade";

export default class InvoiceFacadeFactory {
  static create() {
    const repository = new InvoiceRepository()
    const findInvoiceUseCase = new FindInvoiceUseCase(repository)
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository)
    return new InvoiceFacade(
      findInvoiceUseCase,
      generateInvoiceUseCase
    )
  }
}
