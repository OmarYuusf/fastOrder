import React from "react";
import "./Form.css";

class Form extends React.Component {

  render() {
    return (
      <div className="form">
        <form>
          <div>
            <h5> تسجيل الدخول :</h5>
          </div>
          <input type="email" placeholder="البريد الألكتروني" />
          <input type="password" placeholder="الرقم السري" />
          <button>دخول</button>
        </form>
      </div>
    );
  }
}

export default Form;
