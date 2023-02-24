import chalk from "chalk";

import {
  getTextWithoutExtraSpaces,
  createTopOffsetForText,
} from "../utils/transformers.js";

// ------ START ------ //

export function printErrorMessage(errorMessage) {
  const errorMessagePrefix = chalk.bold("ERROR:");

  const styledErrorMessage = chalk.bgRed(
    `${errorMessagePrefix} ${errorMessage}`
  );

  const styledErrorMessageWithOffset =
    createTopOffsetForText(styledErrorMessage);

  console.log(styledErrorMessageWithOffset);
}

////////////////////////////////////////////////////////////

export function printSuccessMessage(successMessage) {
  const successMessagePrefix = chalk.bold("SUCCESS:");

  const styledSuccessMessage = chalk.bgGreen(
    `${successMessagePrefix} ${successMessage}`
  );

  const styledSuccessMessageWithOffset =
    createTopOffsetForText(styledSuccessMessage);

  console.log(styledSuccessMessageWithOffset);
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

  const rawTextWithoutExtraSpaces = getTextWithoutExtraSpaces(rawText);

  console.log(rawTextWithoutExtraSpaces);
}

////////////////////////////////////////////////////////////

export function printWrongTypeValueForKeyMessage(key, keyShorthand) {
  const wrongTypeMessagePrefix = chalk.bold("WARNING:");

  const styledKey = chalk.bold(`${key}(${keyShorthand})`);

  const styledExample = chalk.bold(chalk.italic("-c Tbilisi"));

  const styledWrongTypeMessage = chalk.bgYellow(
    `${wrongTypeMessagePrefix} seems like you have provided ${styledKey} argument without specifying any meaningful value after it. Please, use the same ${styledKey} argument followed by some value you want to set for it (for instance: ${styledExample} will set your current city to Tbilisi).`
  );

  const styledWrongTypeMessageWithOffset = createTopOffsetForText(
    styledWrongTypeMessage
  );

  console.log(styledWrongTypeMessageWithOffset);
}

////////////////////////////////////////////////////////////

export function printUnknownKeysMessage(listOfUnknownKeys) {
  const unknownKeysMessagePrefix = chalk.bold("ATTENTION:");

  const unknownKeys = chalk.bold(
    listOfUnknownKeys.map((unknownKey) => "-" + unknownKey).join("/")
  );

  const styledUnknownKeysMessage = chalk.bgBlueBright(
    `${unknownKeysMessagePrefix} seems like you have provided some keys which are unknown for us: ${unknownKeys}.`
  );

  const styledUnknownKeysMessageWithOffset = createTopOffsetForText(
    styledUnknownKeysMessage
  );

  console.log(styledUnknownKeysMessageWithOffset);
}

// ------ END ------ //
