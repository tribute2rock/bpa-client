import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  multipickIds: []
};

const multipick = createSlice({
  name: 'multipick',
  initialState,
  reducers: {
    addMultipick: (state, action) => {
      const requestId = action.payload;
      if (!state.multipickIds.includes(requestId)) {
        state.multipickIds.push(requestId);
      }
    },
    removeRequestMultipick:(state,action)=>{
      const requestId = action.payload;
      if(state.multipickIds.includes(requestId)){
      state.multipickIds = state.multipickIds.filter(id=>id!==action.payload)
      }
    },
    clearMultipickState: () => initialState,
  },
});

export const { setUserId, addMultipick, removeRequestMultipick, clearMultipickState } = multipick.actions;
export default multipick.reducer;