
const initialState = {
    username: '',
    total_score: null,
    userName: 'testing go'

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
            console.log(action.payload, 'payload logout')
            return {...state, userName: action.payload}
        default:
        return state;
    }
}