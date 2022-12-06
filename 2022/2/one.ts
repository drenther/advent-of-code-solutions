export const solution = main;

const fileInput = await Deno.readTextFile(`./2022/2/input.txt`);

type Move = "rock" | "paper" | "scissors";
type FirstColumnMoveCode = "A" | "B" | "C";
type SecondColumnMoveCode = "X" | "Y" | "Z";
type ResultState = "win" | "lose" | "draw";

interface CodeEntry {
  move: Move;
  firstColumnMoveCode: FirstColumnMoveCode;
  secondColumnMoveCode: SecondColumnMoveCode;
  score: number;
  win: Move;
  lose: Move;
  draw: Move;
}

const codeMap: Record<Move, CodeEntry> = {
  rock: {
    move: "rock",
    firstColumnMoveCode: "A",
    secondColumnMoveCode: "X",
    score: 1,
    win: "scissors",
    lose: "paper",
    draw: "rock",
  },
  paper: {
    move: "paper",
    firstColumnMoveCode: "B",
    secondColumnMoveCode: "Y",
    score: 2,
    win: "rock",
    lose: "scissors",
    draw: "paper",
  },
  scissors: {
    move: "scissors",
    firstColumnMoveCode: "C",
    secondColumnMoveCode: "Z",
    score: 3,
    win: "paper",
    lose: "rock",
    draw: "scissors",
  },
} as const;

const firstColumnReverseMap = Object.entries(codeMap).reduce(
  (acc, [_key, value]) => {
    acc[value.firstColumnMoveCode] = value;
    return acc;
  },
  {} as Record<FirstColumnMoveCode, CodeEntry>
);

const secondColumnReverseMap = Object.entries(codeMap).reduce(
  (acc, [_key, value]) => {
    acc[value.secondColumnMoveCode] = value;
    return acc;
  },
  {} as Record<SecondColumnMoveCode, CodeEntry>
);

interface ResultEntry {
  result: ResultState;
  score: number;
}

const resultMap: Record<ResultState, ResultEntry> = {
  win: {
    result: "win",
    score: 6,
  },
  draw: {
    result: "draw",
    score: 3,
  },
  lose: {
    result: "lose",
    score: 0,
  },
} as const;

function main(input: string = fileInput): number {
  const separatorRegex = /(\n)/;
  const plays = input.split(separatorRegex);

  const separatorRemnant = "\n";

  return plays
    .filter(Boolean)
    .filter((str) => str !== separatorRemnant)
    .map((play) => play.split(" "))
    .reduce((scoreSum, [firstColumnCode, secondColumnCode]) => {
      const firstColumn =
        firstColumnReverseMap[firstColumnCode as FirstColumnMoveCode];
      const secondColumn =
        secondColumnReverseMap[secondColumnCode as SecondColumnMoveCode];

      const moveScore = secondColumn.score;
      let resultScore = 0;
      if (secondColumn.win === firstColumn.move) {
        resultScore = resultMap.win.score;
      } else if (secondColumn.draw === firstColumn.move) {
        resultScore = resultMap.draw.score;
      }

      const totalRoundScore = moveScore + resultScore;

      return scoreSum + totalRoundScore;
    }, 0);
}

console.log(main());
