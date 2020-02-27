import React, { Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../../../Store/Actions";
import "./Products.css"

class Products extends Component {
  render() {
    return (
      <div className="real-products">
        {this.props.allProducts.length === 0 ? <h2>Loading...</h2> : null}
        {this.props.allProducts.map(item => {
          return (
            <div className="product" key={Math.random()}>
              <div>
                <h4>{item.item}</h4>
                <p>{item.price}</p>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="الكمية المطلوبة"
                  name={item.item}
                  defaultValue={item.count}
                  onChange={value => this.props.newChange(item, value)}
                />
                <button onClick={() => this.props.addToList(item)}>
                  اضافة
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    allProducts: state.allProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newChange: (item, value) => dispatch(Actions.newChange(item, value)),
    addToList: item => dispatch(Actions.addToList(item))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
