export const solution = main;

const fileInput = await Deno.readTextFile(`./2015/3/input.txt`);

interface Coord {
  x: number;
  y: number;
}

type Direction = "^" | ">" | "v" | "<";

const directionMap: Record<
  Direction,
  { key: Direction; action: (coord: Coord) => Coord }
> = {
  "^": {
    key: "^",
    action: (coord) => {
      return {
        ...coord,
        y: coord.y + 1,
      };
    },
  },
  ">": {
    key: ">",
    action: (coord) => {
      return {
        ...coord,
        x: coord.x + 1,
      };
    },
  },
  v: {
    key: "v",
    action: (coord) => {
      return {
        ...coord,
        y: coord.y - 1,
      };
    },
  },
  "<": {
    key: "<",
    action: (coord) => {
      return {
        ...coord,
        x: coord.x - 1,
      };
    },
  },
} as const;

function main(input: string = fileInput): number {
  const directions = input.split("");

  const giftCountMap: Record<string, number> = {
    "0,0": 1,
  };

  for (
    let i = 0,
      currentCord: Coord = {
        x: 0,
        y: 0,
      };
    i < directions.length;
    i++
  ) {
    const direction = directions[i] as Direction;
    currentCord = directionMap[direction].action(currentCord);
    if (!giftCountMap[`${currentCord.x},${currentCord.y}`]) {
      giftCountMap[`${currentCord.x},${currentCord.y}`] = 0;
    }
    giftCountMap[`${currentCord.x},${currentCord.y}`] += 1;
  }

  return Object.values(giftCountMap).length;
}

console.log(main());
