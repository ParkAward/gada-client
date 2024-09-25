import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationProps {
    isClickedLocation: boolean;
    imageUrl: string;
    locationName: string;
}

const initialState: LocationProps = {
    isClickedLocation: false,
    imageUrl: '',
    locationName: '',
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        changeLocationState(state, action: PayloadAction<LocationProps>) {
            state.isClickedLocation = action.payload.isClickedLocation;
            state.imageUrl = action.payload.imageUrl;
            state.locationName = action.payload.locationName;
        }
    },
})

export const {
    changeLocationState,
} = locationSlice.actions;

export default locationSlice.reducer;