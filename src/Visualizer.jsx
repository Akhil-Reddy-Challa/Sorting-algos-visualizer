import React, { Component } from "react";
import AlgorithmCaller from "./Algorithms/CallAlgorithm";
import CalculateValues from "./Algorithms/CalculateValues";
import NavBar from "./components/NavBar";
class Visualizer extends Component {
  state = {
    list: [31, 100, 71, 43, 108],
  };
  getFontSize = () => {
    return width_of_bar > 30 ? "visible" : "hidden";
  };
  generateNewValues = () => {
    //Goal: Generate an array with size(number_of_bars_to_display) with all random numbers
    var list = [];
    const min_number = 5;
    //Based on our device_height we must set our max number
    /*
    1. (window.innerHeight) gives us the screen_height
    2. Our nav bar occupies (header_bar_height) pixels
    >> header_bar_height = Calculates the height of header bar
    3. Hence we subtract them from device height
    4. Now divide by 3, because we set our array_bar height by multipyling the number by 3
    */
    const max_number = Math.floor((window.innerHeight - header_bar_height) / 3);
    for (let i = 0; i < number_of_bars_to_display; i++)
      list.push(
        Math.trunc(min_number + Math.random() * (max_number - min_number))
      );
    this.setState({ list });
  };
  reSizeArray = (event) => {
    //User selects a new value
    //Now update the array size
    number_of_bars_to_display = parseInt(event.target.value);
    //console.log("number_of_bars_to_display:", number_of_bars_to_display);
    //As the bars increase/decrease we should re-compute the bar width
    /*
    1) Find screen_width
    2) Subtract 40px(Because of margin-right{20px} & margin-left{20px} in container class CSS)
    3) Subtract (number_of_bars*2) pixels i.e each bar has a right_margin:2px, hence multiply with 2
    4) Divide with total_number_of_bars
    5) Parse the floating width and compute the width of each bar
    6) Compute the left over width
   */

    let available_width_on_the_screen =
      window.innerWidth - 40 - number_of_bars_to_display * 2;
    //console.log("Total width : ", available_width_on_the_screen);
    width_of_bar = available_width_on_the_screen / number_of_bars_to_display; //Floating point width
    //Width would be some floating point number, like 3.45 => Convert it to 3
    //In the process of flooring the width, we loose (0.45 * Total_bars) worth of space
    //So store it in left_over_width
    let left_over_width = width_of_bar - Math.floor(width_of_bar);
    left_over_width *= number_of_bars_to_display;
    //console.log("left_over_width", left_over_width);

    width_of_bar = parseInt(width_of_bar); //Parse the floating width
    let new_bars = parseInt(left_over_width / (width_of_bar + 2)); //Divide with left_over with (parsed_width+2), 2 is for margin-right of array bar
    //console.log("new_bars are:", new_bars);
    number_of_bars_to_display += new_bars; //Add it to the total

    this.generateNewValues();
  };
  getTimeToPause = (numberOfElements) => {
    if (numberOfElements < 20) return 130;
    else if (numberOfElements < 40) return 50;
    else if (numberOfElements < 100) return 25;
    else if (numberOfElements < 200) return 12;
    else return 2;
  };
  Algorithm = (algorithm_name) => {
    //Make the navbar components un-clickable
    document.getElementById("headerBar").style.pointerEvents = "none";
    /*
     @param(algorithm_name) tells us the algorithm user clicked
     0 === Bubble Sort
     1 === Insertion Sort
     2 === Heap Sort
     3 === Selection Sort
     4 === Quick Sort
     We don't call Merge Sort using AlgorithCaller, as it is async implementaion, invoke mergeSort directly
     */
    if (algorithm_name === 5) {
      this.mergeSort();
      return;
    }
    //Now call the func, it returns an array with all the animation
    let arr = this.state.list.slice();
    let all_the_animations = AlgorithmCaller(algorithm_name, arr);
    //Now call the func(paintTheNodes) to start animating
    this.paintTheNodes(all_the_animations);
  };
  mergeSort = async () => {
    //Merge sort is  async implementation, hence I was unable to push it to Algorithms folder
    //this.disableAllTheButtons();
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
    console.log("Here already");
    //During algo start, we make navbar components un-clickable, now we have to re-enable them
    document.getElementById("headerBar").style.pointerEvents = "auto";
  };
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  paintTheNodes = (all_the_animations) => {
    /**
     * Responsible for animating the arrays_bars
     * all_the_animations == Contains all the changes recorded during our sorting-algorithms
     */
    var timer = 1;
    let { list } = this.state;
    var timeToPause = this.getTimeToPause(list.length);
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
      setTimeout(() => this.swapElements(i1, i2, list), timeToPause * timer++);
      setTimeout(
        () => this.changeTheColorOfNodes(i1, i2, "normal"),
        timeToPause * timer++
      );
    }
    //Finally, we have to sort the array(list) in the React state
    //We use setTimeout because, we want the array to be updated after the animation is done
    setTimeout(() => this.setState({ list }), timeToPause * timer++);
    //During algo start, we make navbar components un-clickable, now we have to re-enable them
    setTimeout(
      () => (document.getElementById("headerBar").style.pointerEvents = "auto"),
      timeToPause * timer
    );
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
  render() {
    const fontSizeForNumber = this.getFontSize();
    return (
      <React.Fragment>
        <NavBar
          slider_max_value={slider_max_value}
          onGenerateNewValues={this.generateNewValues}
          onResizeArray={this.reSizeArray}
          onAlgorithmSelect={this.Algorithm}
        />
        <div className="arrayBarsContainer">
          {this.state.list.map((number, indexOfElement) => (
            <div
              className="normalBar"
              id={indexOfElement}
              key={indexOfElement}
              style={{ height: number * 3, width: width_of_bar }}
            >
              <p
                className="numberOnBar"
                style={{ visibility: fontSizeForNumber }}
              >
                {number}
              </p>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    //This is invoked automatically after render()
    /*
    1) This gives us an opportunity to calculate height allocated to <header> element
    >>Without render being executed, we cannot find height given to our header element
    */
    header_bar_height = document.getElementById("headerBar").offsetHeight;
  }
}
let {
  slider_max_value,
  number_of_bars_to_display,
  width_of_bar,
  header_bar_height,
} = CalculateValues();
export default Visualizer;
