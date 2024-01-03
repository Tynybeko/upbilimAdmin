import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CitiesType, ItemsType } from "../../types/model";
import axios from '../../axios'




export const FetchAllCities = createAsyncThunk('subjects/FetchAllCities', async (payload: { offset?: number, search?: string }) => {
    let query = new URLSearchParams(payload as Record<string, string>)
    for (let [key, item] of query.entries()) {
        if (!item) {
            query.delete(key)
        }
    }
    try {
        const { data } = await axios.get(`/districts?limit=10&${query}`)
        return Promise.resolve(data)
    } catch (e) {
        return Promise.reject(e)
    }
})





export type InitiaCitiesType = {
    data: {
        data: CitiesType[],
        limit: number
        offset: number
        totalCount: number
        totalPages: number | null
    } | null,
    loading: boolean,
    error: string
}


const initialState: InitiaCitiesType = {
    data: null,
    loading: false,
    error: ''
}



const CitiesSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        setCity(state, { payload }) {
            if (state.data) {
                state.data.data = [payload, ...state.data.data,]
            }
        },
        deleteCity(state, { payload }) {
            if (state.data) {
                state.data.data = state.data.data.filter(item => item.id != payload.id)
            }
        },
        updateCity(state, { payload }) {
            if (state.data) {
                state.data.data = state.data.data.map(item => item.id == payload.id ? { ...item, ...payload } : item)
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllCities.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllCities.rejected, (state) => {
                state.loading = false
                state.error = 'Не удалось заполучить данные!'
            })
            .addCase(FetchAllCities.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
            })
    },
})



export default CitiesSlice.reducer

export const { setCity, deleteCity, updateCity } = CitiesSlice.actions