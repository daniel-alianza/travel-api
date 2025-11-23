import { RequestUser } from 'fg-portal-auth';

export interface UserRepository {
  findUserByEmail(email: string): Promise<UserWithPassword | null>;
  findUserWithAppPermissions(userId: number): Promise<RequestUser | null>;
}

export interface UserWithPassword {
  id: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  password: string;
  isActive: boolean;
  role: {
    name: string;
  };
}
