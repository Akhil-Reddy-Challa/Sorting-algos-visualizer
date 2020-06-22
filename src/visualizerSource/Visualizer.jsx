import React, { Component } from "react";

const getColor = {
  "background-color": "#1affff",
};
class Visualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      NUMBER_OF_ARRAY_BARS: 4,
    };
  }

  generateValuesInArray = (NUMBER_OF_ARRAY_BARS) => {
    const min = 1;
    const max = 275;
    const list = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++)
      list.push(Math.trunc(min + Math.random() * (max - min)));
    this.setState({ list });
  };
  generateNewValues = () => {
    //Now delete all elements in array, so that we can use above method(generateValuesInArray)
    this.state.list.length = 0; //This will empty the array( Reference: https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript)
    //console.log(this.state.NUMBER_OF_ARRAY_BARS);

    this.generateValuesInArray(this.state.NUMBER_OF_ARRAY_BARS);
    //Now change button text:
  };
  reSizeArray = (event) => {
    //console.log("User Selected: ", event.target.value);
    //User select a value
    //Now update the array size
    this.state.NUMBER_OF_ARRAY_BARS = event.target.value;
    this.generateNewValues();
  };
  sortValues = () => {
    let array = this.state.list;
    //console.log("Before sort", array);

    //console.log("Array size is: ", array.length);
    //Sort using JS in-built method
    array.sort((a, b) => a - b);
    //console.log("After sort", array);
    this.setState({ array });
  };
  doTheChange(i) {}
  traverseArray = () => {
    const leng_of_array = this.state.list.length;
    let original_array = this.state.list;
    for (let i = 0; i < leng_of_array; i++) {
      setTimeout(() => {
        console.log("Element", i);
        document.getElementById(i).setAttribute("class", "redBar");
      }, i * 400);
    }
    clearTimeout();
    this.setState({ original_array });
  };
  render() {
    const { list } = this.state;
    return (
      <div>
        <header>
          <p>Visualizer</p>
          <a className="cta" href="#" onClick={this.generateNewValues}>
            Generate New Values!
          </a>
          <input
            type="range"
            id="slider"
            name="Slider"
            defaultValue="4"
            min="4"
            max="271"
            onChange={this.reSizeArray}
          />
          <nav>
            <div className="nav__links">
              <li>
                <a href="#" onClick={this.traverseArray}>
                  Traverse Each Element
                </a>
              </li>
              <li>
                <a href="#">Algorithm-2</a>
              </li>
              <li>
                <a href="#">Algorithm-3</a>
              </li>
            </div>
          </nav>
          <a className="cta" href="#" onClick={this.sortValues}>
            Sort
          </a>
        </header>
        <div className="container">
          {this.state.list.map((number, index) => (
            <div
              className="normalBar"
              id={index}
              style={{ height: number * 3 }}
            >
              <p style={{ color: "transparent" }}>{number}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Visualizer;
