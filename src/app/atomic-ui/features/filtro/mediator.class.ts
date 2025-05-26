import { UIFiltroDropdownComponent } from './filtro-dropdown/filtro-dropdown.component';
import { IColleague } from './i-colleague';
import { IMediator } from './mediator.interface';

export class Mediator implements IMediator {
  private readonly _colleagues: IColleague[];
  private _activeDropdown: UIFiltroDropdownComponent | null = null;
  private _isAnyDropdownOpen: boolean = false;

  get activeDropdown(): UIFiltroDropdownComponent | null {
    return this._activeDropdown;
  }

  set activeDropdown(dropdown: UIFiltroDropdownComponent | null) {
    this._activeDropdown = dropdown;
  }
  constructor() {
    this._colleagues = new Array<IColleague>();
  }

  get isAnyDropdownOpen(): boolean {
    return this._isAnyDropdownOpen;
  }
  set isAnyDropdownOpen(value: boolean) {
    this._isAnyDropdownOpen = value;
  }

  public addColleague(colleague: IColleague): void {
    this._colleagues.push(colleague);
  }

  send(message: string, iColleague: IColleague): void {
    for (const colleague of this._colleagues) {
      if (colleague !== iColleague) {
        colleague.receive(message);
      }
    }
  }
}
