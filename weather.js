#!/usr/bin/env node

import chalk from "chalk";

import { getArgs } from "./utils/extractors.js";

import {
  NO_ARGUMENTS_PASSED,
  CORRUPTED_STORAGE_FILE,
} from "./utils/constants.js";

import {
  printErrorMessage,
  printHelpInfo,
  checkForUnknownKeysPassedAndPrintIfRequired,
} from "./services/loggers.js";

import { retrieveDataFromStorageByKey } from "./services/storage.js";
import { validateValueForKeyAndInitializeSavingProcess } from "./services/validators.js";

// ------ START ------ //

async function accessDataByKeyOrHandleErrors(key) {
  try {
    const data = await retrieveDataFromStorageByKey(key);

    return data;
  } catch (error) {
    if (error.message === CORRUPTED_STORAGE_FILE) {
      printErrorMessage(
        "seems like storage file is corrupted. Please, fix it manually or override with the new data using CLI."
      );
    }
  }
}

// ------ CLI ENTRY POINT ------ //

async function startCLI() {
  const knownKeys = ["h", "c", "ak"]; // h - help, c - city, ak - API key

  const argsObject = getArgs(process);

  if (argsObject === NO_ARGUMENTS_PASSED) {
    const city = await accessDataByKeyOrHandleErrors("city");
    const apiKey = await accessDataByKeyOrHandleErrors("apiKey");

    const cityBolded = chalk.bold("city");
    const apiKeyBolded = chalk.bold("API key");

    if (!city && !apiKey) {
      printErrorMessage(
        `seems there is no value set for ${cityBolded} and ${apiKeyBolded}. Please, provide both - ${cityBolded} and ${chalk.bold(
          "API key"
        )}.`
      );
    }

    return;
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

  checkForUnknownKeysPassedAndPrintIfRequired(argsObject, knownKeys);
}

startCLI();

// ------ END ------ //
