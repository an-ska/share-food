import React, { useEffect, useCallback } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import Auth from "./containers/Auth/Auth";
import OfferWall from "./containers/OfferWall/OfferWall";
import AddOffer from "./containers/AddOffer/AddOffer";
import Header from "./components/Header/Header";
import Profile from "./containers/Profile/Profile";
import { authCheckState } from "./store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPowerOff, faUserCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faPowerOff, faUserCircle);

const App = () => {
    const dispatch = useDispatch();
    const tryAutoLogin = useCallback(() => dispatch(authCheckState()), [dispatch]);

    useEffect(() => {
        tryAutoLogin();
    }, [tryAutoLogin]);

    const isAuthenticated = useSelector(state => state.auth.accessToken !== null);

    let routes;

    if (!isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Redirect to="/auth" />
            </Switch>
        )
    }

    if (isAuthenticated) {
        routes = (
            <>
                <Header />
                <Switch>
                    <Route path="/add-offer" component={AddOffer} />
                    <Route path="/offers" component={OfferWall} />
                    <Route path="/profile" component={Profile} />
                    <Redirect to="/offers" />
                </Switch>
            </>
        );
    }

    return (
        <div className="App">{routes}</div>
    );
};

export default App;
