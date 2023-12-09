type NewUser = {
  username: string;
  password: string;
  email: string;
  last_name: string;
  first_name: string;
  patronim: string;
};

type User = NewUser & { role: UserRole };

type UserToUpdate = Omit<NewUser, 'username' | 'password'>;

type UserRole = 'USER' | 'MANAGER';

type LogIn = { username: string; password: string };
