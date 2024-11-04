import { assertEquals } from "@std/assert";

class NumArray {
    nums: number[];
    pfArray: number[];

    constructor(nums: number[]) {
        this.nums = nums;
        const pfArray = [nums[0]];

        for (let i = 1; i < nums.length; i++) {
            pfArray.push(pfArray[i - 1] + nums[i]);
        }

        this.pfArray = pfArray;
    }

    sumRange(left: number, right: number): number {
        let sum = this.pfArray[right];

        if (left !== 0) {
            sum -= this.pfArray[left - 1];
        }

        return sum;
    }
}

const num_array = new NumArray([-2, 0, 3, -5, 2, -1]);

Deno.test(function sumRangeTest() {
    assertEquals(num_array.sumRange(0, 2), 1);
});

Deno.test(function sumRangeTest() {
    assertEquals(num_array.sumRange(2, 5), -1);
});

Deno.test(function sumRangeTest() {
    assertEquals(num_array.sumRange(0, 5), -3);
});
