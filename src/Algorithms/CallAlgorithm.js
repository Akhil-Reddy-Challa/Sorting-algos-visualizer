import { BubbleSort } from "./BubbleSort";
import { InsertionSort } from "./InsertionSort";
import { HeapSort } from "./HeapSort";
import { SelectionSort } from "./SelectionSort";
import { QuickSort } from "./QuickSort";
export default function CallAlgorithm(algo_name, array) {
  /*
    algo_name tells us the algorithm to call
     0 === Bubble Sort
     1 === Insertion Sort
     2 === Heap Sort
     3 === Selection Sort
     We don't call Merge Sort, as it is async implementaion
     */
  switch (algo_name) {
    case 0:
      return BubbleSort(array);
    case 1:
      return InsertionSort(array);
    case 2:
      return HeapSort(array);
    case 3:
      return SelectionSort(array);
    case 4:
      return QuickSort(array);
  }
}
