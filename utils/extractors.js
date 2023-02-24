import { NO_ARGUMENTS_PASSED } from "./constants.js";

// ------ START ------ //

export function getArgs(nodeProcess) {
  const args = nodeProcess.argv;

  const [executor, file, ...restArgs] = args;

  if (restArgs.length === 0) {
    return NO_ARGUMENTS_PASSED;
  }

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

// ------ END ------ //
