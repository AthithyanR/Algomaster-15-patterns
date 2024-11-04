// deno-lint-ignore-file no-inner-declarations
import { assertEquals } from "@std/assert";

/**
    Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.
 */

// brute force
{
    function findMaxLength(nums: number[]): number {
        let max_length = 0;

        for (let i = 0; i < nums.length; i++) {
            let curr_length = 0;

            let zero_count = 0;
            let one_count = 0;
            for (let j = i; j < nums.length; j++) {
                if (nums[j] === 0) {
                    zero_count += 1;
                } else {
                    one_count += 1;
                }

                if (zero_count === one_count) {
                    curr_length = zero_count + one_count;
                }
            }

            if (curr_length > max_length) {
                max_length = curr_length;
            }
        }

        return max_length;
    }

    Deno.test(function findMaxLengthTest() {
        assertEquals(findMaxLength([0, 1]), 2);
    });

    Deno.test(function findMaxLengthTest() {
        assertEquals(findMaxLength([0, 1, 0]), 2);
    });

    Deno.test(function findMaxLengthTest() {
        assertEquals(findMaxLength([0, 1, 1, 0, 0, 0]), 4); // 0 1 1 0 or 1 1 0 0
    });

    Deno.test(function findMaxLengthTest() {
        assertEquals(findMaxLength([0, 0, 0, 0, 1, 1]), 4); // 0 0 1 1
    });

    Deno.test(function findMaxLengthTest() {
        assertEquals(findMaxLength([0, 1, 0, 1, 0, 1]), 6); // 0 1 0 1 0 1
    });
}

/* using prefixSum & hashmap
idea is that we loop through the array once
every element stores its failure (i.e) the difference it was unable to solve inorder to balance
as we go for each element we check if someone already has my failure,
if there are, then its next element to me are balanced
*/
{
    function findMaxLength(nums: number[]): number {
        // Map<sum, index>
        const map = new Map<number, number>([[0, -1]]);
        let sum = 0;
        let max_length = 0;
        for (let i = 0; i < nums.length; i++) {
            sum = nums[i] === 0 ? sum - 1 : sum + 1;
            
            if (map.has(sum)) {
                max_length = Math.max(max_length, i - map.get(sum)!);
            } else {
                map.set(sum, i);
            }
        }

        return max_length;
    }

    Deno.test(function findMaxLengthTest() {
        assertEquals(findMaxLength([0, 1]), 2);
    });

    Deno.test(function findMaxLengthTest() {
        assertEquals(findMaxLength([0, 1, 0]), 2);
    });

    Deno.test(function findMaxLengthTest() {
        assertEquals(findMaxLength([0, 1, 1, 0, 0, 0]), 4); // 0 1 1 0 or 1 1 0 0
    });

    Deno.test(function findMaxLengthTest() {
        assertEquals(findMaxLength([0, 0, 0, 0, 1, 1]), 4); // 0 0 1 1
    });

    Deno.test(function findMaxLengthTest() {
        assertEquals(findMaxLength([0, 1, 0, 1, 0, 1]), 6); // 0 1 0 1 0 1
    });
}
