import React, { useState } from 'react';
import UserData from '../Components/UserData/UserData';
import AddUserForm from '../Components/UserData/AddUser';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const UserDataPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {superUsertoken} = useSelector((state) => state.login);

  if (!superUsertoken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="user-data-page">
      <UserData onClick={() => setIsPopupOpen(true)} />
      {isPopupOpen && (
        <AddUserForm 
          onClose={() => setIsPopupOpen(false)} 
        />
      )}
    </div>
  );
};

export default UserDataPage;
