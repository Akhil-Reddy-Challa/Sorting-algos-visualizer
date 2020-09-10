export function QuickSort(array) {
  let all_the_animations = [];
  sort(array, 0, array.length - 1, all_the_animations);
  return all_the_animations;
}
function sort(arr, low, high, animations) {
  if (low < high) {
    /* pi is partitioning index, arr[pi] is  
                now at right place */
    let pi = partition(arr, low, high, animations);
    // Recursively sort elements before
    // partition and after partition
    sort(arr, low, pi - 1, animations);
    sort(arr, pi + 1, high, animations);
  }
}
function partition(arr, low, high, animations) {
  let pivot = arr[high];
  let i = low;
  for (let j = low; j < high; j++) {
    // If current element is smaller than the pivot
    animations.push([j, j]);
    if (arr[j] < pivot) {
      animations.push([i, j]);
      // swap arr[i] and arr[j]
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
    }
  }
  // swap arr[i] and arr[high] (or pivot)
  animations.push([i, high]);
  let temp = arr[i];
  arr[i] = arr[high];
  arr[high] = temp;
  return i;
}
