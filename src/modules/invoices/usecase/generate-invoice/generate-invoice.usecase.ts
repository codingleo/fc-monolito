import InvoiceGateway from "../../gateway/invoice.gateway";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import {GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto} from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(readonly invoiceRepository: InvoiceGateway) {}

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    return await this.invoiceRepository.generate(input);
  }
}
