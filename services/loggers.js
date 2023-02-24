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
  const helpInfoPrefix = chalk.bgCyan(chalk.bold("HELP INFO:"));

  const styledStuff = {
    dot: chalk.yellowBright(chalk.bold("•")),
    weather: chalk.greenBright(chalk.bold("weather")),
    hArg: chalk.magentaBright(chalk.bold("-h")),
    cArg: chalk.magentaBright(chalk.bold("-c")),
    akArg: chalk.magentaBright(chalk.bold("-ak")),
    help: chalk.blue(chalk.italic("help")),
    city: chalk.blue(chalk.italic("city")),
    apiKey: chalk.blue(chalk.italic("API key")),
    cityExampleText: chalk.yellowBright(chalk.italic("-c Tbilisi")),
    apiKeyExampleText: chalk.yellowBright(chalk.italic("-t aj3hh3ghjjf16r3y")),
  };

  const styledHelpInfo = getTextWithoutExtraSpaces(`${helpInfoPrefix}

  ${styledStuff.dot} CLI can be accessed and provided arguments with by using ${styledStuff.weather} command;
  ${styledStuff.dot} Simply using ${styledStuff.weather} command returns weather data if the ${styledStuff.city} and ${styledStuff.apiKey} were set before, otherwise, CLI asks for missing data pieces; 
   
  ${styledStuff.hArg} - stands for ${styledStuff.help} and can be used to get the information about possible arguments list that can be processed by CLI;  
  ${styledStuff.cArg} - stands for ${styledStuff.city} and can be used to set/change city of a user (for example: ${styledStuff.cityExampleText}); 
  ${styledStuff.akArg} - stands for ${styledStuff.apiKey} and can be used to set/change API key of a user (for example: ${styledStuff.apiKeyExampleText}); 
    `);

  const styledDelpInfoWithOffset = createTopOffsetForText(styledHelpInfo);

  console.log(styledDelpInfoWithOffset);
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
