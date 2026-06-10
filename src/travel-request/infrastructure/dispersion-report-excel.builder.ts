import { Workbook } from 'exceljs';
import type { ApprovalRequestRecord } from '../application/interfaces/travel-request-repository.interface';

export type DispersionReportExcelRow = {
  readonly nombreSolicitante: string;
  readonly numeroTarjetaViaticos: string;
  readonly motivoSolicitud: string;
  readonly fechaInicio: string;
  readonly fechaRegreso: string;
  readonly nombreAprobadorJefeDirecto: string;
};

const ENCABEZADOS_REPORTE = [
  'Nombre del solicitante',
  'numero completo de la tarjeta de viaticos',
  'motivo de la solicitud',
  'fecha de inicio',
  'fecha de regreso',
  'Nombre del Aprobador/jefe directo',
] as const;

export function mapDispersedRequestToReportRow(
  request: ApprovalRequestRecord,
): DispersionReportExcelRow {
  const viajes = request.trips
    .slice()
    .sort((a, b) => a.tripOrder - b.tripOrder);
  const salidas = viajes
    .map((viaje) => formatDateToDisplayDay(viaje.departureDate))
    .filter((fecha) => fecha.length > 0)
    .sort();
  const regresos = viajes
    .map((viaje) => formatDateToDisplayDay(viaje.returnDate))
    .filter((fecha) => fecha.length > 0)
    .sort();
  const motivos = viajes
    .map((viaje) => viaje.purpose.trim())
    .filter((texto) => texto.length > 0);
  const motivoUnico = [...new Set(motivos)].join(' | ');

  return {
    nombreSolicitante: request.employeeName.trim(),
    numeroTarjetaViaticos: formatFullCorporateCardNumber(
      request.corporateCardNumber,
    ),
    motivoSolicitud:
      motivoUnico.length > 0 ? motivoUnico : 'Sin motivo registrado',
    fechaInicio: salidas[0] ?? '',
    fechaRegreso: regresos[regresos.length - 1] ?? '',
    nombreAprobadorJefeDirecto: resolveApproverDisplayName(request, viajes),
  };
}

export async function buildDispersionReportExcelBuffer(
  rows: readonly DispersionReportExcelRow[],
): Promise<Buffer> {
  const workbook = new Workbook();
  const sheet = workbook.addWorksheet('Dispersión de viáticos', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  sheet.addRow([...ENCABEZADOS_REPORTE]);
  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

  for (const row of rows) {
    sheet.addRow([
      row.nombreSolicitante,
      row.numeroTarjetaViaticos,
      row.motivoSolicitud,
      row.fechaInicio,
      row.fechaRegreso,
      row.nombreAprobadorJefeDirecto,
    ]);
  }

  sheet.columns = [
    { width: 32 },
    { width: 28 },
    { width: 48 },
    { width: 16 },
    { width: 16 },
    { width: 36 },
  ];

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}

function resolveApproverDisplayName(
  request: ApprovalRequestRecord,
  viajes: ApprovalRequestRecord['trips'],
): string {
  const jefe = request.approver?.name.trim() ?? '';
  if (jefe.length > 0) {
    return jefe;
  }
  for (const viaje of viajes) {
    const aprobadorViaje = viaje.approvedBy?.name.trim() ?? '';
    if (aprobadorViaje.length > 0) {
      return aprobadorViaje;
    }
  }
  return 'Sin aprobador registrado';
}

function formatFullCorporateCardNumber(value: string | null): string {
  if (value === null || value.trim().length === 0) {
    return 'Sin tarjeta corporativa';
  }
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) {
    return value.trim();
  }
  return digits;
}

function formatDateToDisplayDay(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}
