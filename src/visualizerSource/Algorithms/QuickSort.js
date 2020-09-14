export function QuickSort(array) {
  let all_the_animations = [];
  quickSort(array, 0, array.length - 1, all_the_animations);
  return all_the_animations;
}
function quickSort(array, leftIndex, rightIndex, animations) {
  // Declare an index that will be our pivot reference.
  var pivotIndex;

  // If the array has only one item, it's already sorted!
  if (array.length > 1) {
    // As long as the array has two elements, we can parition it.
    pivotIndex = partition(array, leftIndex, rightIndex, animations);
    //console.log("**** pivot is: ", array[pivotIndex]);
    // If the left reference hasn't been incremented to
    // reach the pivot yet, we want to keep comparing it.
    if (leftIndex < pivotIndex - 1) {
      quickSort(array, leftIndex, pivotIndex - 1, animations);
    }
    // If the right reference hasn't reached the
    // pivotIndex yet, we need to keep comparing it.
    if (pivotIndex < rightIndex) {
      quickSort(array, pivotIndex, rightIndex, animations);
    }
  }
}
function partition(array, leftIndex, rightIndex, animations) {
  // Find the pivot by adding the two indexes together
  // and dividing by two (the middle element, effectively).
  var pivot = array[Math.floor((rightIndex + leftIndex) / 2)];
  // Once the leftIndex reference is greater than the rightIndex reference,
  // we have finished sorting this set of array, and we can return.
  while (leftIndex <= rightIndex) {
    // If the leftIndex pointer is less than the pivot, increment it.
    // In other words, move the pointer to the rightIndex.
    while (pivot > array[leftIndex]) {
      animations.push([leftIndex, leftIndex]);
      leftIndex++;
    }
    // If the rightIndex pointer is greater than the pivot, decrement it.
    // In other words, move the pointer to the leftIndex.
    while (pivot < array[rightIndex]) {
      animations.push([rightIndex, rightIndex]);
      rightIndex--;
    }
    // If the leftIndex pointer is larger than the pivot, and the rightIndex
    // pointer is not bigger than the pivot, swap the two elements.
    if (leftIndex <= rightIndex) {
      swap(array, leftIndex, rightIndex, animations);
      // After swapping, increment/decrement the pointers respectively.
      leftIndex++;
      rightIndex--;
    }
  }

  // The leftIndex item becomes the new pivot element.
  return leftIndex;
}
function swap(arr, left, right, animations) {
  //Store the  animations
  animations.push([left, right]);
  let temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}
