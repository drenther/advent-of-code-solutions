export const solution = main;

const fileInput = await Deno.readTextFile(`./2022/6/input.txt`);

const uniqueSequenceLength = 14;
function main(input: string = fileInput): number {
  let buffer = "";
  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    buffer += char;

    const uniqueCharsInBuffer = new Set(buffer);
    if (uniqueCharsInBuffer.size === uniqueSequenceLength) {
      return i + 1;
    }
    if (buffer.length === uniqueSequenceLength) {
      buffer = buffer.slice(1);
    }
  }

  return -1;
}

// [
//   `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
//   `bvwbjplbgvbhsrlpgdmjqwftvncz`,
//   `nppdvjthqldpwncqszvftbrmjlhg`,
//   `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
//   `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
// ].forEach((testString) => console.log(testString, main(testString)));

console.log(main());
