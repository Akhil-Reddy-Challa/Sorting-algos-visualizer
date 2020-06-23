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
  getNumberOnBar = (bar_count) => {
    if (bar_count <= 40) return "aliceblue";
    else return "transparent";
  };
  getWidthOfBars = (bar_count) => {
    let width; //set default value
    if (bar_count <= 7) width = 265;
    else if (bar_count <= 20) width = 91.5;
    else if (bar_count <= 40) width = 44;
    else if (bar_count <= 80) width = 20;
    else if (bar_count <= 160) width = 8;
    else if (bar_count <= 213) width = 4;
    else width = 3;
    return width;
    //console.log(width);
  };
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
    //console.log("I am here now ");
    this.generateValuesInArray(this.state.NUMBER_OF_ARRAY_BARS);
  };
  reSizeArray = (event) => {
    //console.log("User Selected: ", event.target.value);
    //User select a value
    //Now update the array size
    this.state.NUMBER_OF_ARRAY_BARS = event.target.value;
    this.generateNewValues();
  };
  sortValues = () => {
    //Bubble Sort
    let array = this.state.list;
    let temp = 0;
    let counter = 1;
    let leng_of_array = array.length;
    for (let i = 0; i < leng_of_array - 1; i++) {
      for (let j = 0; j < leng_of_array - 1; j++) {
        console.log("Two elements(j,j+1) are: ", j, j + 1);
        //Now highlight the color of the two elements
        setTimeout(() => {
          document.getElementById(j).setAttribute("class", "redBar");
          document.getElementById(j + 1).setAttribute("class", "redBar");
        }, counter * 1000);
        if (array[j] > array[j + 1]) {
          console.log(
            "Elements being swapped are==================================> ",
            array[j],
            array[j + 1]
          );
          temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
        counter++;
      }
    }
    //this.setState({ array });

    clearTimeout();
  };

  traverseArray = (bar_color) => {
    const leng_of_array = this.state.list.length;
    let original_array = this.state.list;
    //let i = 0;
    for (let i = 0; i < leng_of_array * 2; i++) {
      if (i < leng_of_array) {
        setTimeout(() => {
          console.log("Element in if", i);
          if (document.getElementById(i) != null)
            document.getElementById(i).setAttribute("class", "redBar");
        }, i * 10);
        //console.log("inside if: ", i);
      } else {
        //console.log("inside else: ", i - leng_of_array);
        setTimeout(() => {
          console.log("Element in else", i - leng_of_array);
          if (document.getElementById(i - leng_of_array) != null)
            document
              .getElementById(i - leng_of_array)
              .setAttribute("class", "normalBar");
        }, i * 10);
      }
    }

    clearTimeout();
    this.setState({ original_array });
  };
  render() {
    const { list } = this.state;
    let widthOfBar = this.getWidthOfBars(this.state.NUMBER_OF_ARRAY_BARS);
    let displayNumberOnBar = this.getNumberOnBar(
      this.state.NUMBER_OF_ARRAY_BARS
    );
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
            defaultValue="7"
            min="7"
            max="273"
            onChange={this.reSizeArray}
          />
          <nav>
            <div className="nav__links">
              <li>
                <a href="#" onClick={() => this.traverseArray("redBar")}>
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
              style={{ height: number * 3, width: widthOfBar }}
            >
              <p style={{ color: displayNumberOnBar }}>{number}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Visualizer;
/*Timeout Code:
        setTimeout(() => {
          console.log();
        }, 1000);
        clearTimeout();

*/
