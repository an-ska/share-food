import React from "react";
import { Switch, Route, Redirect} from "react-router-dom";
import "./App.css";
import OfferWall from "./containers/OfferWall/OfferWall";
import AddOffer from "./containers/AddOffer/AddOffer";

const App = () => {
    let routes = (
        <Switch>
            <Route path="/offers" component={OfferWall} />
            <Route path="/add-offer" component={AddOffer} />
            <Redirect to="/offers" />
        </Switch>
    );

    return (
        <div className="App">{routes}</div>
    );
};

export default App;
