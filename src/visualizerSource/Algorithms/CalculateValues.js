export default function CalculateValues() {
  /*
    Slider_max_value:
    This is responsible for calculating the max_value to slider
    1) It considers device_Width and subtracts 10px(Because of margin-right{5px} & margin-left{5px} in container class CSS)
    2) It divides the above by 3, because smallest_bar occupies 3pixels(bar:1px, left_margin:2px)
    3) This is usefuly when App is opened in mobile-browsers
    */
  let slider_max_value = Math.min(
    300,
    Math.floor((window.innerWidth - 10) / 3)
  );

  //Holds the count of bars on the screen, initial is 5
  let number_of_bars_to_display = 5;
  /*
    1) Find screen_width to dynamically adjust with various screen_resolutions
    2) Subtract 10px(Because of margin-right{5px} & margin-left{15px} in container class CSS)
    3) Subtract (number_of_bars*2) pixels i.e each bar has a left_margin:2px, hence multiply with 2
    4) Divide with total_number_of_bars
   */
  let width_of_bars =
    (window.innerWidth - 20 - number_of_bars_to_display * 2) /
    number_of_bars_to_display;
  let header_bar_height = 0; //Will be computed in method(componentDidMount)
  return {
    slider_max_value,
    number_of_bars_to_display,
    width_of_bars,
    header_bar_height,
  };
}
