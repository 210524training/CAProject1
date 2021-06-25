import React, { ChangeEvent, FormEvent, SetStateAction, useEffect, useState, Dispatch } from 'react';
import '../register-page/RegisterPage.css';
import TRMClient from '../../../remote/backend/TRM.client';
import User from '../../../models/user';
import { v4 as uuidv4 } from 'uuid';
import { courseType, gradeType } from '../../../models/application';

const FileApplicationPage: React.FC<unknown> = (props) => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [courseName, setCourseName] = useState<string>();
  const [courseType, setCourseType] = useState<courseType>();
  const [amount, setAmount] = useState<number>();
  const [adjustedAmount, setAdjustedAmount] = useState<number>();
  const [courseDate, setCourseDate] = useState<Date>();
  const [courseLocation, setCourseLocation] = useState<string>();
  const [gradeType, setGradeType] = useState<gradeType>();
  const [gradeDescription, setGradeDescription] = useState<string>();
  const [justification, setJustification] = useState<string>();
  const [courseDescription, setCourseDescription] = useState<string>();
  const [preapprovalDescription, setPreapprovalDescription] = useState<string>();
  const [missedWorkDesc, setMissedWorkDesc] = useState<string>();

  const currentDate = new Date();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCourseNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseName(e.target.value);
  };


  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await TRMClient.post<boolean>('/api/v1/users', {
     username,
     name,
     email,
     id: uuidv4(),
     supervisorApproval: 'Pending',
     benCoApproval: 'Pending',
     headApproval: 'Pending',
     courseName,
     courseType,
     amount,
     adjustedAmount,
     appDate: currentDate,
     courseDate,
     courseLocation,
     gradeType,
     gradeApproval: 'Pending',
     gradeDescription,
     justification,
     courseDescription,
     urgent: false,
     specialApproval: false,
     preapprovalDescription,
     missedWorkDesc,
     SToEm: '',
     EmToS: '',
     HToEm: '',
     EmToH: '',
     HToS: '',
     SToH: '',
     BCToEm: '',
     EmToBC: '',
     BCToS: '',
     SToBC: '',
     BCToH: '',
     HToBC: '',
    });

    console.log(response.data);
  }

  return (
    <div className='container' id='application-form'>
      <form onSubmit={handleFormSubmit} >
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">Username</label>
          <input type="text" className="form-control" id="usernameInput"
            onChange={handleUsernameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input type="text" className="form-control" id="emailInput"
            onChange={handleEmailChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">Name</label>
          <input type="text" className="form-control" id="nameInput"
            onChange={handleNameChange} />
        </div>
        <input type="submit" className="btn btn-primary" value='Submit' />
      </form>
    </div>
  );
};

export default FileApplicationPage;