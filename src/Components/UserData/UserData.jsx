import React, { useState, useEffect } from 'react';
import '../UserData/UserData.css';
import img from '../../Assests/user-6380868_1280.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { showEmployee, editEmployee, removeEmployee } from '../../Features/employeeData/employee';
import { getSuperUser } from '../../Features/SuperUserLogin/login';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import SuperUserDetails from './SuperUserDetails';




const UserData = ({ onClick }) => {
  const [editedUser, setEditedUser] = useState({});
  const [editUserId, setEditUserId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false); 
  const dispatch = useDispatch();
  const { loading, employees, isEditEmployee, isDeleteEmployee } = useSelector((state) => state.employee || {});
  const { superUser } = useSelector((state) => state.login || {});

  useEffect(() => {
    dispatch(getSuperUser());
  }, [dispatch]);

  useEffect(() => {
    if (superUser) {
        dispatch(showEmployee(superUser._id));
      }

      if (isEditEmployee) {
        dispatch(showEmployee(superUser._id));
      }
      if (isDeleteEmployee) {
        dispatch(showEmployee(superUser._id));
      }

  }, [dispatch, superUser, isEditEmployee,isDeleteEmployee ]);

  const handleEdit = (userId) => {
    const employee = employees.find((u) => u._id === userId);
    if (employee) {
      setEditedUser({ ...employee });
      setEditUserId(userId);
    } else {
      console.error("Employee not found!");
    }
  };

  const handleSave = () => {
    dispatch(editEmployee({ userID: editUserId, userData: editedUser }));
    setEditUserId(null);
    setEditedUser({});
  };

  const handleCancel = () => {
    setEditUserId(null);
    setEditedUser({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const confirmDelete = (userId) => {
    setShowDeletePopup(true);
    setUserToDelete(userId);
  };

  const handleDelete = () => {
    if (userToDelete) {
      dispatch(removeEmployee(userToDelete));
      setShowDeletePopup(false);
      setUserToDelete(null);
    }
  };

  const handleClosePopup = () => {
    setShowDeletePopup(false);
    setUserToDelete(null);
    console.log('close')
  };

  const handleCloseUserPopup = () => {
    setShowProfilePopup(false)
  };

  if (!superUser) {
    return (
      <Stack spacing={2} sx={{ transform: 'scaleX(-1)', direction: 'ltl', width: '1000px', position: 'absolute', right: '40px', top: '40px' }}>
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '1400px' }} />
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton variant="rectangular" width={800} height={100} />
        <Skeleton variant="rounded" width={800} height={80} />
      </Stack>
    );
  }

  return (
    <>
      <div className="user-data-container">
        <nav>
          <button onClick={onClick}>Add Employee</button>
          <div>
            <img src={img} alt="user" title="Profile Details" onClick={() => setShowProfilePopup(true)} />
            <h4>
              {superUser?.position || "Position not available"}{" "}
              <span>{superUser?.name || "Name not available"}</span>
            </h4>
          </div>
        </nav>

        <h2>Employee Data</h2>

        {loading ? (
          <Box sx={{ width: 1000 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        ) : !(Array.isArray(employees) && employees.length > 0) ? (
          <p>No data available.</p>
        ) : (
          <table className="user-data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Email</th>
                <th>Number</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id || index}>
                  {editUserId === employee._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={editedUser.name}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="position"
                          value={editedUser.position}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={editedUser.email}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="number"
                          value={editedUser.number}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="gender"
                          value={editedUser.gender}
                          onChange={handleChange}
                        />
                      </td>
                      <td className="actions">
                        <button className="savebtn" onClick={handleSave}>
                          Save
                        </button>
                        <button className="cancel-delete" onClick={handleCancel}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{employee.name}</td>
                      <td>{employee.position}</td>
                      <td>{employee.email}</td>
                      <td>{employee.number}</td>
                      <td>{employee.gender}</td>
                      <td className="actions">
                        <button className="editbtn" onClick={() => handleEdit(employee._id)}>
                          Edit
                        </button>
                        <button className="deletbtn" onClick={() => confirmDelete(employee._id)}>
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showDeletePopup && (
          <div className="delete-popup">
            <div className="popup-content">
              <h3>Are you sure you want to delete this employee?</h3>
              <button className="confirm-delete" onClick={handleDelete}>Yes</button>
              <button className="cancel-delete" onClick={handleClosePopup}>No</button>
            </div>
          </div>
        )}
      </div>

      {showProfilePopup && (
        <div className="SuperUserDetails-profile-popup">
          <SuperUserDetails onClose={handleCloseUserPopup}/>
          </div>
      )}
    </>
  );
};


export default UserData;
