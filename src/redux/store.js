import { configureStore } from "@reduxjs/toolkit";

import mapReducer from "./mapSlice";
import birdReducer from "./birdSlice";

export const store = configureStore({
    reducer: {
        map: mapReducer,
        birds: birdReducer,
    },
});