import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to fetch all data
export const fetchAllData = () => async (dispatch) => {
  try {
    dispatch(dataSlice.actions.dataRequest());
    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );
    dispatch(dataSlice.actions.dataSuccess(data));
  } catch (error) {
    dispatch(dataSlice.actions.dataFailure());
  }
};

const dataSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    allTickets: [],
    allUser: [],
    group: "status", // Persisted group state
    order: "priority", // Persisted order state
  },
  reducers: {
    dataRequest: (state) => {
      state.loading = true;
    },
    dataSuccess: (state, action) => {
      state.loading = false;
      state.allTickets = action.payload.tickets;
      state.allUser = action.payload.users;
    },
    dataFailure: (state) => {
      state.loading = false;
      state.allTickets = [];
      state.allUser = [];
    },
    updateGroup: (state, action) => {
      state.group = action.payload; // Update group value
    },
    updateOrder: (state, action) => {
      state.order = action.payload; // Update order value
    },
  },
});

export const { updateGroup, updateOrder } = dataSlice.actions;

export default dataSlice.reducer;
