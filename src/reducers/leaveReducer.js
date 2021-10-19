const initialState = []

const leaveReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LEAVES":
            const datas = JSON.parse(localStorage.getItem("leaves"))
            if (datas) {
                return state = JSON.parse(localStorage.getItem("leaves"))
            } else {
                return state;
            }
        case "ADD_LEAVE":
            state = [...state, action.payload]
            localStorage.setItem("leaves", JSON.stringify(state));
            return state

        case "DELETE_LEAVE":
            const leaveList = state.filter(ele => ele.id != action.payload)
            state = leaveList
            localStorage.setItem("leaves", JSON.stringify(state));
            return state;

        case "DELETE_LEAVE_BY_EMPLOYEE":
            const leaves = state.filter(ele => ele.empName != action.payload)
            state = leaves
            localStorage.setItem("leaves", JSON.stringify(state));
            return state;
        default:
            return state;
    }
}

export default leaveReducer