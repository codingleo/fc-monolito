import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto
} from "../usecase/generate-invoice/generate-invoice.usecase.dto";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO
} from "../usecase/find-invoice/find-invoice.usecase.dto";

export default interface InvoiceGateway {
  generate: (invoice: GenerateInvoiceUseCaseInputDto) => Promise<GenerateInvoiceUseCaseOutputDto>
  find: (id: FindInvoiceUseCaseInputDTO) => Promise<FindInvoiceUseCaseOutputDTO>
}
