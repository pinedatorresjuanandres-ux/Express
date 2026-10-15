import { Request, Response } from 'express';

export class IncidentController {
  public static createIncident = (req: Request, res: Response): void => {
    // TODO: llamar al servicio con req.body (equipo o ambiente asociado) y responder 201 con la novedad creada.
    res.status(501).json({
      success: false,
      message: 'El registro de novedades todavía no está implementado.'
    });
  };

  public static getIncidents = (req: Request, res: Response): void => {
    // TODO: llamar al servicio y responder con el historial de incidencias.
    res.status(501).json({
      success: false,
      message: 'La consulta del historial de novedades todavía no está implementada.'
    });
  };

  public static updateIncidentStatus = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: actualizar el estado (pendiente, en proceso, resuelto) con req.body.
    res.status(501).json({
      success: false,
      message: `La actualización de la novedad ${id} todavía no está implementada.`
    });
  };
}
