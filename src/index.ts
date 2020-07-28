import reader from './utils/reader';

interface ProfilingStructure {
  version: number;
  dataForRoots: {
    commitData: {
      changeDescriptions: any[];
      duration: number;
      fiberActualDurations: any[];
      fiberSelfDurations: any[];
      interactionIDs: any[];
      priorityLevel: string;
      timestamp: number;
    }[];
  }[];
}

interface Parse {
  allCommitsDuration: number[];
}

async function parse(url): Promise<Parse> {
  try {
    const inputData = await reader(url);

    const parsedInput: ProfilingStructure = JSON.parse(inputData);

    const allCommitsDuration: number[] = parsedInput.dataForRoots[0].commitData.map(
      (commit) => commit.duration,
    );

    return { allCommitsDuration };
  } catch (err) {
    console.log({ err });
  }
}

async function run(url) {
  const result = await parse(url);
  const { allCommitsDuration } = result;

  const totalDuration = allCommitsDuration.reduce((acc, val) => {
    acc = acc + val;
    return acc;
  });

  console.log({ length: allCommitsDuration.length, totalDuration });
}

run('../../input/profiling-data.27-07-2020.13-29-01.json');
