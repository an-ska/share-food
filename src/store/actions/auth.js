import * as actionTypes from "./actionTypes"
import axios from 'axios'
import endpoints from '../../endpoints'

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (accessToken, expirationDate) => ({
    type: actionTypes.AUTH_SUCCESS,
    accessToken,
    expirationDate
})

export const authFailure = error => ({
    type: actionTypes.AUTH_FAILURE,
    error,
})

export const authLogout = () => {
    localStorage.removeItem("accessToken");

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authCheckState = () => dispatch => {
    const accessToken = localStorage.getItem("accessToken");

    dispatch(authStart());

    if (!accessToken) {
        dispatch(authLogout());
    } else {
        const expirationDate = localStorage.getItem("expirationDate");
        const isTokenExpired = new Date(expirationDate) <= new Date()

        if (isTokenExpired) {
            dispatch(authLogout());
        } else {
            dispatch(authSuccess(accessToken, expirationDate));
        }
    }
};

export const auth = (email, password) => dispatch => {
    dispatch(authStart())

    const authData = {
        email,
        password,
        returnSecureToken: true
    }

    axios.post(endpoints.signUp, authData)
        .then(response => {
            const { idToken: accessToken, expiresIn } = response.data;
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("expirationDate", expirationDate)

            dispatch(authSuccess(accessToken, expirationDate))
        })
        .catch(error => {
            dispatch(authFailure(error))
        })
}