export interface ILocation {
  address: string;
  googleMapsLink: string;
}

export interface IPhone {
  number: string;
  link: string;
}

export interface IContact {
  phone: IPhone[];
}

export interface IDataPlace {
  name: string;
  location: ILocation[];
  contact?: IContact;
}

export interface ILink {
  name: string;
  description?: string,
  url: string;
  type?: string;
  note?: string;
}

export interface IData {
  id: number;
  name: string;
  note?: string;
  description: string;
  places?: IDataPlace[];
  links?: ILink[];
}