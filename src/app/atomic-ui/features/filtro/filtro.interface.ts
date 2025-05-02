export interface IFiltroResponse {
  key: string;
  content: { id: string; value: string }[];
}

export interface IFiltro extends IFiltroResponse {
  estado: 'aplicado' | 'sin-aplicar';
  appliedValue: string | null;
}
