import { homedir } from "os";
import { join } from "path";
import { promises as fsPromises } from "fs";

import {
  CANNOT_SAVE_VALUE_FOR_KEY,
  CORRUPTED_STORAGE_FILE,
  USER_ACCEPTED_CORRUPTED_STORAGE_FILE,
  UNKNOWN_ERROR,
  STORAGE_FILE_DOES_NOT_EXIST,
  VALUE_IS_NOT_SET_FOR_THE_KEY,
} from "../utils/constants.js";

import { getUserResponse } from "./prompt.js";

// ------ START ------ //

const storageFilePath = join(homedir(), "weather-cli.json");

export async function saveKeyValuePair(key, value) {
  let dataToBeSaved = { [key]: value };

  /* Here we make sure that storage file (named "weather-cli.json") exists in a home dircetory in which case we 
    return "true". If not, error is handled inisde "isExist" function and we get "false" as a result. */

  const storageFileExists = await isExist(storageFilePath);

  if (storageFileExists) {
    /* In case file exists it might be corrupted and can't be properly parsed by JSON.parse() method. Therefore,
    parsing of such file might generate errors due to the corrupted file content. In case  such scenario occurs, 
    it has to be handled properly by allowing user to either completely overwrite the file with the prepared-to-save
    data passed through CLI or cancel the process of saving completely. */

    const storageContentReadResult =
      await readDataFromStorageAndReturnParsingResult(storageFilePath);

    /* Reading of storage file content can led us to three distinct scanarios:
      1. If "y" is returned it means that storage file data wsa corrupted and can't be processed by JSON.parse().
        Therefore, user was asked whether or not an app can overwrite the file completely and erase all corrupted
        data and user responded with "yes" option;
      2. If "n" is returned it means that storage file data wsa corrupted and can't be processed by JSON.parse().
        Therefore, user was asked whether or not an app can overwrite the file completely and erase all corrupted
        data and user responded with "no" option;
      3. If no "y" or "n" is returned it means that storage file content was read successfully and can be modified
        and resaved with new data.
    */

    if (storageContentReadResult === "y") {
      await saveDataToStorage(dataToBeSaved, storageFilePath);
    } else if (storageContentReadResult === "n") {
      throw new Error(USER_ACCEPTED_CORRUPTED_STORAGE_FILE);
    } else {
      dataToBeSaved = storageContentReadResult;

      dataToBeSaved[key] = value;

      await saveDataToStorage(dataToBeSaved, storageFilePath);
    }
  }

  if (!storageFileExists) {
    await saveDataToStorage(dataToBeSaved, storageFilePath);
  }
}

////////////////////////////////////////////////////////////

async function isExist(path) {
  try {
    await fsPromises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

////////////////////////////////////////////////////////////

async function saveDataToStorage(data, path) {
  try {
    await fsPromises.writeFile(path, JSON.stringify(data), "utf-8");
  } catch (error) {
    throw new Error(CANNOT_SAVE_VALUE_FOR_KEY);
  }
}

////////////////////////////////////////////////////////////

export async function retrieveValueFromStorageByKey(key) {
  const storageFileExists = await isExist(storageFilePath);

  if (storageFileExists) {
    const storageContentReadResult =
      await readDataFromStorageAndReturnParsingResult(storageFilePath);

    if (storageContentReadResult === "y") {
      await saveDataToStorage({}, storageFilePath);
      throw new Error(VALUE_IS_NOT_SET_FOR_THE_KEY);
    } else if (storageContentReadResult === "n") {
      throw new Error(USER_ACCEPTED_CORRUPTED_STORAGE_FILE);
    } else {
      const retrievedValue = storageContentReadResult[key];

      if (retrievedValue === undefined) {
        throw new Error(VALUE_IS_NOT_SET_FOR_THE_KEY);
      } else {
        return retrievedValue;
      }
    }
  }

  if (!storageFileExists) {
    throw new Error(STORAGE_FILE_DOES_NOT_EXIST);
  }
}

////////////////////////////////////////////////////////////

async function readDataFromStorageAndReturnParsingResult(path) {
  try {
    const storageFileContent = await fsPromises.readFile(path, "utf-8");

    const parsingResult = await parseJSONAndReturnResult(storageFileContent);

    return parsingResult;
  } catch (error) {
    if (error.message === CORRUPTED_STORAGE_FILE) {
      const userResponse = await getUserResponse(
        "Seems that storage file is corrupted. In order to continue to work properly, it is required to either manually fix the storage file or overwrite it. Would you like to overwrite it?",
        ["y", "n"],
        "y"
      );
      return userResponse;
    } else {
      throw new Error(UNKNOWN_ERROR);
    }
  }
}

////////////////////////////////////////////////////////////

async function parseJSONAndReturnResult(dataToParse) {
  try {
    const parsedData = JSON.parse(dataToParse);

    return parsedData;
  } catch (error) {
    throw new Error(CORRUPTED_STORAGE_FILE);
  }
}

// ------ END ------ //
