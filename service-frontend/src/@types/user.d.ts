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

type User = NewUser & { role: UserRole };

type UserToUpdate = Omit<NewUser, 'username' | 'password'>;

type UserRole = 'USER' | 'MANAGER';

type LogIn = { username: string; password: string };
