export function validateCLIArgumentByType(argumentValue, desiredDataType) {
  if (typeof argumentValue !== desiredDataType) {
    return false;
  } else {
    return true;
  }
}
