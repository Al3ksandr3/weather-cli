import chalk from "chalk";

import { WRONG_DATA_TYPE } from "../utils/constants.js";

import { saveKeyValuePair } from "./storage.js";

import { printSuccessMessage } from "./loggers.js";

import { handleErrorsForValidationAndSave } from "./errorHandlers.js";

// ------ START ------ //

function validateValueForKeyByDataTypeOrThrow(
  valueToValidateByDataType,
  desiredDataType
) {
  if (typeof valueToValidateByDataType !== desiredDataType) {
    throw new Error(WRONG_DATA_TYPE);
  }
}

////////////////////////////////////////////////////////////

export async function validateValueForKeyAndInitializeSavingProcess(
  valueToValidateByDataType,
  desiredDataType,
  key,
  keyShorthand
) {
  try {
    // STEP I - validate data provided for a respective key;
    validateValueForKeyByDataTypeOrThrow(
      valueToValidateByDataType,
      desiredDataType
    );

    // STEP II.1 - if validation succeeds proceed with saving provided data;
    await saveKeyValuePair(key, valueToValidateByDataType);

    // STEP III - if saving process completes successfully, print success message;
    printSuccessMessage(
      `value for ${chalk.bold(key)} field was successfully set/modified!`
    );
  } catch (error) {
    // STEP II.2 - if validation or saving process fails, handle errors;
    handleErrorsForValidationAndSave(error, key, keyShorthand);
  }
}

// ------ END ------ //
