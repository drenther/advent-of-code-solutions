export const solution = main;

const fileInput = await Deno.readTextFile(`./2015/1/input.txt`);

function main(input: string = fileInput): number {
  let currentFloor = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === "(") {
      currentFloor++;
    } else {
      currentFloor--;
    }

    if (currentFloor === -1) {
      return i + 1;
    }
  }

  return -1;
}

// [`)`, `()())`].forEach((testString) =>
//   console.log(testString, main(testString))
// );

console.log(main());
