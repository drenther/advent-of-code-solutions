export const solution = main;

const fileInput = await Deno.readTextFile(`./2015/2/input.txt`);

interface Dimensions {
  l: number;
  w: number;
  h: number;
}

function omitFirstMatch(arr: number[], value: number): number[] {
  const index = arr.indexOf(value);

  if (index === -1) {
    return arr;
  }

  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function getRibbonFt({ l, w, h }: Dimensions): number {
  const minSide = Math.min(l, w, h);
  const secondMinSide = Math.min(...omitFirstMatch([l, w, h], minSide));

  return 2 * minSide + 2 * secondMinSide + l * w * h;
}

function main(input: string = fileInput): number {
  const lines = input.split("\n");
  const dimensions = lines.map((line) => {
    const [l, w, h] = line.split("x").map(Number);

    return {
      l,
      w,
      h,
    };
  });

  return dimensions.reduce((total, dimension) => {
    return total + getRibbonFt(dimension);
  }, 0);
}

console.log(main());
