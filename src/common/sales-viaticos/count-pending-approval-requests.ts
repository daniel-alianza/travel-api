export type ApprovalRequestForNoticeCount = {
  readonly status: string;
  readonly trips: readonly { readonly tripApprovalStatus: string }[];
};

export function contarSolicitudesPendientesAprobacion(
  solicitudes: readonly ApprovalRequestForNoticeCount[],
): number {
  return solicitudes.filter((solicitud) => {
    if (
      solicitud.status === 'pending' ||
      solicitud.status === 'awaiting_trip_correction'
    ) {
      return true;
    }
    return solicitud.trips.some(
      (viaje) => viaje.tripApprovalStatus === 'pending',
    );
  }).length;
}
