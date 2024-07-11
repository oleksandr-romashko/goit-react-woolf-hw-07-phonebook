/**
 * Immutably sorts array in ascending order or returns empty array.
 * @param {object[]} arr Array to sort. 
 * @returns {object[]} Sorted array.
 */
export function sortAsc(arr) {
  if (!arr.length) {
    return [];
  }
  return arr.toSorted((a, b) => {
    const lowercaseA = a.name.toLowerCase();
    const lowercaseB = b.name.toLowerCase();
    if (lowercaseA < lowercaseB) {
      return -1;
    } else if (lowercaseA > lowercaseB) {
      return 1;
    } else {
      return 0; 
    }
  })
}