export function BubbleSort(array) {
  let temp = 0;
  let leng_of_array = array.length;
  let isSorted = false;
  var all_the_animations = []; //Stores all the animations
  for (let i = 0; i < leng_of_array && !isSorted; i++) {
    isSorted = true;
    for (let j = 0; j < leng_of_array - 1; j++) {
      if (array[j] > array[j + 1]) {
        //Elements are unsorted here, so we push them the array
        all_the_animations.push([j, j + 1]);
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        isSorted = false;
      }
    }
  }
  return all_the_animations;
}
