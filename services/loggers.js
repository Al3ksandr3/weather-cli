import chalk from "chalk";

import {
  getStringWithoutExtraSpaces,
  createTopOffsetForText,
} from "../utils/functions.js";

// ------ START ------ //

export function printErrorMessage(errorMessage) {
  console.log(createTopOffsetForText(chalk.bgRed(`${errorMessage}`)));
}

////////////////////////////////////////////////////////////

export function printSuccessMessage(successMessage) {
  console.log(createTopOffsetForText(chalk.bgGreen(`${successMessage}`)));
}

////////////////////////////////////////////////////////////

export function printHelpInfo() {
  const rawText = `${chalk.bgCyan(" HELP INFO: ")}

    ${chalk.bgMagenta(" 1. ")} CLI can be accessed using ${chalk.bgBlueBright(
    " weather "
  )} command;
    ${chalk.bgMagenta(" 2. ")} Simply using ${chalk.bgBlueBright(
    " weather "
  )} command returns weather data if the "city" and "token" were set before, otherwise, CLI asks for missing data pieces; 
    ${chalk.bgMagenta(" 3. ")} Arguments list includes:

    ${chalk.bgBlueBright(
      " -h "
    )} stands for "help" and can be used to get the information about arguments list;  
    ${chalk.bgBlueBright(
      " -c "
    )} stands for "city" and can be used to set/change the current city of a user by poviding [CITY_NAME] value (for example: -c Tbilisi); 
    ${chalk.bgBlueBright(
      " -t "
    )} stands for "token" and can be used to set/change the current token of a user by poviding [TOKEN] value (for example: -t aj3hh3ghjjf16r3y); 
    `;

  const rawTextWithoutExtraSpaces = getStringWithoutExtraSpaces(rawText);

  console.log(rawTextWithoutExtraSpaces);
}

////////////////////////////////////////////////////////////

export function printWrongTypeValueForKeyMessage(key) {
  const boldedKey = chalk.bold(`${key}(-${key[0]})`);

  const exampleText = chalk.bold(chalk.italic("-c Tbilisi"));

  console.log(
    createTopOffsetForText(
      chalk.bgYellow(
        `Seems like you have provided ${boldedKey} argument without specifying any meaningful value after it. Please, use the same ${boldedKey} argument followed by some value you want to set for it (for instance: ${exampleText} will set your current city to Tbilisi).`
      )
    )
  );
}

////////////////////////////////////////////////////////////

export function printUnknownKeysMessage(listOfUnknownKeys) {
  const joinedUnknownKeys = listOfUnknownKeys
    .map((unknownKey) => "-" + unknownKey)
    .join("/");

  console.log(
    createTopOffsetForText(
      chalk.bgBlueBright(
        `Seems like you have provided some keys which are unknown for us: ${chalk.bold(
          joinedUnknownKeys
        )}. `
      )
    )
  );
}

// ------ END ------ //
