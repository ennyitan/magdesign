export const NewsMenu: INewsMenu[] = [
    {
      name: 'Home',
      route: '/',
    },
    {
      name: 'Categories',
      route: '',
    },
    {
        name: 'Travel',
        route: '',
      },
      {
        name: 'Food',
        route: '',
      },
      {
        name: 'Technology',
        route: '',
      },
      {
        name: 'Buisness',
        route: '',
      },
  ];
  export interface INewsMenu {
    name: string;
    route: string;
  }