import React, { Component } from 'react'
import { connect } from "react-redux";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import * as Actions from "../../../Store/Actions"

class Navbar extends Component {
    render() {
      // {this.props.data.username}
        return (
          <div className="navbar">
            <div>
              <h4>{this.props.data.username}</h4>
            </div>
            <div>
            </div>
            <div>
              <Link to="/home">
                <FontAwesomeIcon icon={faHome} />
              </Link>

              <Link to="/home/carts">
                <FontAwesomeIcon icon={faShoppingCart} />
                <span>{this.props.carts.length}</span>
              </Link>

              <div onClick={() => this.props.logout()}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    carts: state.carts,
    data:state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(Actions.logout())
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);