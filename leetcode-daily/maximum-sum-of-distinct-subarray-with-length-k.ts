import { assertEquals } from "@std/assert";

function maximumSubarraySum(nums: number[], k: number): number {
    const n = nums.length;
    const pf = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        pf[i + 1] = pf[i] + nums[i]
    }

    const occurence_map = new Map<number, number>();
    let sum = 0;
    let l = 0;
    let r = 0;

    while (l <= r && r < n) {
        const value = nums[r];
        const curr_length = r - l + 1;

        // if there is a duplicate shrink
        if (occurence_map.has(value) && occurence_map.get(value)! >= l) {
            l = occurence_map.get(value)! + 1
        // if we are good on the length, keep the window sliiiiiiding
        } else if (curr_length === k) {
            sum = Math.max(sum, pf[r+1] - pf[l])
            l++
        }

        occurence_map.set(value, r);
        r++
    }

    return sum;
};

// Example 1:
// Input: nums = [1,5,4,2,9,9,9], k = 3
// Output: 15
// Explanation: The subarrays of nums with length 3 are:
// - [1,5,4] which meets the requirements and has a sum of 10.
// - [5,4,2] which meets the requirements and has a sum of 11.
// - [4,2,9] which meets the requirements and has a sum of 15.
// - [2,9,9] which does not meet the requirements because the element 9 is repeated.
// - [9,9,9] which does not meet the requirements because the element 9 is repeated.
// We return 15 because it is the maximum subarray sum of all the subarrays that meet the conditions


// Example 2:
// Input: nums = [4,4,4], k = 3
// Output: 0
// Explanation: The subarrays of nums with length 3 are:
// - [4,4,4] which does not meet the requirements because the element 4 is repeated.
// We return 0 because no subarrays meet the conditions.

Deno.test(function test() {
    assertEquals(maximumSubarraySum([1,5,4,2,9,9,9], 3), 15);
});

Deno.test(function test() {
    assertEquals(maximumSubarraySum([4,4,4], 3), 0);
});
