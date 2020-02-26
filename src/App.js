import React from "react";
import "./App.css";
import Users from "./Pages/users/users";
import Form from "./Pages/Form/Form";
import { connect } from "react-redux";
import * as Actions from "./Store/Actions";

class App extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    return (
      <div className="App">
        <Users />
        {/* <Form /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(Actions.getProducts())
  };
};

export default connect(null, mapDispatchToProps)(App);
