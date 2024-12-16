import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields based on your application's requirements
}

interface UserState {
  userData: User | null; // Use a more specific type for user data
}

const initialState: UserState = {
  userData: null, // Set to `null` initially during SSR.
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.userData = action.payload;
    },
    clearUser(state) {
      state.userData = null; // Clear user data on logout
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
