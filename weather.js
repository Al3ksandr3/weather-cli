#!/usr/bin/env node

import chalk from "chalk";

import { getArgs } from "./utils/functions.js";
import { WRONG_DATA_TYPE } from "./utils/constants.js";

import {
  printErrorMessage,
  printSuccessMessage,
  printHelpInfo,
  printWrongTypeValueForKeyMessage,
  printUnknownKeysMessage,
} from "./services/loggers.js";

import { mapKeyToValueAndSave } from "./services/storage.js";

import { validateValueForKeyByDataTypeOrThrow } from "./services/validators.js";

// ------ START ------ //

async function validateValueForKeyAndInitializeSavingProcess(
  valueToValidateByDataType,
  desiredDataType,
  key
) {
  try {
    // STEP I - validate data provided for key;
    validateValueForKeyByDataTypeOrThrow(
      valueToValidateByDataType,
      desiredDataType
    );

    // STEP II.1 - if validation succeeds proceed with saving provided data;
    await mapKeyToValueAndSave(key, valueToValidateByDataType);

    // STEP III - if saving process completes successfully, print success message;
    printSuccessMessage(
      `Value for ${chalk.bold(key)} field was successfully set/modified!`
    );
  } catch (error) {
    // STEP II.2 - if validation or saving process fails, handle errors;
    if (error.message === WRONG_DATA_TYPE) {
      printWrongTypeValueForKeyMessage(key);
    }
  }
}

////////////////////////////////////////////////////////////

// ------ CLI ENTRY POINT ------ //

async function startCLI() {
  const knownKeys = ["h", "c", "t"];

  const argsObject = getArgs(process);

  if (argsObject.h) {
    printHelpInfo();
  }

  if (argsObject.c) {
    await validateValueForKeyAndInitializeSavingProcess(
      argsObject.c,
      "string",
      "city"
    );
  }

  if (argsObject.t) {
    await validateValueForKeyAndInitializeSavingProcess(
      argsObject.t,
      "string",
      "token"
    );
  }

  const argsObjectKeys = Object.keys(argsObject);

  const listOfUnknownKeys = argsObjectKeys.filter(
    (key) => knownKeys.includes(key) === false
  );

  if (listOfUnknownKeys.length !== 0) {
    printUnknownKeysMessage(listOfUnknownKeys);
  }
}

startCLI();

// ------ END ------ //
