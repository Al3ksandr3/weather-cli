import chalk from "chalk";

import {
  WRONG_DATA_TYPE,
  CANNOT_SAVE_VALUE_FOR_KEY,
  UNKNOWN_ERROR,
  USER_ACCEPTED_CORRUPTED_STORAGE_FILE,
  STORAGE_FILE_DOES_NOT_EXIST,
  VALUE_IS_NOT_SET_FOR_KEY,
} from "../utils/constants.js";

import {
  printWrongTypeValueForKeyMessage,
  printErrorMessage,
  printWarningMessage,
} from "./loggers.js";

// ------ START ------ //

export function handleErrorsForValidationAndSave(error, key, keyShorthand) {
  if (error.message === WRONG_DATA_TYPE) {
    printWrongTypeValueForKeyMessage(key, keyShorthand);
    return;
  }

  if (error.message === CANNOT_SAVE_VALUE_FOR_KEY) {
    const styledKey = chalk.bold(`${key}(${keyShorthand})`);

    printErrorMessage(`value for ${styledKey} can not be set!`);
    return;
  }

  if (error.message === USER_ACCEPTED_CORRUPTED_STORAGE_FILE) {
    printWarningMessage(
      "overwrite of corrupted storage file was denied. Please, fix the storage file manually so that CLI can work properly in the future."
    );
    return;
  }

  // UNKNOWN_ERRORs are errors that might be thrown in some distinct cases which I am aware of

  if (error.message === UNKNOWN_ERROR) {
    const styledEmailAddress = chalk.bold(
      chalk.italic("weatherCLIDemoInfo@gmail.com")
    );

    printErrorMessage(
      `seems there is an unknown error. Please, report an action that led to it to the following email ${styledEmailAddress}.`
    );
    return;
  }

  // in case some really weird error occurs in a situation that I have not properly handler, that "if" clause below will just print its message

  if (error.message) {
    printErrorMessage(error.message);
  }
}

////////////////////////////////////////////////////////////

export function handleErrorsForValueRetrievalByKeyFromStorage(
  error,
  key,
  keyShorthand
) {
  if (error.message === STORAGE_FILE_DOES_NOT_EXIST) {
    printErrorMessage(
      `seems like storage file with information about your city and API key for weather service doesn't exist. Therefore, weather information for your current location can't be fetched. Please, set the respective values or get information by using ${chalk.bold(
        "weather -h"
      )}`
    );
    return;
  }

  if (error.message === USER_ACCEPTED_CORRUPTED_STORAGE_FILE) {
    printWarningMessage(
      "overwrite of corrupted storage file was denied. Please, fix the storage file manually so that CLI can work properly in the future."
    );
    return;
  }

  if (error.message === VALUE_IS_NOT_SET_FOR_KEY) {
    const styledKey = chalk.bold(`${key}(${keyShorthand})`);

    printErrorMessage(
      `seems like there is no value set for the ${styledKey} argument.`
    );
    return;
  }

  // UNKNOWN_ERRORs are errors that might be thrown in some distinct cases which I am aware of

  if (error.message === UNKNOWN_ERROR) {
    const styledEmailAddress = chalk.bold(
      chalk.italic("weatherCLIDemoInfo@gmail.com")
    );

    printErrorMessage(
      `seems there is an unknown error. Please, report an action that led to it to the following email ${styledEmailAddress}.`
    );
    return;
  }

  // in case some really weird error occurs in a situation that I have not properly handler, that "if" clause below will just print its message

  if (error.message) {
    printErrorMessage(error.message);
  }
}

// ------ END ------ //

// const city = await accessDataByKeyOrHandleErrors("city");
//     const apiKey = await accessDataByKeyOrHandleErrors("apiKey");

//     const cityBolded = chalk.bold("city");
//     const apiKeyBolded = chalk.bold("API key");

//     if (!city && !apiKey) {
//       printErrorMessage(
//         `seems there is no value set for ${cityBolded} and ${apiKeyBolded}. Please, provide both - ${cityBolded} and ${chalk.bold(
//           "API key"
//         )}.`
//       );
//     }
