import { AnimationArrayType } from "@/shared/types";

function partition(
  array: number[],
  low: number,
  high: number,
  animations: AnimationArrayType
): number {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // Highlight the elements being compared
    animations.push([[j, high], false]);

    if (array[j] <= pivot) {
      i++;
      if (i !== j) {
        // Swap elements
        animations.push([[i, array[j]], true]);
        animations.push([[j, array[i]], true]);
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }

  // Place pivot in correct position
  if (i + 1 !== high) {
    animations.push([[i + 1, array[high]], true]);
    animations.push([[high, array[i + 1]], true]);
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
  }

  return i + 1;
}

function runQuickSort(
  array: number[],
  low: number,
  high: number,
  animations: AnimationArrayType
) {
  if (low < high) {
    const pivotIndex = partition(array, low, high, animations);
    runQuickSort(array, low, pivotIndex - 1, animations);
    runQuickSort(array, pivotIndex + 1, high, animations);
  }
}

export function generateQuickSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray = array.slice();
  runQuickSort(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
  runAnimation(animations);
}
