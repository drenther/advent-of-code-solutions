export const solution = main;

const fileInput = await Deno.readTextFile(`./3/input.txt`);

function main(input: string = fileInput): number {
  const separatorRegex = /(\n)/;
  const rucksacks = input.split(separatorRegex);

  const separatorRemnant = "\n";

  const normalizedRucksacks = rucksacks
    .filter(Boolean)
    .filter((str) => str !== separatorRemnant);

  return normalizedRucksacks
    .map((rucksack) => ({
      firstCompartment: new Set(rucksack.slice(0, rucksack.length / 2)),
      secondCompartment: new Set(rucksack.slice(rucksack.length / 2)),
    }))
    .map(({ firstCompartment, secondCompartment }) => {
      const commons: string[] = [];
      firstCompartment.forEach((item) => {
        if (secondCompartment.has(item)) {
          commons.push(item);
        }
      });

      return commons.reduce((sum, item) => sum + getPriorityScore(item), 0);
    })
    .reduce((sum, item) => sum + item, 0);
}

function getPriorityScore(char: string) {
  return char.charCodeAt(0) >= 97
    ? char.charCodeAt(0) - 96
    : char.charCodeAt(0) - 38;
}

// const testString = `vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw`;

console.log(main());
