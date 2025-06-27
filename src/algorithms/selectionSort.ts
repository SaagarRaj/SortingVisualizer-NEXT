import { AnimationArrayType } from "@/shared/types";

function runSelectionSort(array: number[], animations: AnimationArrayType) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    // Highlight the current position
    animations.push([[i], false]);

    // Find the minimum element in the unsorted portion
    for (let j = i + 1; j < array.length; j++) {
      // Highlight comparison
      animations.push([[j, minIndex], false]);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      animations.push([[i, array[minIndex]], true]);
      animations.push([[minIndex, array[i]], true]);
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
}

export function generateSelectionSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray = array.slice();
  runSelectionSort(auxiliaryArray, animations);
  runAnimation(animations);
}
