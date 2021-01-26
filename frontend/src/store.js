import { createStore } from 'redux'


export const MID_AUTHENTICATE = 'MID_AUTHENTICATE';
export const SAVE_POSTS = 'SAVE_POSTS';

const initialState = {
    sidebarShow: 'responsive',
    isAuth: false,
    posts: []
}

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return {...state, ...rest }

        case MID_AUTHENTICATE:
            return {...state, ...rest };

        case SAVE_POSTS:
            return {...state, ...rest };

        default:
            return state
    }
}

const store = createStore(changeState);
export default store