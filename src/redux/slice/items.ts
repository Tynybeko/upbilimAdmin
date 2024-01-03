import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemsType } from "../../types/model";
import axios from '../../axios'




export const FetchAllItems = createAsyncThunk('subjects/FetchAllItems', async (payload: { offset?: number, search?: string }) => {
    let query = new URLSearchParams(payload as Record<string, string>)
    for (let [key, item] of query.entries()) {
        if (!item) {
            query.delete(key)
        }
    }
    try {
        const { data } = await axios.get(`/subjects?limit=15&${query}`)
        return Promise.resolve(data)
    } catch (e) {
        return Promise.reject(e)
    }
})





export type InitiaItemsType = {
    data: {
        data: ItemsType[],
        limit: number
        offset: number
        totalCount: number
        totalPages: number | null
    } | null,
    loading: boolean,
    error: string
}


const initialState: InitiaItemsType = {
    data: null,
    loading: false,
    error: ''
}



const ItemsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        setSubject(state, { payload }) {
            if (state.data) {
                state.data.data = [payload, ...state.data.data,]
            }
        },
        deleteSubject(state, { payload }) {
            if (state.data) {
                state.data.data = state.data.data.filter(item => item.id != payload.id)
            }
        },
        updateSubject(state, {payload}) {
            if (state.data) {
                state.data.data = state.data.data.map(item => item.id == payload.id ? {...item, ...payload} : item)
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllItems.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllItems.rejected, (state) => {
                state.loading = false
                state.error = 'Не удалось заполучить данные!'
            })
            .addCase(FetchAllItems.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
            })
    },
})



export default ItemsSlice.reducer

export const { setSubject , deleteSubject, updateSubject} = ItemsSlice.actions