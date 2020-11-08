import React, { Component } from "react";
class NavBar extends Component {
  render() {
    const sortingAlgorithms = [
      "Bubble-Sort",
      "Insertion-Sort",
      "Heap-Sort",
      "Selection-Sort",
      "Quick-Sort",
      "Merge-Sort",
    ];
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-dark" id="headerBar">
        <a
          class="navbar-brand"
          href="/#"
          onClick={() => {
            window.location.reload();
          }}
        >
          Sorting-Visualizer
        </a>
        <button onClick={this.props.onGenerateNewValues}>
          Generate New Values
        </button>
        <a className="navbar-brand" id="inputSliderText" href="/#">
          Resize Array
        </a>
        <input
          type="range"
          id="slider"
          name="Slider"
          defaultValue="5"
          min="5"
          max={this.props.slider_max_value}
          onChange={this.props.onResizeArray}
        />
        <ul className="navbar-nav mr-auto">
          {sortingAlgorithms.map((algoName, index) => (
            <li key={index} className="nav-item active">
              <a
                className="nav-link"
                href="/#"
                onClick={() => this.props.onAlgorithmSelect(index)}
              >
                {algoName}
              </a>
            </li>
          ))}
          <button
            className="stopButton"
            id="stopButton"
            href="/#"
            onClick={() => {
              window.location.reload();
            }}
          >
            Stop!
          </button>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
