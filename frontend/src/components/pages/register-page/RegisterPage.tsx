import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './RegisterPage.css';
import TRMClient from '../../../remote/backend/TRM.client';
import { useHistory } from 'react-router-dom';

const RegisterPage: React.FC<unknown> = (props)=> {

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [supervisor, setSupervisor] = useState<string>();

  const history = useHistory();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleDepartmentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSupervisorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSupervisor(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send an Axios Request

    const response = await TRMClient.post<boolean>('/api/v1/users', {
      username,
      password,
      userClass: 'Employee',
      department,
      email,
      name,
      supervisor,
      yearReimbursement: 0,
    });

    console.log(response.data);
    history.push('/');
  }

  console.log('username: ', username);
  console.log('password: ', password);

  return (
    <div className='container' id='register-form'>
      <form onSubmit={handleFormSubmit} >
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">Username</label>
          <input type="text" className="form-control" id="usernameInput"
            onChange={handleUsernameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input type="password" className="form-control" id="passwordInput"
            onChange={handlePasswordChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="departmentInput" className="form-label">Department</label>
          <input type="text" className="form-control" id="departmentInput"
            onChange={handleDepartmentChange} />
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
        <div className="mb-3">
          <label htmlFor="supervisorInput" className="form-label">Supervisor's Username</label>
          <input type="text" className="form-control" id="supervisorInput"
            onChange={handleSupervisorChange} />
        </div>
        <input type="submit" className="btn btn-primary" value='Submit' />
      </form>
    </div>
  );
};

export default RegisterPage;