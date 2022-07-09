
const initialState = {
    username: '',
    total_score: null,
    game_name:''

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
        case 'SET_GAME_NAME':
            console.log(action.payload, '==> payload SCORE');
            return { ...state, game_name:action.payload}
    
        case 'USER_LOGOUT':
        console.log(action.payload, '====> Payload logout')
        return {...state, logout:action.payload}
        default:
        return state;
    }
}