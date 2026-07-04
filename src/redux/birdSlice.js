import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getBirdImage } from "../api/wiki";

const initialState = {
    birds: [],
    loading: false,
    error: null,
    hasSearched: false,
};

export const fetchBirds = createAsyncThunk(
    "birds/fetchBirds",
    async ({ lat, lng }, thunkAPI) => {
        try {
            const response = await axios.get(
                "https://api.ebird.org/v2/data/obs/geo/recent",
                {
                    params: {
                        lat,
                        lng,
                        dist: 10,
                        maxResults: 50,
                    },
                    headers: {
                        "X-eBirdApiToken": import.meta.env.VITE_EBIRD_API_KEY,
                    },
                }
            );
            const birds = await Promise.all(
                response.data.map(async (bird) => ({
                    ...bird,
                    image: await getBirdImage(bird.sciName),
                }))
            );
            
            
            return birds;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const birdSlice = createSlice({
    name: "birds",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchBirds.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBirds.fulfilled, (state, action) => {
                state.loading = false;
                state.birds = action.payload;
                state.hasSearched = true; 
            })
            .addCase(fetchBirds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
            
    },
});

export default birdSlice.reducer;