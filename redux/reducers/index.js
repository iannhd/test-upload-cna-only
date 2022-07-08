
const initialState = {
    username: '',
    total_score: null,

}

export default function reducers(state = initialState, action) {
    console.log('==> masuk reducers');
    switch (action.type) {
        case 'SET_USERNAME':
            console.log(action.payload, '==> payload USERNAME');
            return { ...state, username:action.payload}
        case 'SET_SCORE':
            console.log(action.payload, '==> payload SCORE');
            return { ...state, total_score:action.payload}
        case 'USER_LOGOUT':
            console.log(action.payload, '====> Payload logout')
            return {...state, logout:action.payload}
        default:
        return state;
    }
}