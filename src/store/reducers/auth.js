import * as actionTypes from "../actions/actionTypes";

const initialState = {
    accessToken: localStorage.getItem("accessToken") || null,
    expirationDate: null,
    error: null,
    loading: false
};

const authStart = state => ({
    ...state,
    error: null,
    loading: true
});

const authSuccess = (state, action) => ({
    ...state,
    accessToken: action.accessToken,
    expirationDate: action.expirationDate,
    error: null,
    loading: false
});

const authFailure = (state, action) => ({
    ...state,
    error: action.error,
    loading: false
});

const authLogout = state => ({
    ...state,
    accessToken: null,
    expirationDate: null,
    loading: false
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.AUTH_START:
        return authStart(state);
    case actionTypes.AUTH_SUCCESS:
        return authSuccess(state, action);
    case actionTypes.AUTH_FAILURE:
        return authFailure(state, action);
    case actionTypes.AUTH_LOGOUT:
        return authLogout(state);
    default:
        return state;
    }
};

export default reducer;
