import { assertEquals } from "@std/assert";

// interface ListNode {
//     val: number
//     next: ListNode | null
// }

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null && fast.next.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;

        if (slow == fast) {
            return true
        }
    }

    return false
};

Deno.test(function test() {
    const three = new ListNode(3)
    const two = new ListNode(2)
    const zero = new ListNode(0)
    const minus_4 = new ListNode(-4)

    three.next = two;
    two.next = zero;
    zero.next = minus_4;
    minus_4.next = two;

    assertEquals(hasCycle(three), true);
});