export default class User {
  constructor(
    public username: string,
    public password: string,
    public userClass: userClass = 'Employee',
    public department: string,
    public email: string,
    public name: string,
    public supervisor: string,
    public yearReimbursement: number,
  ) {}
}

export type userClass = 'Employee' | 'BenCo' | 'Head' | 'Supervisor';

