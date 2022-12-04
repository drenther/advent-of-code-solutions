export const solution = main;

const fileInput = await Deno.readTextFile(`./4/input.txt`);

function main(input: string = fileInput): number {
  const separatorRegex = /(\n)/;
  const list = input.split(separatorRegex);

  const separatorRemnant = "\n";

  const normalizedList = list
    .filter(Boolean)
    .filter((str) => str !== separatorRemnant);

  const pairings = normalizedList.map((pairs) => {
    const pairSeparator = ",";
    const pairTuple = pairs.split(pairSeparator);

    const [leftMin, leftMax] = pairTuple[0].split("-").map(Number);
    const [rightMin, rightMax] = pairTuple[1].split("-").map(Number);

    return {
      left: {
        min: leftMin,
        max: leftMax,
      },
      right: {
        min: rightMin,
        max: rightMax,
      },
    };
  });

  return pairings.reduce((count, { left, right }) => {
    if (
      (left.min >= right.min && left.min <= right.max) ||
      (right.min >= left.min && right.min <= left.max)
    ) {
      return count + 1;
    }

    return count;
  }, 0);
}

// const testString = `2-4,6-8
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7
// 6-6,4-6
// 2-6,4-8`;

console.log(main());
