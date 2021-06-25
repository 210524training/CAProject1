import React from 'react';
import './HomePage.css';
import { useAppSelector } from '../../../hooks';
import { selectUser, UserState } from '../../../slices/user.slice';
import { NavLink } from 'react-router-dom';

type Props = {
}

const HomePage: React.FC<Props> = (props) => {
  const user = useAppSelector<UserState>(selectUser);

  return (
    <>
      <div className="banner">
        <div>
          <h1 className='whiteText'>Welcome to TRM!</h1><br/>
        </div>
        <br/>
        <h2 className='whiteText'>Please sign in, or register below! </h2>
        <br/>
        <NavLink className="nav-link" to="/register">Register</NavLink>
      </div>
      <div className="footer">
      </div>
    </>
  );
};

export default HomePage;
