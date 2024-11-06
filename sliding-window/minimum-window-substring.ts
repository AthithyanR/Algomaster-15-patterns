import { assertEquals } from "@std/assert";

/**
Given two strings s and t of lengths m and n respectively, return the minimum window 
substring of s such that every character in t (including duplicates) is included in the window.
If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.
 */

function minWindow(s: string, t: string): string {
    // create & load t_freq
    const t_freq = new Map<string, number>();
    for (const char of t) {
        t_freq.set(char, (t_freq.get(char) ?? 0) + 1)
    }

    // create w_freq
    const w_freq = new Map<string, number>();
    let have = 0;
    const want = t_freq.size;


    let min_l = 0;
    let min_r = s.length; // outside bounds wantedly

    let l = 0;
    for(let r = 0; r < s.length; r++) {
        const char = s[r];
        w_freq.set(char, (w_freq.get(char) ?? 0) + 1)

        if (t_freq.has(char) && w_freq.get(char) === t_freq.get(char)) {
            have++
        }

        while (have === want) {
            if ((r - l + 1) < (min_r - min_l + 1)) {
                min_r = r;
                min_l = l;
            }

            // start popping
            const char = s[l];
            w_freq.set(char, w_freq.get(char)! - 1)
            if (t_freq.has(char) && w_freq.get(char)! < t_freq.get(char)!) {
                have--
            }
            l++
        }
    }

    return (min_r - min_l + 1) > s.length ? '' : s.slice(min_l, min_r + 1);
};

Deno.test(function test() {
    assertEquals(minWindow("ADOBECODEBANC", "ABC"), "BANC");
});


Deno.test(function test() {
    assertEquals(minWindow("a", "a"), "a");
});


Deno.test(function test() {
    assertEquals(minWindow("a", "aa"), "");
});