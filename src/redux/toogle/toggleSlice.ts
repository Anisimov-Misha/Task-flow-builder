import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
    activeTaskId: null as string | null,
};

export const toggleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        setTrue: (state, action) => {
            state.value = true;
            state.activeTaskId = action.payload;
        },
        setFalse: (state) => {
            state.value = false;
            state.activeTaskId = null;
        },
    },
});

export const { setTrue, setFalse } = toggleSlice.actions;
export default toggleSlice.reducer;
