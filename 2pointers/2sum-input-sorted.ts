import { assertEquals } from "@std/assert";

// Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order,
// find two numbers such that they add up to a specific target number.
// Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.
// Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
// The tests are generated such that there is exactly one solution. You may not use the same element twice.
// Your solution must use only constant extra space.

function twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            break;
        } else if (sum < target) {
            left += 1;
        } else {
            right -= 1;
        }
    }

    return [left + 1, right + 1]
};

Deno.test(function test() {
    assertEquals(twoSum([2,7,11,15], 9), [1, 2]);
});


Deno.test(function test() {
    assertEquals(twoSum([2,3,4], 6), [1, 3]);
});


Deno.test(function test() {
    assertEquals(twoSum([-1,0], -1), [1, 2]);
});