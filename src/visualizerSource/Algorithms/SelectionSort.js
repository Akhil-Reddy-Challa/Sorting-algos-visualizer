export function SelectionSort(array) {
  let array_leng = array.length;
  let all_the_animations = [];
  for (let i = 0; i < array_leng; i++) {
    let min_element_index = getMinElementIndex(i, array, all_the_animations);
    //Now place the min_element to the beginning, if it is min
    if (array[i] !== array[min_element_index]) {
      all_the_animations.push([i, min_element_index]);
      let temp = array[i];
      array[i] = array[min_element_index];
      array[min_element_index] = temp;
    }
  }
  return all_the_animations;
}
function getMinElementIndex(startIndex, array, all_the_animations) {
  let min_index = startIndex;
  for (let i = startIndex + 1; i < array.length; i++) {
    all_the_animations.push([i, i]); //We store this to create lag in our animation, selection sort is O(n*n), so to show that we push this to animations
    if (array[i] < array[min_index]) min_index = i;
  }
  return min_index;
}
