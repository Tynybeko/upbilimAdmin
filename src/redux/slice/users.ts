import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios'
import { UserType } from "../../types/model";


export const FetchAllUser = createAsyncThunk('users/FetchAllUser', async (payload: { offset?: number, search?: string }) => {
    let query = new URLSearchParams(payload as Record<string, string>)
    for (let [key, item] of query.entries()) {
        if (!item) {
            query.delete(key)
        }
    }
    try {
        const { data } = await axios.get(`/users?limit=7&${query}`)
        return Promise.resolve(data)

    } catch (e) {
        return Promise.reject(e)
    }
})


export const FetchDeleteUser = createAsyncThunk('delete/user/FetchDeleteUser', async (payload: number) => {
    try {
        const { data } = await axios.delete(`/users/${payload}`)
        return Promise.resolve(data)
    } catch (e) {
        return Promise.reject(e)
    }
})


export type InitiaUserlType = {
    data: {
        data: UserType[],
        limit: number
        offset: number
        totalCount: number
        totalPages: number | null
    } | null,
    loading: boolean,
    error: string
}



const initialState: InitiaUserlType = {
    data: null,
    loading: false,
    error: ''
}


const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser(state, { payload }) {
            if (state.data) {
                state.data.data = [payload, ...state.data.data]
            }

        },
        deleteUser(state, { payload }) {
            if (state.data) {
                state.data.data = state.data.data.filter((el) => el.id != payload.id)
            }
        },
        updateUser(state, { payload }) {
            if (state.data) {
                state.data.data = state.data.data.map(item => item.id == payload.id ? { ...item, ...payload } : item)
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllUser.pending, (state) => {
                state.error = ''
                state.loading = true
            })
            .addCase(FetchAllUser.rejected, (state, action) => {
                console.log(action);
                state.error = 'Ошибка при получении'
                state.loading = false
            })
            .addCase(FetchAllUser.fulfilled, (state, { payload }) => {
                state.error = ''
                state.loading = false
                state.data = payload

            })
            .addCase(FetchDeleteUser.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            .addCase(FetchDeleteUser.rejected, (state) => {
                state.loading = false
                state.error = 'Не удалось удалить!'
            })
            .addCase(FetchDeleteUser.fulfilled, (state, { payload }) => {
                state.loading = false
                if (state?.data?.data) {
                    state.data.data = state.data?.data.filter((el) => el.id != payload.id)
                }
            })
    },

})


export default UsersSlice.reducer

export const { setUser, deleteUser, updateUser } = UsersSlice.actions