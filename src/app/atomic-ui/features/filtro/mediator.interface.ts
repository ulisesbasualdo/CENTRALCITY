import { IColleague } from './i-colleague';

export interface IMediator {
  // notificarAbrir: (enviador: FiltroComponenteMediador, evento: 'abrir') => void;
  // notificarCerrar: (enviador: FiltroComponenteMediador, evento: 'cerrar') => void;
  // notificarCerrarTodos: (enviador: FiltroComponenteMediador, evento: 'cerrar-todos') => void;
  addColleague(colleague: IColleague): void;
  send(message: string, iColleague: IColleague): void;
}
