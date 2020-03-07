import { config } from "./firebase";

export const signUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.apiKey}`;
export const signIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.apiKey}`;

export const database = `${config.databaseURL}`;
