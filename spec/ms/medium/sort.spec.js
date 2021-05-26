import { quickSort, quickSort2, mergeSort, HeapSort } from '../../../src/ms/medium/sort';

describe('quickSort', () => {
    let arr = [3,6,1,7,3,4,6,9];
    beforeEach(() => {
        arr = [3,6,1,7,3,4,6,9];
    });

    // test("quickSort", () => {
    //     expect(quickSort(arr)).toEqual([1,3,3,4,6,6,7,9]);
    // });
    // test("quickSort", () => {
    //     expect(quickSort([6, 5, 2, 7, 3, 9, 8, 4, 10, 1])).toEqual([1,2,3,4,5,6,7,8,9,10]);
    // });
    // test("quickSort2", () => {
    //     expect(quickSort2(arr)).toEqual([1,3,3,4,6,6,7,9]);
    // });
    // test("mergeSort", () => {
    //     expect(mergeSort(arr)).toEqual([1,3,3,4,6,6,7,9]);
    // });
    test("HeapSort", () => {
        expect(HeapSort(arr)).toEqual([1,3,3,4,6,6,7,9]);
    });
});