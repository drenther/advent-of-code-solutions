export const solution = main;

const fileInput = await Deno.readTextFile(`./2015/1/input.txt`);

function main(input: string = fileInput): number {
  const moves = input.split("");
  const upMoves = moves.filter((move) => move === "(").length;
  const downMoves = moves.filter((move) => move === ")").length;

  return upMoves - downMoves;
}

// [
//   `(())`,
//   `()()`,
//   `(((`,
//   `(()(()(`,
//   `))(((((`,
//   `())`,
//   `))(`,
//   `)))`,
//   `)())())`,
// ].forEach((testString) => console.log(testString, main(testString)));

console.log(main());
