import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUser {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: IUser | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUser>) {
        state.user = action.payload
        state.isAuthenticated = true
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
