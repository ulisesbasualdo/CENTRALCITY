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
  social: {
    facebook: {
      name: string;
      type: 'Página' | 'Grupo' | 'Perfil Personal' | '';
      link: string;
    };
    instagram: {
      username: string;
      link: string;
    };
    twitter: string;
    youtube: string;
    tiktok: string;
    web: string;
    email: string;
    linkedin: string;
  };
}
