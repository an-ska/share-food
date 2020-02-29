import React, { useEffect } from "react";
import { Switch, Route, Redirect} from "react-router-dom";
import "./App.css";
import Auth from "./containers/Auth/Auth";
import OfferWall from "./containers/OfferWall/OfferWall";
import AddOffer from "./containers/AddOffer/AddOffer";
import { authCheckState } from "./store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
    const dispatch = useDispatch();
    const tryAutoLogin = () => dispatch(authCheckState());
    const isAuthenticated = useSelector(state => state.auth.accessToken !== null);

    useEffect(() => {
        tryAutoLogin();
    }, []);

    let routes = (
        <Switch>
            <Route path="/auth" component={Auth} />
            <Redirect to="/auth" />
        </Switch>
    );

    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/offers" component={OfferWall} />
                <Route path="/add-offer" component={AddOffer} />
                <Redirect to="/auth" />
            </Switch>
        );
    }

    return (
        <div className="App">{routes}</div>
    );
};

export default App;
