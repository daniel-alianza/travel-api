import { PaginationInput } from './pagination.input';

export interface CreateUserInput {
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  password: string;
  companyId: number;
  branchId: number;
  areaId: number;
  roleId: number;
  supervisorId?: number;
}

export interface UpdateUserInput {
  name?: string;
  paternalSurname?: string;
  maternalSurname?: string;
  email?: string;
  password?: string;
  companyId?: number;
  branchId?: number;
  areaId?: number;
  roleId?: number;
  supervisorId?: number;
  isActive?: boolean;
}

export interface User {
  id: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  isActive: boolean;
  company: {
    id: number;
    name: string;
  };
  branch: {
    id: number;
    name: string;
  };
  area: {
    id: number;
    name: string;
  };
  role: {
    id: number;
    name: string;
  };
  supervisor?: {
    id: number;
    name: string;
    email: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRepository {
  findAll(input?: PaginationInput): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
  update(id: number, input: UpdateUserInput): Promise<User>;
  deleteById(id: number): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
}
