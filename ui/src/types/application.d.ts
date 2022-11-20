type Nullable<T> = T | null;

interface IClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

type NewClient = Omit<IClient, 'id'>;
type NotifTypes = 'success' | 'error';

interface IApplicationState {
  clients: IClient[];
  notif: Nullable<{ type: NotifTypes, message: string; }>;
}
