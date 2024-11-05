import { assertEquals } from "@std/assert";

/**
 * You are given an integer array nums consisting of n elements, and an integer k.
Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value.
Any answer with a calculation error less than 10-5 will be accepted.
*/

function findMaxAverage(nums: number[], k: number): number {
    let max_avg = 0;
    let sum = 0;
    let i = 0;

    // start with k already solved
    while (i < k) {
        sum += nums[i];
        i++;
    }
    max_avg = sum / k;

    // calc the remaining set
    while (i < nums.length) {
        sum -= nums[i-k]; // remove the first el of prev calc
        sum += nums[i]; // add curr
        max_avg = Math.max(max_avg, sum / k);
        i++
    }

    return parseFloat(max_avg.toFixed(5))
};

Deno.test(function test() {
    assertEquals(findMaxAverage([1,12,-5,-6,50,3], 4), 12.75000);
});

Deno.test(function test() {
    assertEquals(findMaxAverage([5], 1), 5.00000);
});
