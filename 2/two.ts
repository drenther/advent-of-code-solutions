export const solution = main;

const fileInput = await Deno.readTextFile(`./2/input.txt`);

type Move = "rock" | "paper" | "scissors";
type FirstColumnMoveCode = "A" | "B" | "C";
type ResultCode = "X" | "Y" | "Z";
type ResultState = "win" | "lose" | "draw";

interface CodeEntry {
  move: Move;
  firstColumnMoveCode: FirstColumnMoveCode;
  score: number;
  win: Move;
  lose: Move;
  draw: Move;
}

const codeMap: Record<Move, CodeEntry> = {
  rock: {
    move: "rock",
    firstColumnMoveCode: "A",
    score: 1,
    win: "scissors",
    lose: "paper",
    draw: "rock",
  },
  paper: {
    move: "paper",
    firstColumnMoveCode: "B",
    score: 2,
    win: "rock",
    lose: "scissors",
    draw: "paper",
  },
  scissors: {
    move: "scissors",
    firstColumnMoveCode: "C",
    score: 3,
    win: "paper",
    lose: "rock",
    draw: "scissors",
  },
} as const;

const firstColumnReverseCodeMap = Object.entries(codeMap).reduce(
  (acc, [_key, value]) => {
    acc[value.firstColumnMoveCode] = value;
    return acc;
  },
  {} as Record<FirstColumnMoveCode, CodeEntry>
);

interface ResultEntry {
  result: ResultState;
  score: number;
  code: ResultCode;
}

const resultMap: Record<ResultState, ResultEntry> = {
  win: {
    result: "win",
    score: 6,
    code: "Z",
  },
  draw: {
    result: "draw",
    score: 3,
    code: "Y",
  },
  lose: {
    result: "lose",
    score: 0,
    code: "X",
  },
} as const;

const codeReverseResultMap = Object.entries(resultMap).reduce(
  (acc, [_key, value]) => {
    acc[value.code] = value;
    return acc;
  },
  {} as Record<ResultCode, ResultEntry>
);

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
        firstColumnReverseCodeMap[firstColumnCode as FirstColumnMoveCode];
      const secondColumn = codeReverseResultMap[secondColumnCode as ResultCode];

      const resultScore = secondColumn.score;

      let neededResult = secondColumn.result;
      if (neededResult === "win") {
        neededResult = "lose";
      } else if (neededResult === "lose") {
        neededResult = "win";
      }
      const move = firstColumn[neededResult];
      const moveScore = codeMap[move].score;

      const totalRoundScore = moveScore + resultScore;

      return scoreSum + totalRoundScore;
    }, 0);
}

console.log(main());
