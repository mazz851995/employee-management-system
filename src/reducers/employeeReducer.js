
const initialState = []

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_EMPLOYEES":
            const datas = JSON.parse(localStorage.getItem("employees"))
            if (datas) {
                return state = JSON.parse(localStorage.getItem("employees"))
            } else {
                return state;
            }
        case "ADD_EMPLOYEE":
            state = [...state, action.payload]
            localStorage.setItem("employees", JSON.stringify(state));
            return state;

        case "UPDATE_EMPLOYEE":
            const existData = [...state];
            const data = action.payload
            const index = state.findIndex(state => state.id == data.id)
            existData.splice(index, 1, data);
            state = existData;
            localStorage.setItem("employees", JSON.stringify(state));
            return state;

        case "DELETE_EMPLOYEE":
            const lists = state.filter(ele => ele.id != action.payload)
            state = lists
            localStorage.setItem("employees", JSON.stringify(state));
            return state;

        default:
            return state;
    }
}

export default employeeReducer