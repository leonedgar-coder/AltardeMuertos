// Usamos 127.0.0.1 en lugar de localhost para evitar problemas de resolución IPv4/IPv6 en desarrollo
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000';
