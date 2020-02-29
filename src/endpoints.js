import { config } from "./firebase";

export default {
    signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${config.apiKey}`,
    signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${config.apiKey}`
};
