import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentEdit: null,
}

const userSlice = createSlice({
    name: "descriptionGame",
    initialState,
    reducers: {
        editSuccess: (state, action) => {
            state.currentEdit = action.payload
        },
    },
})

export const { editSuccess } = userSlice.actions

export default userSlice.reducer
