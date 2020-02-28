import React, { Component } from "react";
import "./users.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Products from "./Products/Products";
import Carts from "./Carts/Carts";
import { connect } from "react-redux";
import * as Actions from "../../Store/Actions"

class users extends Component {
    async componentDidMount() {

      this.props.getUserData(await localStorage.getItem("token"))
    }

  backLogin = () => {
    window.location.href = "/"
  }
  render() {
    return (
      <Switch>
        <div className="users">
          <div className="products">
            {!this.props.logged == false ? <Route exact path="/home" component={Products} /> : null }
            {!this.props.logged == false ? null : (<button className="back-login" onClick={this.backLogin}>قم بتسجيل الدخول أولا</button>) }
            {!this.props.logged == false ?  <Route exact path="/home/carts" component={Carts} /> : null}
          </div>
        </div>
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged:state.isLogged
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(Actions.getProducts()),
    getUserData: (token) => dispatch(Actions.getUserData(token))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(users);
