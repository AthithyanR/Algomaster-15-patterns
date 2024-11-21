import { assertEquals } from "@std/assert";

// You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.
// Return the size of the largest island in grid after applying this operation.
// An island is a 4-directionally connected group of 1s.

// Example 1:
// Input: grid = [[1,0],[0,1]]
// Output: 3
// Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
// Example 2:
// Input: grid = [[1,1],[1,0]]
// Output: 4
// Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
// Example 3:
// Input: grid = [[1,1],[1,1]]
// Output: 4
// Explanation: Can't change any 0 to 1, only one island with area = 4.

function largestIsland(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [0, -1], // left
    [0, 1], // right
    [-1, 0], // top
    [1, 0], // bottom
  ];

  // construct group map
  const dfs = (i: number, j: number, group_index: number) => {
    let count = 1;
    grid[i][j] = group_index;

    for (const direction of directions) {
      const new_i = i + direction[0];
      const new_j = j + direction[1];

      // check for OOB
      if (new_i < 0 || new_i >= rows || new_j < 0 || new_j >= cols) {
        continue;
      }

      if (grid[new_i][new_j] === 1) {
        count += dfs(new_i, new_j, group_index);
      }
    }

    return count;
  };

  const island_map = new Map<number, number>();
  let group_index = 2;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        island_map.set(group_index, dfs(i, j, group_index));
        group_index++;
      }
    }
  }

  // console.debug(island_map, 'island_map')

  // min largest would atleast be the max existing in the given grid
  let largest_island = 0;
  for (const [_group_index, count] of island_map) {
    largest_island = Math.max(largest_island, count);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 0) {
        let count = 1;

        const visited = new Set<number>();
        for (const direction of directions) {
          const new_i = i + direction[0];
          const new_j = j + direction[1];

          // check for OOB
          if (new_i < 0 || new_i >= rows || new_j < 0 || new_j >= cols) {
            continue;
          }

          const collected_group_index = grid[new_i][new_j];

          if (
            collected_group_index > 1 &&
            !visited.has(collected_group_index)
          ) {
            count += island_map.get(collected_group_index)!;
          }

          visited.add(collected_group_index);
        }

        largest_island = Math.max(largest_island, count);
      }
    }
  }

  return largest_island;
}

Deno.test(function test() {
  assertEquals(
    largestIsland([
      [1, 0],
      [0, 1],
    ]),
    3,
  );
});
Deno.test(function test() {
  assertEquals(
    largestIsland([
      [1, 1],
      [1, 0],
    ]),
    4,
  );
});
Deno.test(function test() {
  assertEquals(
    largestIsland([
      [1, 1],
      [1, 1],
    ]),
    4,
  );
});
Deno.test(function test() {
  assertEquals(
    largestIsland([
      [0, 0],
      [0, 0],
    ]),
    1,
  );
});
Deno.test(function test() {
  assertEquals(
    largestIsland([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 1, 0, 0],
      [1, 0, 1, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 0],
    ]),
    18,
  );
});
