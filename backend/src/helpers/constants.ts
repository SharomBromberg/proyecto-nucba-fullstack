export const ROLES = {
  admin: "admin",
  user: "user",
} as const;

export const ORDER_STATUS = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  shipping: "En camino",
  delivered: "Entregada",
  cancelled: "Cancelada",
} as const;

export const ORDER_STATUS_VALUES = Object.values(ORDER_STATUS);
