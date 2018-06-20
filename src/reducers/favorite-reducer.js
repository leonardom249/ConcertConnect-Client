import {
    FAVORITE_CONCERT_SUCCESS, CLEAR_FAVORITES, ADD_FAVORITE_SUCCESS
} from '../actions/favorite-actions';

const initialState = {
    error:null,
    favorites: [],
};

export default function reducer(state=initialState, action) {
    if (action.type === FAVORITE_CONCERT_SUCCESS) {
        return Object.assign({}, state, {
            error: null,
            favorites: action.newFavorite
        });
    }
    else if (action.type === CLEAR_FAVORITES) {
        return Object.assign({}, state, {
            error: null,
            favorites: []
        });
    }
    else if (action.type === ADD_FAVORITE_SUCCESS) {
        return Object.assign({}, state, {
            error: null,
            favorites: [...state.favorites, action.newFavorite]
        });
    }
    console.log('new state', state)
    return state;
}