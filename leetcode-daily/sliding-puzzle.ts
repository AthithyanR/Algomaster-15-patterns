import { assertEquals } from "@std/assert";

/**
  * 1 2 3
  * 4 5 6
 */

function slidingPuzzle(board: number[][]): number {
    const TARGET = "123450";
    const initial = board.flat().join("");

    if (initial === TARGET) return 0;

    const moves = [
        [1, 3], // position 0
        [0, 2, 4], // position 1
        [1, 5], // position 2
        [0, 4], // position 3
        [1, 3, 5], // position 4
        [2, 4] // position 5
    ]

    const queue: [string, number][] = [[initial, 0]];
    const seen = new Set([initial]);

    function swap(str: string, cur_pos: number, new_pos: number) {
        const arr = str.split('');
        [arr[new_pos], arr[cur_pos]] = [arr[cur_pos], arr[new_pos]];
        return arr.join('');
    }

    while (queue.length > 0) {
        const [current, steps] = queue.shift()!;
        const zero_position = current.indexOf('0');

        for (const move of moves[zero_position]) {
            const next_state = swap(current, zero_position, move);

            if (next_state === TARGET) {
                return steps + 1
            }

            if (!seen.has(next_state)) {
                seen.add(next_state);
                queue.push([next_state, steps + 1])
            }
        }
    }

    return -1;
};

Deno.test(function test() {
    assertEquals(slidingPuzzle([[1,2,3],[4,0,5]]), 1);
});

Deno.test(function test() {
    assertEquals(slidingPuzzle([[1,2,3],[5,4,0]]), -1);
});

Deno.test(function test() {
    assertEquals(slidingPuzzle([[4,1,2],[5,0,3]]), 5);
});