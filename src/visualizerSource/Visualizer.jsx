import React, { Component } from "react";
import AlgorithmCaller from "./Algorithms/CallAlgorithm";
import CalculateValues from "./Algorithms/CalculateValues";
class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [100, 90, 80, 70, 60],
    };
  }
  getNumberOnBar = () => {
    return width_of_bars > 30 ? "aliceblue" : "transparent";
  };
  generateValuesInArray = () => {
    const min_number = 5;
    //Based on our device_height we must set our max number
    /*
    1. This(window.innerHeight) gives us the screen_height
    2. Our nav bar occupies (header_bar_height) pixels
    >> header_bar_height = Calculates the height of header bar
    3. Hence we subtract them from device height
    4. Now divide by 3, because we set our array_bar height by multipyling the number by 3
    */

    const max_number = Math.floor((window.innerHeight - header_bar_height) / 3);
    const list = [];
    for (let i = 0; i < number_of_bars_to_display; i++)
      list.push(
        Math.trunc(min_number + Math.random() * (max_number - min_number))
      );
    this.setState({ list });
  };
  generateNewValues = () => {
    //Now delete all elements in array, so that we can use above method(generateValuesInArray)
    //this.state.list.length = 0; //This will empty the array( Reference: https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript)
    //console.log("list is:", this.state.list);

    this.setState({ list: [] }); //This will make out list empty
    this.generateValuesInArray();
  };
  reSizeArray = (event) => {
    //User selects a value
    //Now update the array size
    number_of_bars_to_display = event.target.value;
    //As the bars increase/decrease we should re-compute the bar width
    /*
    1) Find screen_width
    2) Subtract 10px(Because of margin-right{5px} & margin-left{5px} in container class CSS)
    3) Subtract (number_of_bars*2) pixels i.e each bar has a left_margin:2px, hence multiply with 2
    4) Divide with total_number_of_bars
   */
    width_of_bars =
      (window.innerWidth - 10 - number_of_bars_to_display * 2) /
      number_of_bars_to_display;

    this.generateNewValues();
  };
  getTimeToPause = (numberOfElements) => {
    if (numberOfElements < 20) return 100;
    else if (numberOfElements < 40) return 60;
    else if (numberOfElements < 100) return 50;
    else if (numberOfElements < 200) return 14;
    else return 2;
  };
  Algorithm = (algorithm_name) => {
    this.disableAllTheButtons(); //Removes all the buttons on the screen
    /*
     *parameter = algorithm tells us the algorithm to call
     0 === Bubble Sort
     1 === Insertion Sort
     2 === Heap Sort
     3 === Selection Sort
     We don't call Merge Sort, as it is async implementaion
     */
    //Now call the func, it returns an array with all the animations
    let all_the_animations = AlgorithmCaller(
      algorithm_name,
      this.state.list.slice()
    );
    //Now call the func(paintTheNodes) to start animating
    this.paintTheNodes(all_the_animations, this.state.list.slice());
  };
  mergeSort = async () => {
    //Merge sort is  async implementation, hence I was unable to push it to Algorithms folder
    this.disableAllTheButtons();
    let array = this.state.list;
    let i, j, k, size, l1, h1, l2, h2;
    let n = array.length;
    let timeToPause = this.getTimeToPause(n);
    let temp = new Array(n).fill(0);
    /* l1 lower bound of first pair and so on */
    for (size = 1; size < n; size = size * 2) {
      l1 = 0;
      k = 0; /* Index for temp array */

      while (l1 + size < n) {
        h1 = l1 + size - 1;
        l2 = h1 + 1;
        h2 = l2 + size - 1;
        /* h2 exceeds the limlt of arr */
        if (h2 >= n) h2 = n - 1;

        /* Merge the two pairs with lower limits l1 and l2 */
        i = l1;
        j = l2;
        //i,j are the elements to be compared
        //Change their color to green in while loop

        while (i <= h1 && j <= h2) {
          if (array[i] <= array[j]) temp[k++] = array[i++];
          else {
            //This is reached when two elements are unsorted, Ex: array[i]=3, array[i+x]=2
            //Highlight them as RedColor
            this.changeTheColorOfNodes(i, j, "red");
            await this.sleep(timeToPause);
            this.changeTheColorOfNodes(i, j, "normal");
            temp[k++] = array[j++];
          }
        }
        //If below executes,it means there are some un-traversed elements
        while (i <= h1) {
          //Just change the color from green and back to normal
          temp[k++] = array[i++];
        }
        while (j <= h2) {
          //Just change the color from green and back to normal
          temp[k++] = array[j++];
        }
        /** Merging completed **/
        /* Take the next two pairs for merging */
        l1 = h2 + 1;
      } /* End of while */

      /* any pair left */
      for (i = l1; k < n; i++) temp[k++] = array[i];

      for (i = 0; i < n; i++) array[i] = temp[i];

      this.setState({ array });
    }
    this.enableAllTheButtons();
  };
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  paintTheNodes = (all_the_animations, array) => {
    /**
     * Responsible for animating the arrays_bars
     * all_the_animations == Contains all the changes recorded during our sorting-algorithms
     */
    var timer = 1;
    var timeToPause = this.getTimeToPause(array.length);
    //Now color the nodes
    for (let node of all_the_animations) {
      let i1 = node[0];
      let i2 = node[1];
      setTimeout(
        () => this.changeTheColorOfNodes(i1, i2, "green"),
        timeToPause * timer++
      );
      setTimeout(
        () => this.changeTheColorOfNodes(i1, i2, "red"),
        timeToPause * timer++
      );
      setTimeout(() => this.swapElements(i1, i2, array), timeToPause * timer++);
      setTimeout(
        () => this.changeTheColorOfNodes(i1, i2, "normal"),
        timeToPause * timer++
      );
    }
    //Finally, we have to sort the array(list) in the React state
    //We use setTimeout because, we want the array to be updated after the animation is done
    setTimeout(() => this.setState({ list: array }), timeToPause * timer++);
    //During algo start, we disable all the buttons, now we have to re-enable them
    setTimeout(() => this.enableAllTheButtons(), timeToPause * timer);
  };
  changeTheColorOfNodes = (node1, node2, color) => {
    document.getElementById(node1).setAttribute("class", color + "Bar");
    document.getElementById(node2).setAttribute("class", color + "Bar");
  };
  swapElements = (index1, index2, array) => {
    /*
    We call this method if we want to swap high_value,low_value
    Ex: swap(5,2)
    1) First find the index1 and increase it height by index2*3 times
    2) Now change the number that we display on the bar
    3) Repeat the above 2 steps for index2
    4) Finally swap the elements and store in the array
    */
    document.getElementById(index1).style.height = array[index2] * 3 + "px";
    document.getElementById(index1).children[0].innerHTML = array[index2];
    document.getElementById(index2).style.height = array[index1] * 3 + "px";
    document.getElementById(index2).children[0].innerHTML = array[index1];
    //Swap
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  };
  disableAllTheButtons = () => {
    //Disables all the buttons,slider
    document.getElementById("bubbleSort").style.display = "none";
    document.getElementById("heapSort").style.display = "none";
    document.getElementById("insertionSort").style.display = "none";
    document.getElementById("mergeSort").style.display = "none";
    document.getElementById("selectionSort").style.display = "none";
    document.getElementById("quickSort").style.display = "none";

    document.getElementById("slider").style.display = "none";
    document.getElementById("generateNewValuesButton").style.visibility =
      "hidden";
    //Now enable the Stop Button
    document.getElementById("stopButton").style.display = "flex";
  };
  enableAllTheButtons = () => {
    //Contrast to disableAllbtns method
    //enables all the buttons,slider
    document.getElementById("bubbleSort").style.display = "flex";
    document.getElementById("heapSort").style.display = "flex";
    document.getElementById("insertionSort").style.display = "flex";
    document.getElementById("mergeSort").style.display = "flex";
    document.getElementById("selectionSort").style.display = "flex";
    document.getElementById("quickSort").style.display = "flex";

    document.getElementById("slider").style.display = "flex";
    document.getElementById("generateNewValuesButton").style.visibility =
      "visible";
    //Now disable the Stop Button
    document.getElementById("stopButton").style.display = "none";
  };
  render() {
    const displayNumberonBar = this.getNumberOnBar();
    return (
      <div>
        <header id="header">
          <p className="title">Visualizer</p>
          <button id="generateNewValuesButton" onClick={this.generateNewValues}>
            Generate New Values
          </button>

          <input
            type="range"
            id="slider"
            name="Slider"
            defaultValue="5"
            min="5"
            max={slider_max_value}
            onChange={this.reSizeArray}
          />
          <nav>
            <div className="algorithmsContainer">
              <li>
                <a href="/#" id="bubbleSort" onClick={() => this.Algorithm(0)}>
                  Bubble-Sort
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  id="insertionSort"
                  onClick={() => this.Algorithm(1)}
                >
                  Insertion-Sort
                </a>
              </li>
              <li>
                <a href="/#" id="heapSort" onClick={() => this.Algorithm(2)}>
                  Heap-Sort
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  id="selectionSort"
                  onClick={() => this.Algorithm(3)}
                >
                  Selection-Sort
                </a>
              </li>
              <li>
                <a href="/#" id="quickSort" onClick={() => this.Algorithm(4)}>
                  Quick-Sort
                </a>
              </li>
              <li>
                <a href="/#" id="mergeSort" onClick={() => this.mergeSort()}>
                  Merge-Sort
                </a>
              </li>
            </div>
          </nav>
          <button
            className="stopButton"
            id="stopButton"
            href="/#"
            onClick={() => {
              window.location.reload(false);
            }}
          >
            Stop!
          </button>
        </header>
        <div className="container">
          {this.state.list.map((number, indexOfElement) => (
            <div
              className="normalBar"
              id={indexOfElement}
              key={indexOfElement}
              style={{ height: number * 3, width: width_of_bars }}
            >
              <p className="numberOnBar" style={{ color: displayNumberonBar }}>
                {number}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  componentDidMount() {
    //This is invoked automatically after render()
    /*
    1) This gives us an opportunity to caluculate height allocated to <header> element
    >>Because without render being executed, we cannot find height given to our header element
    2) Store it as a constant(name )
    */
    header_bar_height = document.getElementById("header").offsetHeight;
  }
}
let {
  slider_max_value,
  number_of_bars_to_display,
  width_of_bars,
  header_bar_height,
} = CalculateValues();
export default Visualizer;
