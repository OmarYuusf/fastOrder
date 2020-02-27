import React from "react";
import {connect} from "react-redux"
import "./Form.css";
import * as Actions from "../../Store/Actions"

class Form extends React.Component {
  state = {
    username:"",
    password:""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div className="form">
        <div>
          <div>
            <h5> تسجيل الدخول :</h5>
          </div>
          <input type="email" placeholder="البريد الألكتروني" name="username"
           value={this.state.username} onChange={(e) => this.handleChange(e)}/>
          <input type="password" placeholder="الرقم السري" name="password" 
          value={this.state.password} onChange={(e) => this.handleChange(e)}/>
          <button onClick={() => this.props.login(this.state.username,this.state.password)}>دخول</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    login: (user,pass) => dispatch(Actions.login(user,pass))
  }
}

export default connect(null,mapDispatchToProps)(Form);
