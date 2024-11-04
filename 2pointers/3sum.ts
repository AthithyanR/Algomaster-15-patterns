import { assertEquals } from "@std/assert";

/**
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
Notice that the solution set must not contain duplicate triplets.
 */

function threeSum(nums: number[]): number[][] {
    // sort ascending
    nums.sort((a, b) => a-b);
    const result: number[][] = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) break; // all positive break
        if (i > 0 && nums[i] === nums[i - 1]) continue; // same as before skip this shit

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                // skip duplicates here as well
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right-1]) right--;

                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
};

Deno.test(function test() {
    assertEquals(threeSum([-1,0,1,2,-1,-4]), [[-1,-1,2],[-1,0,1]]);
});

Deno.test(function test() {
    assertEquals(threeSum([0,1,1]), []);
});

Deno.test(function test() {
    assertEquals(threeSum([0,0,0]), [[0,0,0]]);
});

