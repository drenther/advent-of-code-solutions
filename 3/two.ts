export const solution = main;

const fileInput = await Deno.readTextFile(`./3/input.txt`);

function main(input: string = fileInput): number {
  const separatorRegex = /(\n)/;
  const rucksacks = input.split(separatorRegex);

  const separatorRemnant = "\n";

  const normalizedRucksacks = rucksacks
    .filter(Boolean)
    .filter((str) => str !== separatorRemnant);

  const groups = normalizedRucksacks.reduce((acc, rucksack, index) => {
    const items = new Set(rucksack);
    if (index % 3 === 0) {
      acc.push([items]);
    } else {
      acc[acc.length - 1].push(items);
    }
    return acc;
  }, [] as Set<string>[][]);

  return groups
    .map((group) => {
      const commons: string[] = [];
      group[0].forEach((item) => {
        if (group[1].has(item) && group[2].has(item)) {
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
