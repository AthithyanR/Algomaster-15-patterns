// deno-lint-ignore-file no-inner-declarations
import { assertEquals } from "@std/assert";

/**
You are given an integer array height of length n.
There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
Find two lines that together with the x-axis form a container, such that the container contains the most water.
Return the maximum amount of water a container can store.
Notice that you may not slant the container. 
 */

// Brute force
{
    function maxArea(height: number[]): number {
        let max = 0;

        for (let i = 0; i < height.length - 1; i++) {
            for (let j = i+1; j < height.length; j++) {
                const water_possible = Math.min(height[i], height[j]) * (j-i)
                max = Math.max(max, water_possible)
            }
        }

        return max;
    };
    
    Deno.test(function test() {
        assertEquals(maxArea([1,8,6,2,5,4,8,3,7]), 49);
    });
    
    Deno.test(function test() {
        assertEquals(maxArea([1,1]), 1);
    });
    
}

// optimized - two pointer
// two pointer can be used here even though the array is not sorted, here's how
// we start with the left and right pointer, and move the smallest one to the next
// cause we have already calculated the max for the combination, moving can only yield better results
// eg
// [1,8,6,2,5,4,8,3,7]
// L-> 1, R -> 7 (max diff is only 1, coz L can only hold 1, even if we move the right pointer and lets say
// we have 1000 instead of 3, we could still hold only 1 because of L, minimum pointer will only yield minimum results
// so moving that makes the right choice)

{
    function maxArea(height: number[]): number {
        let max = 0
        let left = 0
        let right = height.length - 1

        while (left < right) {
            const min_height = Math.min(height[left], height[right])
            const max_hold = min_height * (right - left)
            max = Math.max(max, max_hold)

            if (height[left] < height[right]) {
                left++
            } else {
                right--
            }
        }

        return max
    };
    
    Deno.test(function test() {
        assertEquals(maxArea([1,8,6,2,5,4,8,3,7]), 49);
    });
    
    Deno.test(function test() {
        assertEquals(maxArea([1,1]), 1);
    });
    
}
