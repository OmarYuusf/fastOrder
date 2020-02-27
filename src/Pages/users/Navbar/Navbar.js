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
        return (
          <div className="navbar">
            <div>
              <h4>اسم المحل</h4>
            </div>
            <div>
              <input
                type="text"
                placeholder="البحث عن المنتجات"
                onChange={e => this.searchBox(e)}
              />
            </div>
            <div>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} />
              </Link>

              <Link to="/carts">
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
    carts: state.carts
  };
};

const mapDispatchToProps = dispatch => {
  return{
    logout: () => dispatch(Actions.logout())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);