export function getArgs(nodeProcess) {
  const args = nodeProcess.argv;

  const [executor, file, ...restArgs] = args;

  const argsObject = {};

  restArgs.forEach((arg, index, argsArray) => {
    if (arg[0] === "-") {
      if (index === argsArray.length - 1) {
        argsObject[arg.slice(1)] = true;
      } else if (argsArray[index + 1][0] !== "-") {
        argsObject[arg.slice(1)] = argsArray[index + 1];
      } else {
        argsObject[arg.slice(1)] = true;
      }
    }
  });

  return argsObject;
}

////////////////////////////////////////////////////////////

export function getStringWithoutExtraSpaces(text) {
  let stringWithoutExtraSpaces = "";

  for (let character of text) {
    let lastCharacterOfCurrentMasterString =
      stringWithoutExtraSpaces[stringWithoutExtraSpaces.length - 1];

    if (
      character === " " &&
      (lastCharacterOfCurrentMasterString === " " ||
        lastCharacterOfCurrentMasterString === "\n")
    ) {
      continue;
    } else {
      stringWithoutExtraSpaces += character;
    }
  }

  return stringWithoutExtraSpaces;
}

////////////////////////////////////////////////////////////

export function createTopOffsetForText(text) {
  return `\n${text}`;
}
