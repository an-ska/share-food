import React from "react";
import "./App.css";
import OfferWall from "./containers/OfferWall/OfferWall";
import AddOffer from "./containers/AddOffer/AddOffer";

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <OfferWall />
                <AddOffer />
            </header>
        </div>
    );
};

export default App;
