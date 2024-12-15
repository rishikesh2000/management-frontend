import React from 'react';
import '../UserData/SuperUserDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import userIMG from '../../Assests/user-6380868_1280.jpg'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { logout } from '../../Features/SuperUserLogin/login'




const SuperUserDetails = ({onClose}) => {

const { superUser } = useSelector((state) => state.login || {});

const navigate = useNavigate();
const dispatch = useDispatch()


  const handleLogout = () => {
    dispatch(logout());
      localStorage.removeItem('authToken');
      localStorage.clear();
      toast.success('Logged out successfully');
      navigate('/');
  };

  return (
    <div className="super-user-details">
      <div className="card">
        <div className="card-header">
          <h2>Profile Details</h2>
          {/* Close Button */}
          <button onClick={onClose} className="Pclose-btn" title='close'>X</button>
        </div>
        <div className="card-body">
          <div className="user-profile">
            <img src={userIMG} alt="Profile" className="profile-img" />
            <div className="user-info">
              <div className="info-item">
                <strong>Name:</strong> {superUser.name}
              </div>
              <div className="info-item">
                <strong>Phone Number:</strong> {superUser.number}
              </div>
              <div className="info-item">
                <strong>Email:</strong> {superUser.email}
              </div>
              <div className="info-item">
                <strong>Organization:</strong> {superUser.organization}
              </div>
              <div className="info-item">
                <strong>Gender:</strong> {superUser.gender}
              </div>
              <div className="info-item">
                <strong>Position:</strong> {superUser.position}
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">Log Out</button>
          {/* <button onClick={handleClosePopup} className="close-btn">Close</button> */}

        </div>
      </div>
    </div>
  );
};

export default SuperUserDetails;
