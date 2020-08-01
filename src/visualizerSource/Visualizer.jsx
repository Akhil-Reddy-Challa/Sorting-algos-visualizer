import React, { Component } from "react";
/*
Slider_max_value:
This is responsible for calculating the max_value to slider
1) It considers device_Width and subtrats 20px(Scrollbar size)
2) It divides the above by 3, because smallest_bar occupies 3pixels(bar:1px, left_margin:2px)
3) This is usefuly when react is opened in mobile-browsers
*/
const slider_max_value = Math.min(
  300,
  Math.floor((window.innerWidth - 20) / 3)
);
var number_of_bars_to_display = 5; //This holds the count of bars to display
var width_of_bars =
  (window.innerWidth - 20 - number_of_bars_to_display * 2) /
  number_of_bars_to_display;
/*
  To understand the above formula, look at method(getWidthOfbars) in version_4 or lesser
  */
let header_bar_height = 0; //Will be computed in method(componentDidMount)
class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [1, 90, 80, 70, 60],
    };
  }
  getNumberOnBar = () => {
    return width_of_bars > 30 ? "aliceblue" : "transparent";
  };
  generateValuesInArray = () => {
    const min_number = 1;
    //Now based on our device_height we must set our max number
    /*
    1. This(window.innerHeight) gives us the height
    2. Our nav bar occupies header_bar_height pixels & bottom scroll bar occupies 20px.
    >> header_bar_height = Calculates heght of header bar
    3. hence we subtract them from device height
    4. Now divide by 3, because we set our array_bar height by multipyling the number by 3
    */

    const max_number = Math.floor(
      (window.innerHeight - header_bar_height - 10) / 3
    );
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
    width_of_bars =
      (window.innerWidth - 20 - number_of_bars_to_display * 2) /
      number_of_bars_to_display; //As the bars increase/decrease we should re-compute the bar width

    this.generateNewValues();
  };
  getTimeToPause = (numberOfElements) => {
    if (numberOfElements < 20) return 80;
    // almost 1 sec
    else if (numberOfElements < 40) return 40;
    // greater than 1/2 Second
    else if (numberOfElements < 100) return 20;
    // less than 1/2 seconds
    else if (numberOfElements < 200) return 8;
    // 90 milliseconds
    else return 0.5;
  };
  changeColorOnNodes = (color, elementID) => {
    if (document.getElementById(elementID) != null)
      document.getElementById(elementID).setAttribute("class", color + "Bar");
  };
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  bubbleSort = async () => {
    this.disableAllButtons("none", "flex"); //This will disable all the Sort buttons on the screen, will re-enable after sorting,,,,2nd Parameter is for display style of stop button
    let array = this.state.list;
    let temp = 0;
    var timeToPause = this.getTimeToPause(array.length);
    let leng_of_array = array.length;
    for (let i = 0; i < leng_of_array - 1; i++) {
      for (let j = 0; j < leng_of_array - 1; j++) {
        //Now highlight two nodes that we are comparing
        this.changeColorOnNodes("green", j);
        this.changeColorOnNodes("green", j + 1);
        await this.sleep(timeToPause);
        if (array[j] > array[j + 1]) {
          //Change color to red because they are unsorted
          this.changeColorOnNodes("red", j);
          this.changeColorOnNodes("red", j + 1);
          //Freeze for 1 sec
          await this.sleep(timeToPause);
          //Now swap elements and change the list array
          temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          this.setState({ array });
        }
        //Now change color back to normal
        this.changeColorOnNodes("normal", j);
        this.changeColorOnNodes("normal", j + 1);
      }
    }
    this.disableAllButtons("flex", "none"); //This will re-enable all the Sort buttons on the screen.
  };
  heapSort = async () => {
    this.disableAllButtons("none", "flex"); //This will disable all the Sort buttons on the screen, will re-enable after sorting,,,,2nd Parameter is for stop button
    let array = this.state.list;
    var timeToPause = this.getTimeToPause(array.length);
    var arr_len = array.length; //Get array length
    //console.log("Unsorted array is: ", array);
    for (var i = 1; i < arr_len; i++) {
      // if child is bigger than parent
      var parentIndex = Math.floor((i - 1) / 2);
      //Now highlight the  nodes that we are comparing
      this.changeColorOnNodes("green", i);
      this.changeColorOnNodes("green", parentIndex);
      await this.sleep(timeToPause);
      if (array[i] > array[parentIndex]) {
        var j = i;

        // swap child and parent until
        // parent is smaller
        while (array[j] > array[Math.floor((j - 1) / 2)]) {
          //Now chagne color to red
          this.changeColorOnNodes("red", j);
          this.changeColorOnNodes("red", Math.floor((j - 1) / 2));
          await this.sleep(timeToPause);
          this.swap(array, j, Math.floor((j - 1) / 2));
          this.setState({ array });
          //Now chage color back to normal
          this.changeColorOnNodes("normal", j);
          this.changeColorOnNodes("normal", Math.floor((j - 1) / 2));
          j = Math.floor((j - 1) / 2);
        }
      }
      //If if is not executed, the color would be green so change to normal
      this.changeColorOnNodes("normal", i);
      this.changeColorOnNodes("normal", parentIndex);
    }

    for (i = arr_len - 1; i > 0; i--) {
      // swap value of first index
      // with last index
      this.swap(array, 0, i);
      this.setState({ array });
      // maintaining heap property
      // after each swapping
      j = 0;
      var leftChild, rightChild;

      do {
        leftChild = 2 * j + 1;
        rightChild = leftChild + 1; //Just for display
        this.changeColorOnNodes("green", j, leftChild);
        this.changeColorOnNodes("green", rightChild, leftChild);
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
          this.changeColorOnNodes("green", leftChild, leftChild);
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
    this.disableAllButtons("flex", "none"); //This will re-enable all the Sort buttons on the screen.
  };
  swap = (array, i, j) => {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
  insertionSort = async () => {
    this.disableAllButtons("none", "flex"); //This will disable all the Sort buttons on the screen, will re-enable after sorting,,,,2nd Parameter is for stop button
    let array = this.state.list;
    //let temp = 0;
    var timeToPause = this.getTimeToPause(array.length); //Based on number of array elements, get the time to pause
    let leng_of_array = array.length;
    var key, j;
    for (var i = 1; i < leng_of_array; i++) {
      key = array[i];
      j = i - 1;
      //Now highlight the above two elements for comparision
      this.changeColorOnNodes("green", i);
      this.changeColorOnNodes("green", j);
      await this.sleep(timeToPause);
      while (j >= 0 && array[j] > key) {
        //Now we found highest element in left side, so swap
        //Change colors to red
        this.changeColorOnNodes("red", j);
        this.changeColorOnNodes("red", j + 1);
        await this.sleep(timeToPause);
        array[j + 1] = array[j];
        j -= 1;
        //Change colors back to normal
        this.changeColorOnNodes("normal", j + 1);
        this.changeColorOnNodes("normal", j + 2);
        this.setState({ array });
      }
      array[j + 1] = key;
      this.changeColorOnNodes("normal", i);
      //If the array is already sorted, the initial green color stays, so to avoid that
      this.changeColorOnNodes("normal", j);
      this.setState({ array });
    }
    this.disableAllButtons("flex", "none"); //This will re-enable all the Sort buttons on the screen.
  };
  mergeSort = async () => {
    this.disableAllButtons("none", "flex"); //This will disable all the Sort buttons on the screen, will re-enable after sorting,,,,2nd Parameter is for stop button
    console.log("var: ", global.my_dummy_var);
    let i, j, k, size, l1, h1, l2, h2;
    let array = this.state.list;
    let n = array.length;
    var timeToPause = this.getTimeToPause(n);
    let temp = new Array(n).fill(0);
    // /* l1 lower bound of first pair and so on */
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
          this.changeColorOnNodes("green", i);
          this.changeColorOnNodes("green", j);
          await this.sleep(timeToPause);
          //Change color back to normal
          this.changeColorOnNodes("normal", i);
          this.changeColorOnNodes("normal", j);
          if (array[i] <= array[j]) temp[k++] = array[i++];
          else {
            //This is reached when two elements are unsorted, Ex: array[i]=3, array[j]=2
            //Highlight them as RedColor
            this.changeColorOnNodes("red", i);
            this.changeColorOnNodes("red", j);
            await this.sleep(timeToPause);
            this.changeColorOnNodes("normal", i);
            this.changeColorOnNodes("normal", j);
            temp[k++] = array[j++];
          }
        }
        //If below executes,it means there are some un-traversed elements
        while (i <= h1) {
          //Just change the color from green and back to normal
          this.changeColorOnNodes("green", i);
          await this.sleep(timeToPause);
          this.changeColorOnNodes("normal", i);
          temp[k++] = array[i++];
        }
        while (j <= h2) {
          //Just change the color from green and back to normal
          this.changeColorOnNodes("green", j);
          await this.sleep(timeToPause);
          this.changeColorOnNodes("normal", j);
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

    this.disableAllButtons("flex", "none"); //This will re-enable all the Sort buttons on the screen.
  };
  componentDidMount() {
    //This is invoked automatically after render()
    /*
    1) This gives us an opportunity to caluculate height allocated to <header> element
    >>Because without render being executed, we cannot find height given to our header eleemnt
    2) Store it as a constant(name )
    */
    header_bar_height = document.getElementById("header").offsetHeight;
  }
  disableAllButtons(displayModeForSortButtons, displayModeForStopButton) {
    document.getElementById(
      "bubbleSort"
    ).style.display = displayModeForSortButtons;
    document.getElementById(
      "heapSort"
    ).style.display = displayModeForSortButtons;
    document.getElementById(
      "insertionSort"
    ).style.display = displayModeForSortButtons;
    document.getElementById("slider").style.display = displayModeForSortButtons;
    document.getElementById(
      "generateNewValuesButton"
    ).style.display = displayModeForSortButtons;
    document.getElementById(
      "stopButton"
    ).style.display = displayModeForStopButton;
    document.getElementById(
      "mergeSort"
    ).style.display = displayModeForSortButtons;
  }
  render() {
    const displayNumberonBar = this.getNumberOnBar();
    return (
      <div>
        <header id="header">
          <p className="title">Visualizer</p>
          <a
            className="cta"
            href="#"
            id="generateNewValuesButton"
            onClick={this.generateNewValues}
          >
            Generate New Values!
          </a>
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
            <div className="nav__links">
              <li>
                <a href="#" id="heapSort" onClick={() => this.heapSort()}>
                  Heap-Sort
                </a>
              </li>
              <li>
                <a href="#" id="bubbleSort" onClick={() => this.bubbleSort()}>
                  Bubble-Sort
                </a>
              </li>
              <li>
                <a
                  href="#"
                  id="insertionSort"
                  onClick={() => this.insertionSort()}
                >
                  Insertion-Sort
                </a>
              </li>
              <li>
                <a href="#" id="mergeSort" onClick={() => this.mergeSort()}>
                  Merge-Sort
                </a>
              </li>
            </div>
          </nav>
          <a
            className="cta"
            id="stopButton"
            href="#"
            style={{ display: "none" }}
            onClick={() => {
              window.location.reload(false);
            }}
          >
            Stop!
          </a>
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
}

export default Visualizer;
