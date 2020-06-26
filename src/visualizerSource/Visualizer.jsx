import React, { Component } from "react";

class Visualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      NUMBER_OF_ARRAY_BARS: 4,
    };
  }
  getNumberOnBar = (bar_count) => {
    if (bar_count <= 65) return "aliceblue";
    else return "transparent";
  };
  getWidthOfBars = (bar_count, screen_width) => {
    //Now we have screen_width to dyanmically adjust with various devices
    //1) We have bar_width + margin(default: 2px) in CSS
    var width;
    //Now decrease screen_width by 20px (Because of the Scroll bar intervention)
    screen_width -= 20;
    //Now decrease the margin size from screen_width, because each bar consumes 2px has margin-right
    //Decrease total screen_width by (margin * Number_of_bars)
    screen_width = screen_width - bar_count * 2;

    width = screen_width / bar_count; //Now this gives us the width for number_of_bars
    console.log(width);

    return width;
  };
  generateValuesInArray = (NUMBER_OF_ARRAY_BARS) => {
    const min = 1;
    const max = 255;
    const list = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++)
      list.push(Math.trunc(min + Math.random() * (max - min)));
    this.setState({ list });
  };
  generateNewValues = () => {
    //Now delete all elements in array, so that we can use above method(generateValuesInArray)
    //this.state.list.length = 0; //This will empty the array( Reference: https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript)
    this.setState({ list: [] });
    //console.log(this.state.NUMBER_OF_ARRAY_BARS);
    //console.log("I am here now ");
    this.generateValuesInArray(this.state.NUMBER_OF_ARRAY_BARS);
  };
  reSizeArray = (event) => {
    console.log("User Selected: ", event.target.value);
    //User select a value
    //Now update the array size
    this.setState({ NUMBER_OF_ARRAY_BARS: event.target.value }, () => {
      this.generateNewValues();
    });
    /*
    The setState() operation is asynchronous and hence your console.log() will be executed before the setState() mutates the values and hence you see the result.

    To solve this: we have included this.geneateNewValues() in it's call back area
    */
  };

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  sortValues = async () => {
    //Bubble Sort
    console.log("I am here");
    for (var i = 0; i < 3; i++) {
      await this.sleep(1000);
      console.log("I am here now after ", i + 1, " seconds");
    }

    // let array = this.state.list;
    // let temp = 0;
    // let counter = 1;
    // console.log("Array is: ", array);
    // let leng_of_array = array.length;
    // for (let i = 0; i < leng_of_array - 1; i++) {
    //   for (let j = 0; j < leng_of_array - 1; j++) {
    //     if (array[j] > array[j + 1]) {
    //       console.log("Change a[j],a[j+1] ", j, j + 1, array[j], array[j + 1]);
    //       setTimeout(() => {
    //         document.getElementById(j).setAttribute("class", "redBar");
    //         document.getElementById(j + 1).setAttribute("class", "redBar");
    //       }, counter * 1000);
    //       counter++;
    //       setTimeout(() => {
    //         document.getElementById(j).setAttribute("class", "normalBar");
    //         document.getElementById(j + 1).setAttribute("class", "normalBar");
    //       }, counter * 1000);
    //       counter++;
    //       temp = array[j];
    //       array[j] = array[j + 1];
    //       array[j + 1] = temp;
    //       console.log("Swappped");
    //     }
    //   }
    // }
    // this.setState({ array });
    // clearTimeout();
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
  };
  render() {
    const { list } = this.state;
    var widthOfBar = this.getWidthOfBars(
      this.state.NUMBER_OF_ARRAY_BARS,
      window.innerWidth
    );

    var displayNumberOnBar = this.getNumberOnBar(
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
            defaultValue="3"
            min="3"
            max="400"
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
              key={index}
              style={{ height: number * 3, width: widthOfBar }}
            >
              <p className="makeTextBold" style={{ color: displayNumberOnBar }}>
                {number}
              </p>
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
