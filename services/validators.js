import { WRONG_DATA_TYPE } from "../utils/constants.js";

// ------ START ------ //

export function validateValueForKeyByDataTypeOrThrow(
  valueToValidateByDataType,
  desiredDataType
) {
  if (typeof valueToValidateByDataType !== desiredDataType) {
    throw new Error(WRONG_DATA_TYPE);
  }
}

// ------ END ------ //
