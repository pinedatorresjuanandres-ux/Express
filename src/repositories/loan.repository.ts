import { ICreateLoanDTO } from '../dtos/loan.dto';

export type LoanStatus = 'PENDIENTE_APROBACION' | 'APROBADO_Y_FIRMADO';

// El id es BIGINT en PostgreSQL; se expone como texto para no perder
// precisión en JSON (Number solo es exacto hasta 2^53 - 1).
export interface Loan extends ICreateLoanDTO {
  id: string;
  estado: LoanStatus;
  createdAt: string;
  acceptedAt: string | null;
}

export interface LoanFilters {
  roomId?: string;
}

export interface LoanRepository {
  create(input: ICreateLoanDTO): Promise<Loan>;
  findAll(filters?: LoanFilters): Promise<Loan[]>;
  findById(id: string): Promise<Loan | null>;
  updateStatus(
    id: string,
    expectedStatus: LoanStatus,
    status: LoanStatus
  ): Promise<Loan | null>;
}
