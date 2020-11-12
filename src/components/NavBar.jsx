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
      <nav
        className="navbar navbar-expand-lg navbar-light bg-dark"
        id="headerBar"
      >
        <p
          className="navbar-brand m-2"
          id="appName"
          onClick={() => {
            window.location.reload();
          }}
        >
          Sorting-Visualizer
        </p>
        <button
          className="generateNewValuesButton"
          onClick={this.props.onGenerateNewValues}
        >
          Generate New Values
        </button>
        <p className="navbar-brand m-2" id="inputSliderText">
          Resize Array
        </p>
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
              <p
                className="nav-link m-2"
                onClick={() => this.props.onAlgorithmSelect(index)}
              >
                {algoName}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default NavBar;
