import InvoiceGateway from "../../gateway/invoice.gateway";
import {FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO} from "./find-invoice.usecase.dto";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";

export default class FindInvoiceUseCase implements UseCaseInterface {
  constructor(readonly invoiceRepository: InvoiceGateway) {}

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    return await this.invoiceRepository.find(input);
  }
}
