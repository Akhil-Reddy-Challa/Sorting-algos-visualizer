import React, { Component } from "react";

class Visualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [40, 50, 30, 20, 10],
      NUMBER_OF_ARRAY_BARS: 5,
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
    //console.log(width);

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
    //console.log("User Selected: ", event.target.value);
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
  getTimeToPause = (numberOfElements) => {
    if (numberOfElements < 20) return 100;
    // almost 1 sec
    else if (numberOfElements < 40) return 70;
    // greater than 1/2 Second
    else if (numberOfElements < 100) return 40;
    // less than 1/2 seconds
    else if (numberOfElements < 200) return 15;
    // 90 milliseconds
    else return 1;
  };
  changeColorOnNodes = (color, leftChild1, leftChild2) => {
    if (document.getElementById(leftChild1) != null)
      document.getElementById(leftChild1).setAttribute("class", color + "Bar");
    if (document.getElementById(leftChild2) != null)
      document.getElementById(leftChild2).setAttribute("class", color + "Bar");
  };
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  bubbleSort = async () => {
    let array = this.state.list;
    let temp = 0;
    var timeToPause = this.getTimeToPause(array.length);
    let leng_of_array = array.length;
    for (let i = 0; i < leng_of_array - 1; i++) {
      for (let j = 0; j < leng_of_array - 1; j++) {
        //Now highlight two nodes that we are comparing
        this.changeColorOnNodes("blue", j, j + 1);
        await this.sleep(timeToPause);
        if (array[j] > array[j + 1]) {
          //Change color to red because they are unsorted
          this.changeColorOnNodes("red", j, j + 1);
          //Freeze for 1 sec
          await this.sleep(timeToPause);
          //Now swap elements and change the list array
          temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          this.setState({ array });
        }
        //Now change color back to normal
        this.changeColorOnNodes("normal", j, j + 1);
      }
    }
    //this.setState({ array });
  };

  heapSort = async () => {
    let array = this.state.list;
    var temp;
    var timeToPause = this.getTimeToPause(array.length);
    var arr_len = array.length; //Get array length
    //console.log("Unsorted array is: ", array);
    for (var i = 1; i < arr_len; i++) {
      // if child is bigger than parent
      var parentIndex = Math.floor((i - 1) / 2);
      //Now highlight the  nodes that we are comparing
      this.changeColorOnNodes("blue", i, parentIndex);
      await this.sleep(timeToPause);
      if (array[i] > array[parentIndex]) {
        var j = i;

        // swap child and parent until
        // parent is smaller
        while (array[j] > array[Math.floor((j - 1) / 2)]) {
          //Now chagne color to red
          this.changeColorOnNodes("red", j, Math.floor((j - 1) / 2));
          await this.sleep(timeToPause);
          this.swap(array, j, Math.floor((j - 1) / 2));
          this.setState({ array });
          //Now chage color back to normal
          this.changeColorOnNodes("normal", j, Math.floor((j - 1) / 2));
          j = Math.floor((j - 1) / 2);
        }
      }
      //If if is not executed, the color would be blue so change to normal
      this.changeColorOnNodes("normal", i, parentIndex);
    }

    for (var i = arr_len - 1; i > 0; i--) {
      // swap value of first index
      // with last index
      this.swap(array, 0, i);
      this.setState({ array });
      // maintaining heap property
      // after each swapping
      var j = 0,
        leftChild,
        rightChild;

      do {
        leftChild = 2 * j + 1;
        rightChild = leftChild + 1; //Just for display
        this.changeColorOnNodes("blue", j, leftChild);
        this.changeColorOnNodes("blue", rightChild, leftChild);
        await this.sleep(timeToPause);
        // if left child is smaller than
        // right child point leftChild variable
        // to right child
        if (leftChild < i - 1 && array[leftChild] < array[leftChild + 1]) {
          leftChild++;
        }
        //This condition is for only changing colors, not a sorting logic
        if (leftChild !== 2 * j + 1) {
          this.changeColorOnNodes("normal", 2 * j + 1, 2 * j + 1);
          this.changeColorOnNodes("blue", leftChild, leftChild);
        }
        // if parent is smaller than child
        // then swapping parent with child
        // having higher value
        if (leftChild < i && array[j] < array[leftChild]) {
          //Discrepancy, now change color to res
          this.changeColorOnNodes("red", j, leftChild);
          await this.sleep(timeToPause);
          this.swap(array, j, leftChild);
          this.setState({ array });
        }
        this.changeColorOnNodes("normal", j, leftChild);
        this.changeColorOnNodes("normal", rightChild, leftChild);
        j = leftChild;
      } while (leftChild < i);
    }
    //console.log("Sorted array is: ", array);
  };
  swap = (array, i, j) => {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
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
                <a href="#" onClick={() => this.heapSort()}>
                  Heap-Sort
                </a>
              </li>
              <li>
                <a href="#" onClick={() => this.bubbleSort()}>
                  Bubble-Sort
                </a>
              </li>
              <li>
                <a href="#" onClick={() => this.mergeSort()}>
                  Merge-Sort
                </a>
              </li>
            </div>
          </nav>
          <a className="cta" href="#">
            Blank
          </a>
        </header>
        <div className="container">
          {this.state.list.map((number, leftChild) => (
            <div
              className="normalBar"
              id={leftChild}
              key={leftChild}
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
