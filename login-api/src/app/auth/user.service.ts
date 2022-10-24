import { Injectable } from '@nestjs/common';
import { User } from './models/user';

@Injectable()
export class UserService {
  private readonly users: User[];
  constructor() {
    this.users = [
      {
        id: 1,
        name: 'Lucas Epanel',
        email: 'lucas@epanel.com.br',
        password: '123',
      },
      {
        id: 2,
        name: 'Lucas Eliti',
        email: 'lucas@eliti.com.br',
        password: '321',
      },
    ];
  }

  public getUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
}
