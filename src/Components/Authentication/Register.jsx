import React, { useState, useEffect } from 'react';
import './Login.css';
import hero from '../../Assests/hero.png';
import { useDispatch, useSelector } from 'react-redux';
import { createSuperUser,resetState } from '../../Features/SuperUserLogin/login';
import { toast } from 'react-toastify';


const Register = ({ openLogin, closeModal }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [position, setPosition] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newError, setNewError] = useState('');

  const dispatch = useDispatch();
  const { isRegister, error, loading } = useSelector((state) => state.login || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !gender ||
      !number ||
      !email ||
      !organization ||
      !position ||
      !password
     
    ) {
      setNewError('Please ensure all fields are filled');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  setNewError('Please provide a valid email address.');
  return;
}

   
     // Validate phone number length
  if (number.length !== 10 || isNaN(number)) {
    setNewError('Phone number must be exactly 10 digits.');
    return;
  }
  if( password !== confirmPassword){
    setNewError('Passwords do not match ');
    return;
  }
    setNewError('');
    dispatch(
      createSuperUser({
        name,
        number,
        email,
        organization,
        gender,
        position,
        password,
      })
    );
  };

  useEffect(() => {
    if (isRegister) {
      toast.success("User registered successfully!");
      dispatch(resetState());
      closeModal();
      openLogin();
    }
    if (error) {
      toast.error(error);
    }
  }, [isRegister, error, dispatch, closeModal, openLogin]);

  const handlePopups = ()=>{
    closeModal();
      openLogin();
  }

  

  return (
    <div className="register-container">
      <div className="register-content">
        <div>
          <img src={hero} alt="Hero" />
        </div>
        <h1>Register</h1>
        {newError && <p className="error-message">{newError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-adj">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Organization Name"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>
            <div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Position
                </option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Team Lead">Team Lead</option>
              </select>
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit"disabled={loading}>{loading ? 'Wait...' : 'Register'}
          </button>

          <div className="register-link">
            <p>Already have an account?<span onClick={handlePopups}>Login</span></p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;
