import React, { useState, useEffect } from 'react';
import '../UserData/AddUser.css';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, showEmployee } from '../../Features/employeeData/employee';
import {resetState} from '../../Features/employeeData/employee'
import { toast } from 'react-toastify';

const AddUserForm = ({ onClose }) => {
  const { superUser } = useSelector((state) => state.login || {});
  const { loading, error, isAddEmployee } = useSelector((state) => state.employee || {});

  const [formData, setFormData] = useState({
    suserID: superUser._id,
    name: '',
    position: '',
    gender: '',
    email: '',
    number: '',
    password: '123',
  });

  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();  

  useEffect(() => {
    if (isAddEmployee) {
      toast.success('Employee Added!');
      dispatch(resetState());
      onClose(); 
      dispatch(showEmployee(superUser._id));
    }
  
    if (error) {
      setFormError(error.data || error);

      
    }
  }, [isAddEmployee, error, onClose, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.position || !formData.gender || !formData.email || !formData.number || !formData.password) {
      setFormError('All fields are required!');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setFormError('Please provide a valid email address.');
      return false;
    }

    if (formData.number.length !== 10) {
      setFormError('Phone number must be exactly 10 digits.');
      return false;
    }

    setFormError(''); // Reset error if all validations pass
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addEmployee(formData));
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}>
          {formError && <p className="error-message">{formError}</p>}
          
          {/* This error message is displayed from API response */}
          {error && <p className="error-message">{error}</p>}

          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Position:
            <input type="text" name="position" value={formData.position} onChange={handleChange} required />
          </label>
          <label>
            Gender:
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Number:
            <input type="tel" name="number" value={formData.number} onChange={handleChange} required />
          </label>
          {/* <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label> */}
          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
