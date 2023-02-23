#!/usr/bin/env node

import { getArgs } from "./utils/utils.js";

import {
  printErrorMessage,
  printSuccessMessage,
  printHelpInfo,
  printMissingValueForArgumentMessage,
} from "./services/loggers.js";

import { mapKeyToValueAndSave } from "./services/storage.js";

import { validateCLIArgumentByType } from "./services/validators.js";

// ------ START ------ //

async function startCLI() {
  const argsObject = getArgs(process);

  if (argsObject.h) {
    printHelpInfo();
  }

  if (argsObject.c) {
    const isValidated = validateCLIArgumentByType(argsObject.c, "string");
    if (isValidated) {
      const saveOperationResult = await mapKeyToValueAndSave(
        "city",
        argsObject.c
      );
      if (saveOperationResult === "EXIT") {
      } else {
        console.log("City was set/updated.");
      }
    } else {
      printMissingValueForArgumentMessage("-c");
    }
  }

  if (argsObject.t) {
    const isValidated = validateCLIArgumentByType(argsObject.t, "string");
    if (isValidated) {
      await mapKeyToValueAndSave("token", argsObject.t);
      console.log("API token was set/updated.");
    } else {
      printMissingValueForArgumentMessage("-t");
    }
  }
}

startCLI();

// ------ END ------ //
