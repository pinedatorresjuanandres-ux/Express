import { Request, Response } from 'express';

export class EquipmentController {
  public static createEquipment = (req: Request, res: Response): void => {
    // TODO: llamar al servicio con req.body (incluyendo el ambiente) y responder 201 con el equipo creado.
    res.status(501).json({
      success: false,
      message: 'El registro de equipos todavía no está implementado.'
    });
  };

  public static getEquipment = (req: Request, res: Response): void => {
    // TODO: tomar el filtro de ambiente de req.query, llamar al servicio y responder con los equipos.
    res.status(501).json({
      success: false,
      message: 'El listado de equipos todavía no está implementado.'
    });
  };

  public static updateEquipment = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: actualizar parcialmente el estado técnico o la ubicación con req.body.
    res.status(501).json({
      success: false,
      message: `La actualización del equipo ${id} todavía no está implementada.`
    });
  };
}
