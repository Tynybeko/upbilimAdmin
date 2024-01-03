import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../axios'
import { RegionsType } from "../../types/model";



export const FetchAllRegions = createAsyncThunk('regions/FetchAllRegions', async (payload: { offset?: number, search?: string }) => {
    let query = new URLSearchParams(payload as Record<string, string>)
    for (let [key, item] of query.entries()) {
        if (!item) {
            query.delete(key)
        }
    }
    try {
        const { data } = await axios.get(`/regions?limit=10&${query}`)
        return Promise.resolve(data)
    } catch (e) {
        return Promise.reject(e)
    }
})

export type InitialRegionsType = {
    data: {
        "totalCount": number,
        "offset": number,
        "limit": number,
        "totalPages": number,
        "data": RegionsType[]
    } | null,
    loading: boolean,
    error: string

}


const initialState: InitialRegionsType = {
    data: null,
    loading: false,
    error: ''
}



const RegionSlice = createSlice({
    name: 'regions',
    initialState,
    reducers: {
        setRegion(state, { payload }) {
            if (state.data) {
                state.data.data = [payload, ...state.data.data,]
            }
        },
        deleteRegion(state, { payload }) {
            if (state.data) {
                state.data.data = state.data.data.filter(item => item.id != payload.id)
            }
        },
        updateRegion(state, { payload }) {
            if (state.data) {
                state.data.data = state.data.data.map(item => item.id == payload.id ? { ...item, ...payload } : item)
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllRegions.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllRegions.rejected, (state) => {
                state.loading = false
                state.error = 'Не удалось получить данные!'
            })
            .addCase(FetchAllRegions.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
                state.error = ''
            })
    },
})



export default RegionSlice.reducer

export const {setRegion, deleteRegion, updateRegion} = RegionSlice.actions