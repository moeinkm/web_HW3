import {MID_AUTHENTICATE} from "./type";

export default function reducer(state = {isAuth: false}, action) {
    switch (action.type) {
        case MID_AUTHENTICATE:
            return Object.assign({}, state, {
                isAuth: action.data
            });

        default:
            return state;
    }
}
