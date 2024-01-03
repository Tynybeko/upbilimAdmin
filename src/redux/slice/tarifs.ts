import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios'
import { RatesType } from "../../types/model";




export const FetchAllRates = createAsyncThunk('rates/FetchAllRates', async (payload: { offset?: number, search?: string }) => {
    let query = new URLSearchParams(payload as Record<string, string>)
    for (let [key, item] of query.entries()) {
        if (!item) {
            query.delete(key)
        }
    }
    try {
        const { data } = await axios.get(`/rates?limit=10&${query}`)
        return Promise.resolve(data)
    } catch (e) {
        return Promise.reject(e)
    }
})


export type RatesInitType = {
    data: {
        "totalCount": number,
        "offset": number,
        "limit": number,
        "totalPages": number,
        "data": RatesType[]
    } | null,
    loading: boolean,
    error: string
}



const initialState: RatesInitType = {
    data: null,
    loading: false,
    error: ''
}


const RatesSlice = createSlice({
    name: 'rates',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllRates.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllRates.rejected, (state) => {
                state.loading = false
                state.error = 'Не удалось получить данные!'
            })
            .addCase(FetchAllRates.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
                state.error = ''
            })
    },
})



export default RatesSlice.reducer


