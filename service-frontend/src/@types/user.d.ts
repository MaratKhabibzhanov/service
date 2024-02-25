type FullName = {
  last_name: string;
  first_name: string;
  patronymic: string;
};
type NewUser = FullName & {
  username: string;
  password: string;
  email: string;
};

type User = NewUser & { role: UserRole; id: number };

type UserToUpdate = Omit<NewUser, 'username' | 'password'>;

type UserRole = 'USER' | 'MANAGER';

type LogIn = { username: string; password: string };

type Client = FullName & {
  id: number;
  username: string;
  email: string;
};
