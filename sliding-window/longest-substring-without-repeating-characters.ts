import { assertEquals } from "@std/assert";

/**
 * Given a string s, find the length of the longest 
substring
 without repeating characters.
*/

function lengthOfLongestSubstring(s: string): number {
    let max = 0;
    const map = new Map<string, number>();
    let left = 0;
    let right = 0;

    while (right < s.length) {
        const char = s[right]

        // if map has it and its to the right of our left pointer
        if (map.has(char) && map.get(char)! >= left) {
            left = map.get(char)! + 1
        }

        max = Math.max(max, (right - left + 1))

        map.set(char, right)
        right++
    }

    return max;
};

Deno.test(function test() {
    assertEquals(lengthOfLongestSubstring("abcabcbb"), 3);
});

Deno.test(function test() {
    assertEquals(lengthOfLongestSubstring("bbbbb"), 1);
});

Deno.test(function test() {
    assertEquals(lengthOfLongestSubstring("pwwkew"), 3);
});

Deno.test(function test() {
    assertEquals(lengthOfLongestSubstring("abba"), 2);
});