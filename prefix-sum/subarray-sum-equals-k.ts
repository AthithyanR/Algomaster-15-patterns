import { assertEquals } from "@std/assert";

/**
Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
A subarray is a contiguous non-empty sequence of elements within an array.
 */

function subarraySum(nums: number[], k: number): number {
    let count = 0;
    let sum = 0;

    // Map<curr_sum, occurence>, start with default for case when sum === k
    const prefix_map = new Map<number, number>([[sum, 1]]);

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];

        // increase count if possible
        const existing = prefix_map.get(sum - k);
        if (existing) {
            count += existing;
        }

        // increase map count
        prefix_map.set(sum, (prefix_map.get(sum) ?? 0) + 1)
    }

    return count;
};

Deno.test(function test() {
    assertEquals(subarraySum([1, 1, 1], 2), 2);
});


Deno.test(function test() {
    assertEquals(subarraySum([1, 2, 3], 3), 2);
});
