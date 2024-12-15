import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URl from "../../Config"


// Async thunk for creating a super user
export const createSuperUser = createAsyncThunk(
  "authentication/createSuperUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URl}/superUserReguster`,
        userData
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || "An unexpected error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

  export const loginSuperUser = createAsyncThunk(
    "authentication/loginSuperUser",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${API_URl}/superUserLogin`,
          userData
        );
        console.log("API Response:", response);
        return response.data;
      } catch (error) {
        console.error("API Error Details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
  
        // Return a detailed error message
        const errorMessage =
        error.response?.data || error.response || "An unexpected error occurred.";
      return rejectWithValue(errorMessage);
      }
    }
  );
  


  export const getSuperUser = createAsyncThunk(
    "authentication/getSuperUser",
    async (_, { rejectWithValue }) => {

      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get(
          `${API_URl}/getSuperUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response);
        return response.data;
      } catch (error) {
        console.error("API Error Details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
        return rejectWithValue(error);
      }
    }
  );
  


  export const RESET_REGISTER_STATE = 'authentication/RESET_REGISTER_STATE';

  export const resetState = () => (dispatch) => {
    dispatch({ type: RESET_REGISTER_STATE });
  };
  

// Redux slice
export const loginSlice = createSlice({
  name: "authentication",
  initialState: {
    superUsertoken: null,
    superUser: null,
    loading: false,
    error: null,
    isLoggedIn: false,
    isRegister: false,
  },

  reducers:{
    logout: (state) => {
      state.superUsertoken = null;
      state.superUser = null;
      state.isLoggedIn= false;

    }
  },

  
  extraReducers: (builder) => {
    builder
    .addCase(createSuperUser.pending, (state) => {
      state.loading = true;
      state.isRegister = false;
      state.error = null;
    })
    .addCase(createSuperUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isRegister = true;
    })
    .addCase(createSuperUser.rejected, (state, action) => {
      state.loading = false;
      state.isRegister = false;
      state.error = action.payload || "Failed to register user.";
    })
    
    .addCase(RESET_REGISTER_STATE, (state) => {
      state.isRegister = false;
    })

      .addCase(loginSuperUser.pending, (state) => {
        state.isLoggedIn = false;
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(loginSuperUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.superUsertoken = action.payload.token;
      })
      .addCase(loginSuperUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload || "Failed to log in.";
      })
      

      .addCase(getSuperUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isRegister = false;

      })
      .addCase(getSuperUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegister = true;
        state.superUser = action.payload.user;
        console.log('user fetched successful');

      })
      
      .addCase(getSuperUser.rejected, (state, action) => {
        state.loading = false;
        state.isRegister = false;
        state.error = action.payload;
      });
  },
});
export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
