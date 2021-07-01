import { v4 as uuidv4 } from 'uuid';

export default class Application {
  constructor(
    public username: string,
    public name: string,
    public email: string,
    public id: string = uuidv4(),
    public supervisorApproval: approval = 'Pending',
    public benCoApproval: approval = 'Pending',
    public headApproval: approval = 'Pending',
    public courseName: string,
    public courseType: courseType,
    public amount: number,
    public adjustedAmount: number,
    public appDate: Date,
    public courseDate: Date,
    public courseLocation: string,
    public gradeType: gradeType,
    public gradeApproval: approval = 'Pending',
    public gradeDescription: string = 'Defaults: C, 70% (or equivalent score, rounding up), presentation approved.',
    public justification: string,
    public courseDescription: string,
    public urgent: boolean = false,
    public specialApproval: boolean = false,
    public grade: string,
    public startFile: {},
    public secondFile: {},
    public preapprovalDescription?: string,
    public missedWorkDesc?: string,
    public SToEm?: string,
    public EmToS?: string,
    public HToEm?: string,
    public EmToH?: string,
    public HToS?: string,
    public SToH?: string,
    public BCToEm?: string,
    public EmToBC?: string,
    public BCToS?: string,
    public SToBC?: string,
    public BCToH?: string,
    public HToBC?: string,
  ) {}
}

export type approval = 'Approved' | 'Pending' | 'Rejected';
export type courseType = 'University Course' | 'Seminar' | 'Certification Prep' | 'Certification' | 'Tech Training' | 'Other';
export type gradeType = 'Letter Grade' | 'Score' | 'Percent Score' | 'Presentation';