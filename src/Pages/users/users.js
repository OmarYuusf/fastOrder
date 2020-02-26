import React, { Component } from "react";
import "./users.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Products from "./Products/Products";
import Carts from "./Carts/Carts";

class users extends Component {
  render() {
    return (
      <Switch>
        <div className="users">
          <div className="products">
            <Navbar />
            <Route exact path="/" component={Products} />
            <Route exact path="/carts" component={Carts} />
          </div>
        </div>
      </Switch>
    );
  }
}

export default users;
