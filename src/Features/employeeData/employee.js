import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URl from "../../Config"

// Add employee action
export const addEmployee = createAsyncThunk(
  "employeeData/addEmployee",
  async (empData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_URl}/addUser`,
        empData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data.message || "An unexpected error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

// Show employee list action
export const showEmployee = createAsyncThunk(
  "employeeData/showEmployee",
  async (sUserId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${API_URl}/getUsers/${sUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editEmployee = createAsyncThunk(
  "employeeData/editEmployee",
  async ({ userID, userData }, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.put(
         `${API_URl}/updateUsers/${userID}`, userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }  
      );
      
      console.log("editEmployee:", response.data);

      return response.data; 
    } catch (error) {
      console.error("Error editing employee:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeEmployee = createAsyncThunk(
  "employeeData/removeEmployee",
  async (userID, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.delete(
        `${API_URl}/removeUser/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("removeEmployee:", response.data);

      return response.data; 
    } catch (error) {
      console.error("Error removing employee:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const RESET_REGISTER_STATE = 'employeeData/RESET_REGISTER_STATE';

export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_REGISTER_STATE });
};


const employeeSlice = createSlice({
  name: "employeeData",
  initialState: {
    employees: [],
    loading: false,
    error: null,
    isAddEmployee: false, 
    isShowEmployee: false, 
    isEditEmployee: false, 
    isDeleteEmployee: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAddEmployee = false;  // Initially false, set when action is pending
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.isAddEmployee = true;  // Set to true when employee is added
        if (action.payload) {
          state.employees.push(action.payload);
        }
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAddEmployee = false;  // Set back to false if action fails
      })
      
      .addCase(showEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isShowEmployee = false;  // Initially false, set when action is pending
      })
      .addCase(showEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.employees = action.payload;
        state.isShowEmployee = true;  // Set to true when employee list is fetched
        console.log("Employee list fetched successfully:", action.payload);
      })
      .addCase(showEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isShowEmployee = false;  // Set back to false if action fails
        console.error("Failed to fetch employees:", action.payload);
      })
      
      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isEditEmployee = false;  // Initially false, set when action is pending
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isEditEmployee = true;  // Set to true when employee is updated
        state.employees = state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        );
        console.log("Employee list updated successfully:", action.payload);
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isEditEmployee = false;  // Set back to false if action fails
        console.error("Failed to update employee:", action.payload);
      })
      
      .addCase(removeEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isDeleteEmployee = false;  // Initially false, set when action is pending
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isDeleteEmployee = true;  // Set to true when employee is removed
        state.employees = state.employees.filter((employee) => employee.id !== action.payload.id);
      })
      .addCase(removeEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isDeleteEmployee = false;  // Set back to false if action fails
        console.error("Failed to remove employee:", action.payload);
      })

      .addCase(RESET_REGISTER_STATE, (state) => {
        state.isAddEmployee = false;
      });
  },
});

export default employeeSlice.reducer;
