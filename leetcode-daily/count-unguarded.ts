import { assertEquals } from "@std/assert";

function countUnguarded(
  m: number,
  n: number,
  guards: number[][],
  walls: number[][],
): number {
  const grid = Array.from({ length: m }, () => Array(n).fill(" "));

  for (const [row, col] of guards) {
    grid[row][col] = "G";
  }

  for (const [row, col] of walls) {
    grid[row][col] = "W";
  }

  const is_oob = (row: number, col: number) => {
    return row < 0 || row >= m || col < 0 || col >= n;
  };

  const dirs = [
    [0, -1], // left
    [0, 1], // right
    [-1, 0], // top
    [1, 0], // bottom
  ];

  // mark guard visibility
  for (const [row, col] of guards) {
    for (const [dx, dy] of dirs) {
      let nrow = row + dx;
      let ncol = col + dy;

      while (
        !is_oob(nrow, ncol) &&
        grid[nrow][ncol] !== "G" &&
        grid[nrow][ncol] !== "W"
      ) {
        grid[nrow][ncol] = "V";
        nrow += dx;
        ncol += dy;
      }
    }
  }

  let count = 0;

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (grid[row][col] === " ") {
        count++;
      }
    }
  }

  return count;
}

Deno.test(function test() {
  assertEquals(
    countUnguarded(
      4,
      6,
      [
        [0, 0],
        [1, 1],
        [2, 3],
      ],
      [
        [0, 1],
        [2, 2],
        [1, 4],
      ],
    ),
    7,
  );
});

Deno.test(function test() {
  assertEquals(
    countUnguarded(
      3,
      3,
      [[1, 1]],
      [
        [0, 1],
        [1, 0],
        [2, 1],
        [1, 2],
      ],
    ),
    4,
  );
});
