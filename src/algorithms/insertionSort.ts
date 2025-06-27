import { AnimationArrayType } from "@/shared/types";

function runInsertionSort(array: number[], animations: AnimationArrayType) {
  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    // Highlight the current element being inserted
    animations.push([[i], false]);

    while (j >= 0 && array[j] > key) {
      // Highlight comparison
      animations.push([[j, j + 1], false]);

      // Shift element to the right
      animations.push([[j + 1, array[j]], true]);
      array[j + 1] = array[j];
      j--;
    }

    // Place the key in its correct position
    if (j + 1 !== i) {
      animations.push([[j + 1, key], true]);
      array[j + 1] = key;
    }
  }
}

export function generateInsertionSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray = array.slice();
  runInsertionSort(auxiliaryArray, animations);
  runAnimation(animations);
}
