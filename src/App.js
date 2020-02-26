import React from "react";
import { Switch, Route, Redirect} from "react-router-dom";
import "./App.css";
import Auth from "./containers/Auth/Auth";
import OfferWall from "./containers/OfferWall/OfferWall";
import AddOffer from "./containers/AddOffer/AddOffer";

const App = () => {
    let routes = (
        <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/offers" component={OfferWall} />
            <Route path="/add-offer" component={AddOffer} />
            <Redirect to="/auth" />
        </Switch>
    );

    return (
        <div className="App">{routes}</div>
    );
};

export default App;
