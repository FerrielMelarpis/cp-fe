interface IClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

type NewClient = Omit<IClient, 'id'>;

interface IApplicationState {
  clients: IClient[];
}
