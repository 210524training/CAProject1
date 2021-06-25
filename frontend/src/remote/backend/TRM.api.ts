import User, { userClass } from "../../models/user";
import TRMClient from "./TRM.client";

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await TRMClient.post<User>('/login', {
    username,
    password,
  });

  return user;
}

export const getByUsername = async (username:string): Promise<User> => {
  const { data: user } = await TRMClient.get<User>(`/api/v1/users/${username}`);
  return user;
}

export const register = async (username: string, password: string, userClass: userClass, department: string, email: string, name: string,
  supervisor: string, yearReimbursement: number): Promise<boolean> => {
  const { data } = await TRMClient.post<User>('api/v1/users', {
    username,
    password,
    userClass,
    department,
    email,
    name,
    supervisor,
    yearReimbursement,
  });

  if (data) {
    return true;
  }
  else {
    return false;
  }
}

