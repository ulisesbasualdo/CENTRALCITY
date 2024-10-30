export interface IData {
  id: number;
  name: string;
  note: string;
  description: string;
  dataItems: IDataItem[];
}

export interface IDataItem {
  name: string;
  location: {
    address: string;
    googleMapsLink: string;
  };
  phone: {
    number: string;
    link: string;
    tentativeNumber: string;
    tentativeLink: string;
  };
  celphone: {
    number: string;
    link: string;
    tentativeNumber: string;
    tentativeLink: string;
  };
  whatsapp: {
    number: string;
    link: string;
    tentativeNumber: string;
    tentativeLink: string;
  };
  email: {
    address: string;
    link: string;
  };
  web: {
    url: string;
  };
  social: ISocialData[];
}

export interface ISocialData {
  platform: 'fb' | 'ig' | 'x' | 'yt' | 'li' | 'tt' | 'gmaps' | null;
  username: string;
  name: string;
  type: string;
  link: string;
}
