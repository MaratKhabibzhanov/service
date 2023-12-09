type NewUser = {
  username: string;
  password: string;
  email: string;
  last_name: string;
  first_name: string;
  patronim: string;
};

type UserRole = 'USER' | 'MANAGER';

type User = NewUser & { role: UserRole };

type LogIn = { username: string; password: string };
