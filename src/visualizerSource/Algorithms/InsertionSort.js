export function InsertionSort(array) {
  let leng_of_array = array.length;
  var all_the_animations = [];
  var key, j;
  for (var i = 1; i < leng_of_array; i++) {
    key = array[i];
    j = i - 1;
    //Now highlight the above two elements for comparision

    while (j >= 0 && array[j] > key) {
      //Now we found highest element in left side, so swap
      all_the_animations.push([j, j + 1]);
      array[j + 1] = array[j];
      j -= 1;
    }
    array[j + 1] = key;
  }
  return all_the_animations;
}
