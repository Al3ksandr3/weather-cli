#!/usr/bin/env node

import { getArgs } from "./utils/extractors.js";

import { NO_ARGUMENTS_PASSED } from "./utils/constants.js";

import {
  printHelpInfo,
  checkForUnknownKeysPassedAndPrintIfRequired,
} from "./services/loggers.js";

import { validateValueForKeyAndInitializeSavingProcess } from "./services/validators.js";

import { getWeather } from "./services/weatherAPI.js";

import { weatherDisplay } from "./services/weatherDisplay.js";

// ------ START ------ //

async function startCLI() {
  const knownKeys = ["h", "c", "ak"]; // h - help, c - city, ak - API key

  const argsObject = getArgs(process);

  if (argsObject === NO_ARGUMENTS_PASSED) {
    const weatherData = await getWeather(["city", "apiKey"], ["-c", "-ak"]);
    if (weatherData) {
      weatherDisplay(weatherData);
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

// ------ CLI ENTRY POINT ------ //

startCLI();

// ------ END ------ //
