import { getStringWithoutExtraSpaces } from "../utils/utils.js";
import chalk from "chalk";

// ------ START ------ //

export function printErrorMessage(errorMessage) {}

////////////////////////////////////////////////////////////

export function printSuccessMessage(successMessage) {}

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

export function printMissingValueForArgumentMessage(argument) {
  console.log(
    getStringWithoutExtraSpaces(`Seems like you have provided "${argument}" argument without specifying the value after it. 
    Please, use the same "${argument}" argument followed by the value you want to set for it.`)
  );
}

// ------ END ------ //
