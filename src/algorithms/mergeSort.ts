import { AnimationArrayType } from "@/shared/types";

function merge(
  array: number[],
  left: number,
  mid: number,
  right: number,
  animations: AnimationArrayType
) {
  const leftArray = array.slice(left, mid + 1);
  const rightArray = array.slice(mid + 1, right + 1);

  let i = 0,
    j = 0,
    k = left;

  while (i < leftArray.length && j < rightArray.length) {
    // Highlight comparison between left and right array elements
    animations.push([[left + i, mid + 1 + j], false]);

    if (leftArray[i] <= rightArray[j]) {
      animations.push([[k, leftArray[i]], true]);
      array[k] = leftArray[i];
      i++;
    } else {
      animations.push([[k, rightArray[j]], true]);
      array[k] = rightArray[j];
      j++;
    }
    k++;
  }

  // Copy remaining elements of leftArray
  while (i < leftArray.length) {
    animations.push([[k, leftArray[i]], true]);
    array[k] = leftArray[i];
    i++;
    k++;
  }

  // Copy remaining elements of rightArray
  while (j < rightArray.length) {
    animations.push([[k, rightArray[j]], true]);
    array[k] = rightArray[j];
    j++;
    k++;
  }
}

function runMergeSort(
  array: number[],
  left: number,
  right: number,
  animations: AnimationArrayType
) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Highlight the current subarray being processed
    animations.push([[left, right], false]);

    runMergeSort(array, left, mid, animations);
    runMergeSort(array, mid + 1, right, animations);
    merge(array, left, mid, right, animations);
  }
}

export function generateMergeSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const auxiliaryArray = array.slice();
  runMergeSort(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
  runAnimation(animations);
}
