import Application, { approval, courseType, gradeType } from "../../models/application";
import User, { userClass } from "../../models/user";
import TRMClient from "./TRM.client";

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const { data: user } = await TRMClient.post<User>('/login', {
    username,
    password,
  });

  return user;
}

export const getByUsername = async (username: string): Promise<User> => {
  const { data: user } = await TRMClient.get<User>(`/api/v1/users/${username}`);
  return user;
}

export const getBySupervisor = async (username: string): Promise<User[]> => {
  const {data} = await TRMClient.get<User[]>(`/api/v1/users/supervisor/${username}`);
  return data;
}

export const getByDepartment = async (department: string): Promise<User[]> => {
  const {data} = await TRMClient.get<User[]>(`/api/v1/users/department/${department}`);
  return data;
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

export const submitApp = async (username: string,
  name: string,
  email: string,
  id: string,
  supervisorApproval: approval,
  benCoApproval: approval,
  headApproval: approval,
  courseName: string,
  courseType: courseType,
  amount: number,
  adjustedAmount: number,
  appDate: Date,
  courseDate: Date,
  courseLocation: string,
  gradeType: gradeType,
  gradeApproval: approval,
  gradeDescription: string,
  justification: string,
  courseDescription: string,
  urgent: boolean,
  specialApproval: boolean,
  preapprovalDescription: string,
  missedWorkDesc: string,
  SToEm: string,
  EmToS: string,
  HToEm: string,
  EmToH: string,
  HToS: string,
  SToH: string,
  BCToEm: string,
  EmToBC: string,
  BCToS: string,
  SToBC: string,
  BCToH: string,
  HToBC: string,): Promise<boolean> => {
  const { data } = await TRMClient.post<Application>('api/v1/applications', {
    username,
    name,
    email,
    id,
    supervisorApproval,
    benCoApproval,
    headApproval,
    courseName,
    courseType,
    amount,
    adjustedAmount,
    appDate,
    courseDate,
    courseLocation,
    gradeType,
    gradeApproval,
    gradeDescription,
    justification,
    courseDescription,
    urgent,
    specialApproval,
    preapprovalDescription,
    missedWorkDesc,
    SToEm,
    EmToS,
    HToEm,
    EmToH,
    HToS,
    SToH,
    BCToEm,
    EmToBC,
    BCToS,
    SToBC,
    BCToH,
    HToBC,
  });

  if(data) {
    return true;
  }
  else {
    return false;
  }
}

export const getApps = async (): Promise<Application[]> => {
  const { data } = await TRMClient.get<Application[]>('api/v1/applications');
  return data;
}

export const getAppsByUsername = async (username:string): Promise<Application[]> => {
  const {data} = await TRMClient.get<Application[]>(`api/v1/applications/${username}`);
  return data;
}

export const deleteApp = async (id:string): Promise<boolean> => {
  const{data} = await TRMClient.delete<boolean>(`api/v1/applications/${id}`);
  return data;
}