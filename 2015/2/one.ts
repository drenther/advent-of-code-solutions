export const solution = main;

const fileInput = await Deno.readTextFile(`./2015/2/input.txt`);

interface Dimensions {
  l: number;
  w: number;
  h: number;
}

function getPresentWrapSqFt({ l, w, h }: Dimensions): number {
  const lw = l * w;
  const wh = w * h;
  const hl = h * l;

  const slack = Math.min(lw, wh, hl);

  return 2 * lw + 2 * wh + 2 * hl + slack;
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
    return total + getPresentWrapSqFt(dimension);
  }, 0);
}

console.log(main());
