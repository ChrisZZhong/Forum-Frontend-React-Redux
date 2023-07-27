const initialState = {
    open : false,
    type: '',
    text : '',
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN':
            return {
                open : true,
                type: action.payload.type,
                text : action.payload.text,
            };
        case 'CLOSE':
            return {
                open : false,
                type: '',
                text : '',
            }
        default:
            return state;
    }
}
export default notificationReducer;