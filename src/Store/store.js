import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../Features/SuperUserLogin/login';
import employeeReducer from '../Features/employeeData/employee'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    employee:employeeReducer
  },
});
