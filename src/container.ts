import { prisma } from './db/prisma';
import { PrismaLoanRepository } from './repositories/prisma-loan.repository';
import { LoanService } from './services/loan.service';

// Punto de composición: la Sesión 5 cambia el adaptador en memoria por
// PostgreSQL (Prisma). Ni el servicio ni el controller cambian de contrato.
const loanRepository = new PrismaLoanRepository(prisma);
export const loanService = new LoanService(loanRepository);
