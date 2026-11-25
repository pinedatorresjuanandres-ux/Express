import { Request, Response } from 'express';
import { loanService } from '../container';
import { ICreateLoanDTO } from '../dtos/loan.dto';

// Express 5 envía al globalErrorHandler cualquier rechazo de un handler async.
export class LoanController {
  public static createLoan = async (
    req: Request<Record<string, string>, unknown, ICreateLoanDTO>,
    res: Response
  ): Promise<void> => {
    const loan = await loanService.createLoan(req.body);
    res.status(201).json({ success: true, data: loan });
  };

  public static getLoansByFilter = async (
    req: Request<Record<string, string>, unknown, unknown, { roomId?: string }>,
    res: Response
  ): Promise<void> => {
    // validateLoanSearchQuery ya garantizó que roomId es un UUID o no viene.
    const { roomId } = req.query;
    const loans = await loanService.getLoans({ roomId });
    res.status(200).json({ success: true, data: loans });
  };

  public static getLoanById = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const loan = await loanService.getLoanDetail(req.params.id);
    res.status(200).json({ success: true, data: loan });
  };

  public static acceptLoanInventory = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    const loan = await loanService.acceptLoan(req.params.id);
    res.status(200).json({ success: true, data: loan });
  };
}
