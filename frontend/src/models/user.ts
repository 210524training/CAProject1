export default interface User {
  
     username: string,
     password: string,
     userClass: userClass,
     department: string,
     email: string,
     name: string,
     supervisor: string,
     yearReimbursement: number,
}

export type userClass = 'Employee' | 'BenCo' | 'Head' | 'Supervisor';

