import React, { ChangeEvent, FormEvent, useEffect, useState, } from 'react';
import '../register-page/RegisterPage.css';
import TRMClient from '../../../remote/backend/TRM.client';
import User from '../../../models/user';
import { v4 as uuidv4 } from 'uuid';
import { courseType, gradeType } from '../../../models/application';

type Props = {
  currentUser?: User,
}

const FileApplicationPage: React.FC<Props> = (props) => {
  const [username, setUsername] = useState<string>();
  const [currentDate, setCurrentDate] = useState<Date>();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [courseName, setCourseName] = useState<string>();
  const [courseType, setCourseType] = useState<courseType>();
  const [amount, setAmount] = useState<number>(0);
  const [adjustedAmount, setAdjustedAmount] = useState<number>();
  const [courseDate, setCourseDate] = useState<Date>();
  const [minDate, setMinDate] = useState<Date>();
  const [minString, setMinString] = useState<string>();
  const [courseLocation, setCourseLocation] = useState<string>();
  const [gradeType, setGradeType] = useState<gradeType>();
  const [gradeDescription, setGradeDescription] = useState<string>();
  const [justification, setJustification] = useState<string>();
  const [courseDescription, setCourseDescription] = useState<string>();
  const [preapprovalDescription, setPreapprovalDescription] = useState<string>();
  const [missedWorkDesc, setMissedWorkDesc] = useState<string>();
  const [empFile, setEmpFile] = useState<File>();

  useEffect(() => {
    setUsername(props.currentUser?.username);
    setEmail(props.currentUser?.email);
    setName(props.currentUser?.name);
  }, [props.currentUser])

  useEffect(() => {
    setCurrentDate(new Date());
  }, [])

  useEffect(() => {
      let nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setMinDate(nextWeek);
    
    if (minDate) {
      setMinString(`${minDate.getFullYear()}-${(minDate.getMonth() + 1)}-${minDate.getDate}`);
    }
  }, [])

  useEffect(() => {
    switch (courseType) {
      case "University Course":
        setAdjustedAmount(Number((amount * 0.8).toFixed(2)));
        break;
      case "Seminar":
        setAdjustedAmount(Number((amount * 0.6).toFixed(2)));
        break;
      case "Certification Prep":
        setAdjustedAmount(Number((amount * 0.75).toFixed(2)));
        break;
      case "Certification":
        setAdjustedAmount(Number((amount).toFixed(2)));
        break;
      case "Tech Training":
        setAdjustedAmount(Number((amount * 0.9).toFixed(2)));
        break;
      case "Other":
        setAdjustedAmount(Number((amount * 0.3).toFixed(2)));
        break;
    }
  }, [courseType, amount])

  const handleCourseNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseName(e.target.value);
  };

  const handleCourseTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCourseType(e.target.value as courseType);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value as unknown as number);
  };

  const handleCourseDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseDate(new Date(e.target.value));
  };

  const handleCourseLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseLocation(e.target.value);
  };

  const handleGradeTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGradeType(e.target.value as gradeType);
  };

  const handleGradeDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGradeDescription(e.target.value);
  }

  const handleJustificationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJustification(e.target.value);
  }

  const handleCourseDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseDescription(e.target.value);
  }

  const handlePreapprovalDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPreapprovalDescription(e.target.value);
  }

  const handleSetMissedWorkDescChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMissedWorkDesc(e.target.value);
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
    setEmpFile(e.target.files[0]);}
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await TRMClient.post<boolean>('/api/v1/applications', {
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
      grade: '',
      startFile: empFile,
      secondFile: {},
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
      <br></br>
      <br></br>
      <br></br>
      <form onSubmit={handleFormSubmit} >
        <div className="mb-3">
          <label htmlFor="courseNameInput" className="form-label">Course Name</label>
          <input type="text" className="form-control" id="courseNameInput"
            onChange={handleCourseNameChange} />
        </div>
        <div>
          <label htmlFor="courseTypeSelect" className="form-label">Course Type</label>
          <select name="courseType" id="courseTypeInput" onChange={handleCourseTypeChange}>
            <option value="University Course">University Course</option>
            <option value="Seminar">Seminar</option>
            <option value="Certification Prep">Certification Preparation</option>
            <option value="Certification">Certification</option>
            <option value="Tech Training">Technical Training</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="courseDateInput" className="form-label">Course Date</label>
          <input type="date" className="form-control" id="courseDateInput" min={minString}
            onChange={handleCourseDateChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="courseLocationInput" className="form-label">Course Location</label>
          <input type="text" className="form-control" id="courseLocationInput"
            onChange={handleCourseLocationChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="courseDescInput" className="form-label">Course Description</label>
          <input type="textarea" className="form-control" id="courseDescInput"
            onChange={handleCourseDescriptionChange} />
        </div>
        <div>
          <label htmlFor="amountInput" className="form-label">Course Cost</label>
          <input type="number" className="form-control" id="amountInput" onChange={handleAmountChange} />
        </div>
        <div>
          <label htmlFor="adjustedAmountInput" className="form-label">Estimated Reimbursement</label>
          <input type="number" className="form-control" id="adjustedAmountInput" value={adjustedAmount} readOnly />
        </div>
        <div>
          <label htmlFor="gradeTypeSelect" className="form-label">Grade Type</label>
          <select name="gradeType" id="gradeTypeInput" onChange={handleGradeTypeChange}>
            <option value="Letter Grade">Letter Grade</option>
            <option value="Score">Numerical Score</option>
            <option value="Percent Score">Percent Score</option>
            <option value="Presentation">Presentation</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="gradeDescInput" className="form-label">Grading Description/Cut Off</label>
          <input type="textarea" className="form-control" id="gradeDescInput"
            onChange={handleGradeDescriptionChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="gradeJustInput" className="form-label">Justification for Reimbursement</label>
          <input type="textarea" className="form-control" id="gradeJustInput"
            onChange={handleJustificationChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="PreapprovalInput" className="form-label">Preapproval Comments</label>
          <input type="textarea" className="form-control" id="gradePreAInput"
            onChange={handlePreapprovalDescriptionChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="missedWInput" className="form-label">Missed Work Description</label>
          <input type="textarea" className="form-control" id="MWInput"
            onChange={handleSetMissedWorkDescChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="startFiles" className="form-label">File Upload</label>
          <input type="file" className="form-control" id="FileInput"
            onChange={handleFileChange} />
        </div>
        <input type="submit" className="btn btn-primary" value='Submit' />
      </form>
    </div>
  );
};

export default FileApplicationPage;