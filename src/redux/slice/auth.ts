import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'
import { UserType } from "../../types/model";
import { FetchDeleteUser } from "./users";




interface UserLoginField {
    "username": string,
    "password": string
}

export const FetchLogin = createAsyncThunk('auth/FetchLogin', async (payload: UserLoginField) => {
    const { data } = await axios.post('/auth/login', payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return data
})


export const FetchIsAuth = createAsyncThunk('auth/FetchIsAuth', async () => {
    const { data } = await axios.get('/auth/profile')
    return data
})

interface initialType {
    data: UserType | null,
    loading: boolean,
    error: string,
}

let user = JSON.parse(localStorage.getItem('user') ?? '{}')

const initialState: initialType = {
    data: user.access_token ? user : null,
    loading: false,
    error: '',
}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            localStorage.setItem('user', '{}')
            state.data = null
            window.location.replace('/auth')
        },
    },
    extraReducers(builder) {
        builder
            .addCase(FetchLogin.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            .addCase(FetchLogin.rejected, (state) => {
                state.loading = false
                state.data = null
                state.error = 'Неверный логин или пароль!'
                localStorage.setItem('user', '{}')
            })
            .addCase(FetchLogin.fulfilled, (state, { payload }) => {
                state.loading = false

                if (payload.role == 'admin') {
                    localStorage.setItem('user', JSON.stringify(payload))
                    state.data = payload
                    state.error = ''
                } else {
                    localStorage.setItem('user', '{}')
                    state.error = 'Нету доступа!'
                }

            })
          

    },
})


export default userSlice.reducer
export const { logout } = userSlice.actions