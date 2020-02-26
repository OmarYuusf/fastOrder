import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    productsData: [],
    added: [],
    newToList: []
  };
  async componentDidMount() {
    const response = await axios.get(
      "http://fastorder.pythonanywhere.com/Products/"
    );
    try {
      const { data } = response;
      data.map(counter => {
        counter.count = 1;
      });
      this.setState({
        productsData: data
      });
    } catch (err) {
      console.log(err);
    }
  }

  addToList = (item, count) => {
    const res = this.state.added.filter(data => {
      return data.item === item.item;
    });
    if (res.length > 0) {
      alert("مضاف بالفعل");
    } else {
      this.state.added.push(item);
      this.setState({
        added: this.state.added
      });
    }
    console.log(this.state.added);
  };

  newChange = (item, value) => {
    item.count = value.target.value;
  };

  deleteItem = item => {
    this.setState({
      added: this.state.added.filter(itemAdded => itemAdded != item)
    });
  };

  sendOrder = async () => {
    const response = await axios.post(
      "http://fastorder.pythonanywhere.com/moOrder/",
      {
        item: "12",
        price: 12,
        count: 12
      }
    );
    try {
      console.log("sent");
    } catch (err) {
      console.log(err);
    }
    console.log("done");
  };

  searchBox = e => {
    const { value } = e.target;
    const lowerCasedValue = value.toLowerCase()
    console.log(this.state.productsData);
  };
  render() {
    return (
      <div className="App">
        <div className="products">
          <div>
            <input
              type="text"
              placeholder="البحث عن المنتجات"
              onChange={e => this.searchBox(e)}
            />
          </div>
          <div className="real-products">
            {this.state.productsData.length === 0 ? <h2>Loading...</h2> : null}
            {this.state.productsData.map(item => {
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
                      onChange={value => this.newChange(item, value)}
                    />
                    <button onClick={() => this.addToList(item)}>اضافة</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="products-added">
          <table>
            <thead>
              <tr>
                <th>الاسم</th>
                <th>السعر</th>
                <th>العدد</th>
                <th>السعر الكلي</th>
                <th>التعديل</th>
              </tr>
            </thead>
            <tbody>
              {this.state.added.map(newData => {
                return (
                  <tr key={Math.random()}>
                    <td>{newData.item}</td>
                    <td>{newData.price}</td>
                    <td>{newData.count}</td>
                    <td>{newData.price * newData.count}</td>
                    <td>
                      <button onClick={() => this.deleteItem(newData)}>
                        مسح
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="send-order" onClick={() => this.sendOrder()}>
            إرسال
          </button>
        </div>
      </div>
    );
  }
}

export default App;
