import User from '../models/user';
import userDAO, { UserDAO } from '../repositories/UserRepo';

export class UserService {
  private dao: UserDAO;

  constructor() {
    this.dao = userDAO;
  }

  getByUsername(username: string): Promise<User | undefined> {
    return this.dao.getByUsername(username);
  }

  getBySupervisor(username: string): Promise<User[] | undefined> {
    return this.dao.getUserBySupervisor(username);
  }

  getByDepartment(department:string): Promise<User[] | undefined> {
    return this.dao.getUserByDepartment(department);
  }

  register(user: User): Promise<boolean> {
    return this.dao.register(new User(
      user.username,
      user.password,
      user.userClass,
      user.department,
      user.email,
      user.name,
      user.supervisor,
      user.yearReimbursement,
    ));
  }

  updateUser(user: User): Promise<boolean> {
    return this.dao.updateUser(new User(
      user.username,
      user.password,
      user.userClass,
      user.department,
      user.email,
      user.name,
      user.supervisor,
      user.yearReimbursement,
    ));
  }

  async login(username: string, password: string): Promise<User | undefined> {
    const user = await this.dao.getByUsername(username);
    if(user && user.password === password) {
    return user;
    }
    else {
      throw new Error('Login failed.')
    }
  }
}

const userService = new UserService();

export default userService;
