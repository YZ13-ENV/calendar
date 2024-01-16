import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";




type InitialState = {
    date: DateTime
}

const initialState: InitialState = {
    date: DateTime.now().setLocale('ru')
}

const dateController = createSlice({
    name: 'date-controller',
    initialState,
    reducers: {
        updateDate(state, { payload, type }: { payload: DateTime, type: string }) {
            state.date = payload
        }
    }
})

export const { updateDate } = dateController.actions
export default dateController.reducer