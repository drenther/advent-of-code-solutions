export const solution = main;

const fileInput = await Deno.readTextFile(`./5/input.txt`);

interface Stack {
  readonly items: string[];
  readonly size: number;
  push: (...items: string[]) => number;
  pop: (count?: number) => string[];
  readonly last: string | undefined;
}

interface Move {
  from: number;
  to: number;
  count: number;
}

const printStacks = (stacks: Stack[]): void => {
  console.log("\n------------------\n");
  const maxStackSize = Math.max(...stacks.map((stack) => stack.size));
  let formattedStacks = ``;
  for (let i = 0; i < maxStackSize; i++) {
    for (let j = 0; j < stacks.length; j++) {
      const stack = stacks[j];
      const item = stack.items[maxStackSize - (i + 1)];
      const paddedItem = item ? ` [${item}] ` : "     ";
      formattedStacks += paddedItem;
    }
    formattedStacks += "\n";
  }
  stacks.forEach((_, index) => {
    formattedStacks += `  ${index + 1}  `;
  });
  console.log(formattedStacks, "\n------------------\n");
};

const createStack = (initialItems: string[]): Stack => {
  const _items = initialItems.filter(Boolean);
  return {
    get items() {
      return _items;
    },
    get size() {
      return _items.length;
    },
    push: (...items) => _items.push(...items),
    pop: (count = 1) => _items.splice(-count, count),
    get last() {
      return _items[_items.length - 1];
    },
  };
};

const executeMove = (stacks: Stack[], move: Move): void => {
  const from = stacks[move.from - 1];
  const popped = from.pop(move.count);
  const to = stacks[move.to - 1];
  to.push(...popped);
};

function main(input: string = fileInput): string {
  const separatorRegex = /(\n\n)/;
  const splitInput = input.split(separatorRegex);

  const separatorRemnant = "\n\n";

  const normalizedInput = splitInput
    .filter(Boolean)
    .filter((str) => str !== separatorRemnant);

  const initialArrangement = normalizedInput[0];
  const lines = initialArrangement.split("\n");

  const content = lines.slice(0, -1).map((line) =>
    line
      .split("")
      .reduce((acc, char, index) => {
        if (index % 4 === 0) {
          acc.push(char);
        } else {
          acc[acc.length - 1] = acc[acc.length - 1] + char;
        }
        return acc;
      }, [] as string[])
      .map((str) => {
        const trimmedStr = str.trim();
        return trimmedStr.slice(1, -1);
      })
  );
  const stacks = content
    .reduce((acc, row, index) => {
      if (index === 0) {
        return row.map((item) => [item]);
      }
      row.forEach((item, innerIndex) => {
        acc[innerIndex].unshift(item);
      });

      return acc;
    }, [] as string[][])
    .map((flippedRows) => createStack(flippedRows));

  const moveCommands = normalizedInput[1].split("\n");
  const normalizedMoves = moveCommands.map((line) => {
    const [_1, count, _2, from, _3, to] = line.split(" ");
    return {
      from: Number(from),
      to: Number(to),
      count: Number(count),
    };
  });

  console.log({ moveCommands, normalizedMoves });

  printStacks(stacks);

  normalizedMoves.forEach((move) => {
    console.log("move", move);
    executeMove(stacks, move);
    printStacks(stacks);
  });

  return stacks.map((stack) => stack.last).join("");
}

const _testString = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

console.log(main());
