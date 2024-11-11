// deno-lint-ignore-file no-inner-declarations
import { assertEquals } from "@std/assert";

// Write an algorithm to determine if a number n is happy.
// A happy number is a number defined by the following process:
// Starting with any positive integer, replace the number by the sum of the squares of its digits.
// Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
// Those numbers for which this process ends in 1 are happy.
// Return true if n is a happy number, and false if not.

{
    function isHappy(n: number): boolean {
        const visited = new Set<number>([]);

        while (!visited.has(n)) {
            visited.add(n);
            const next = n.toString().split("").reduce(
                (acc, curr) => acc + (Math.pow(Number(curr), 2)),
                0,
            );

            if (next === 1) {
                return true;
            }
            n = next;
        }

        return false;
    }

    Deno.test(function test() {
        assertEquals(isHappy(19), true);
    });

    Deno.test(function test() {
        assertEquals(isHappy(2), false);
    });
}

// using pointers - when space is a constraint
{
    function isHappy(n: number): boolean {
        function get_next(num: number): number {
            return num.toString()
                .split('')
                .reduce((acc, curr) => acc + Math.pow(Number(curr), 2), 0)
        }

        let slow = n;
        let fast = n;

        while (n !== 1) {
            slow = get_next(slow);
            fast = get_next(get_next(fast));

            if (fast === 1) {
                return true;
            }

            if (slow === fast) {
                return false;
            }
        }

        return true;
    }

    Deno.test(function test() {
        assertEquals(isHappy(19), true);
    });

    Deno.test(function test() {
        assertEquals(isHappy(2), false);
    });
}
