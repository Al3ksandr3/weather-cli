#!/usr/bin/env node

import chalk from "chalk";

import { getArgs } from "./utils/extractors.js";

import {
  WRONG_DATA_TYPE,
  NO_ARGUMENTS_PASSED,
  CANNOT_SAVE_VALUE_FOR_KEY,
  STORAGE_FILE_CORRUPTED,
} from "./utils/constants.js";

import {
  printErrorMessage,
  printHelpInfo,
  printSuccessMessage,
  printWrongTypeValueForKeyMessage,
  printUnknownKeysMessage,
} from "./services/loggers.js";

import { mapKeyToValueAndSave } from "./services/storage.js";

import { validateValueForKeyByDataTypeOrThrow } from "./services/validators.js";

// ------ START ------ //

async function validateValueForKeyAndInitializeSavingProcess(
  valueToValidateByDataType,
  desiredDataType,
  key,
  keyShorthand
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
      `value for ${chalk.bold(key)} field was successfully set/modified!`
    );
  } catch (error) {
    // STEP II.2 - if validation or saving process fails, handle errors;
    if (error.message === WRONG_DATA_TYPE) {
      printWrongTypeValueForKeyMessage(key, keyShorthand);
    }

    if (error.message === CANNOT_SAVE_VALUE_FOR_KEY) {
      printErrorMessage(
        `value for ${chalk.bold(`${key}(${keyShorthand})`)} can not be set!`
      );
    }

    if (error.message === STORAGE_FILE_CORRUPTED) {
      printErrorMessage(
        "seems like storage file is corrupted. Please, fix it manually or override with the new data using CLI."
      );
    }
  }
}

////////////////////////////////////////////////////////////

// ------ CLI ENTRY POINT ------ //

async function startCLI() {
  const knownKeys = ["h", "c", "ak"]; // h - help, c - city, ak - API key

  const argsObject = getArgs(process);

  if (argsObject === NO_ARGUMENTS_PASSED) {
    // implement weather displaying logic;
  }

  if (argsObject.h) {
    printHelpInfo();
  }

  if (argsObject.c) {
    await validateValueForKeyAndInitializeSavingProcess(
      argsObject.c,
      "string",
      "city",
      "-c"
    );
  }

  if (argsObject.ak) {
    await validateValueForKeyAndInitializeSavingProcess(
      argsObject.ak,
      "string",
      "apiKey",
      "-ak"
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
