import * as actionTypes from "./actionTypes";
import axios from "axios";
import { signUp, signIn} from "../../endpoints";

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (accessToken, expirationDate, userId) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", userId);

    return {
        type: actionTypes.AUTH_SUCCESS,
        accessToken,
        expirationDate,
        userId
    };
};

export const authFailure = error => ({
    type: actionTypes.AUTH_FAILURE,
    error
});

export const authLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationSecondsLeft => dispatch => {
    setTimeout(() => {
        dispatch(authLogout());
    }, expirationSecondsLeft * 1000);
};

export const authCheckState = () => dispatch => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        dispatch(authLogout());
        return;
    }

    const expirationDate = localStorage.getItem("expirationDate");
    const isTokenExpired = new Date(expirationDate) <= new Date();

    if (isTokenExpired) {
        dispatch(authLogout());
        return;
    }

    const userId = localStorage.getItem("userId")

    dispatch(authSuccess(accessToken, expirationDate, userId));
};

export const auth = (email, password, isSignedUp) => dispatch => {
    dispatch(authStart());

    const authData = {
        email,
        password,
        returnSecureToken: true
    };

    const url = isSignedUp ? signUp : signIn;

    axios
        .post(url, authData)
        .then(response => {
            const { idToken: accessToken, expiresIn, localId: userId } = response.data;
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            const expirationSecondsLeft = (expirationDate.getTime() - new Date().getTime()) / 1000;

            dispatch(authSuccess(accessToken, expirationDate, userId));
            dispatch(checkAuthTimeout(expirationSecondsLeft));
        })
        .catch(error => {
            dispatch(authFailure(error));
        });
};
