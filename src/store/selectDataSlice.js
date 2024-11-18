import { createSlice } from "@reduxjs/toolkit";

export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
    try {
        dispatch(selectDataSlice.actions.selectDataRequest());

        let user = false;
        let mySet = new Set();
        let arr = [], selectedData = [];

        if (group === "status") {
            allTickets.forEach((element) => {
                mySet.add(element.status);
            });
            arr = [...mySet];
            arr.forEach((element, index) => {
                let arr = allTickets.filter((fElement) => element === fElement.status);
                selectedData.push({
                    [index]: {
                        title: element,
                        value: arr,
                    },
                });
            });
        } else if (group === "user") {
            user = true;
            allTickets?.allUser?.forEach((element, index) => {
                arr = allTickets?.allTickets?.filter(
                    (Felement) => element.id === Felement.userId
                );
                selectedData.push({
                    [index]: {
                        title: element.name,
                        value: arr,
                    },
                });
            });
        } else {
            let prior_list = ["No priority", "Urgent", "High", "Medium", "Low"];
            prior_list.forEach((element, index) => {
                arr = allTickets.filter((fElement) => index === fElement.priority);
                selectedData.push({
                    [index]: {
                        title: element,
                        value: arr,
                    },
                });
            });
        }

        if (orderValue === "title") {
            selectedData.forEach((element, index) => {
                element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
            });
        }
        if (orderValue === "priority") {
            selectedData.forEach((element, index) => {
                element[index]?.value?.sort((a, b) => b.priority - a.priority);
            });
        }

        dispatch(
            selectDataSlice.actions.selectDataSuccess({ selectedData, user })
        );
    } catch (error) {
        dispatch(selectDataSlice.actions.selectDataFailure(error.message));
    }
};

const selectDataSlice = createSlice({
    name: "selectData",
    initialState: {
        loading: false,
        selectedData: [],
        user: false,
        message: "",
    },
    reducers: {
        selectDataRequest: (state) => {
            state.loading = true;
            state.selectedData = [];
        },
        selectDataSuccess: (state, action) => {
            state.loading = false;
            state.selectedData = action.payload.selectedData;
            state.user = action.payload.user;
        },
        selectDataFailure: (state, action) => {
            state.loading = false;
            state.selectedData = [];
            state.message = action.payload;
        },
    },
});

export default selectDataSlice.reducer;
