import * as actionTypes from "../actions/actionTypes";

const initialState = {
    accessToken: null,
    expirationDate: null,
    error: null,
    loading: false
};

const authStart = (state = initialState) => {
    return {
        ...state,
        error: null,
        loading: true
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        accessToken: action.accessToken,
        expirationDate: action.expirationDate,
        error: null,
        loading: false
    };
};

const authFailure = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.AUTH_START:
        return authStart(state);
    case actionTypes.AUTH_SUCCESS:
        return authSuccess(state, action);
    case actionTypes.AUTH_FAILURE:
        return authFailure(state, action);
    default:
        return state;
    }
};

export default reducer