export function HeapSort(array) {
  var leng_of_array = array.length; //Get array length
  var all_the_animations = [];
  // Build heap (rearrange array)
  for (let i = leng_of_array / 2 - 1; i >= 0; i--)
    heapify(array, leng_of_array, i, all_the_animations);

  // One by one extract an element from heap
  for (let i = leng_of_array - 1; i > 0; i--) {
    // Move current root to end
    all_the_animations.push([0, i]);
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    // call max heapify on the reduced heap
    heapify(array, i, 0, all_the_animations);
  }
  return all_the_animations;
}
function heapify(arr, n, i, all_the_animations) {
  let largest = i; // Initialize largest as root
  let l = 2 * i + 1; // left = 2*i + 1
  let r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < n && arr[l] > arr[largest]) largest = l;

  // If right child is larger than largest so far
  if (r < n && arr[r] > arr[largest]) largest = r;

  // If largest is not root
  if (largest !== i) {
    all_the_animations.push([i, largest]); //For animation record the indexes
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, all_the_animations);
  }
}
