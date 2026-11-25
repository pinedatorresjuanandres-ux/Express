import { ICreateLoanDTO } from '../dtos/loan.dto';
import { Loan, LoanFilters, LoanRepository, LoanStatus } from './loan.repository';

// Adaptador de la Sesión 4. Se conserva para practicar sin base de datos:
// basta con usarlo en src/container.ts en lugar de PrismaLoanRepository.
export class InMemoryLoanRepository implements LoanRepository {
  private readonly loans = new Map<string, Loan>();
  private nextId = 1;

  public async create(input: ICreateLoanDTO): Promise<Loan> {
    const loan: Loan = {
      ...input,
      id: String(this.nextId++),
      estado: 'PENDIENTE_APROBACION',
      createdAt: new Date().toISOString(),
      acceptedAt: null
    };
    this.loans.set(loan.id, loan);
    return { ...loan };
  }

  public async findAll(filters: LoanFilters = {}): Promise<Loan[]> {
    const normalizedRoomId = filters.roomId?.toLowerCase();
    return Array.from(this.loans.values())
      .filter(
        (loan) =>
          !normalizedRoomId || loan.roomId.toLowerCase() === normalizedRoomId
      )
      .map((loan) => ({ ...loan }));
  }

  public async findById(id: string): Promise<Loan | null> {
    const loan = this.loans.get(id);
    return loan ? { ...loan } : null;
  }

  public async updateStatus(
    id: string,
    expectedStatus: LoanStatus,
    status: LoanStatus
  ): Promise<Loan | null> {
    const loan = this.loans.get(id);
    if (!loan || loan.estado !== expectedStatus) {
      return null;
    }

    const updated: Loan = {
      ...loan,
      estado: status,
      acceptedAt:
        status === 'APROBADO_Y_FIRMADO'
          ? new Date().toISOString()
          : loan.acceptedAt
    };
    this.loans.set(id, updated);
    return { ...updated };
  }
}
