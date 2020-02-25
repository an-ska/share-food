import firebase from "firebase/app";
import "firebase/database";

export const config = {
    apiKey: "AIzaSyBbXO1GPr0c8iTFlQ31xCTVbnnhRzYKYg4",
    authDomain: "sharefood-f4865.firebaseapp.com",
    databaseURL: "https://sharefood-f4865.firebaseio.com",
    projectId: "sharefood-f4865",
    storageBucket: "sharefood-f4865.appspot.com",
    messagingSenderId: "881071759875",
    appId: "1:881071759875:web:2d3b267d63157b9092e436",
    measurementId: "G-B3SQ44GXJJ"
};

firebase.initializeApp(config);

export const database = firebase.database();
