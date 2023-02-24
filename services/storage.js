import { homedir } from "os";
import { join } from "path";
import { promises as fsPromises } from "fs";
import { createInterface } from "readline";
import chalk from "chalk";

import {
  CANNOT_SAVE_VALUE_FOR_KEY,
  STORAGE_FILE_CORRUPTED,
} from "../utils/constants.js";

// ------ START ------ //

const storageFilePath = join(homedir(), "weather-cli.json");

export async function mapKeyToValueAndSave(key, value) {
  let dataToBeSaved = { [key]: value };

  /* Here we make sure that storage file (named "weather-cli.json") exists in a home dircetory in which case we 
    return "true". If not, error is handled inisde "isExist" function and we get "false" as a result. */

  const storageFileExists = await isExist(storageFilePath);

  if (storageFileExists) {
    /* In case file exists it might be corrupted and can't be properly parsed by JSON.parse() method. Therefore,
    parsing of such file might generate errors due to the corrupted file content. In case  such scenario occurs, 
    it has to be handled properly by allowing user to either completely overwrite the file with the prepared-to-save
    data passed through CLI or cancel the process of saving completely. */

    const storageReadResult = await readDataFromStorageAndReturnParsingResult(
      storageFilePath
    );

    if (storageReadResult === "y") {
      await saveDataToStorage(dataToBeSaved, storageFilePath);
    } else if (storageReadResult === "n") {
      throw new Error(STORAGE_FILE_CORRUPTED);
    } else {
      dataToBeSaved = storageReadResult;

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

async function readDataFromStorageAndReturnParsingResult(path) {
  try {
    const fileContent = await fsPromises.readFile(path, "utf-8");

    const parsingResult = await parseJSONAndReturnResult(fileContent);

    return parsingResult;
  } catch (error) {}
}

////////////////////////////////////////////////////////////

async function getUserResponse(questionText, permittedResponses = null) {
  const readLineInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let userResponse = await new Promise((resolve) => {
    readLineInterface.question(questionText, (answer) => {
      resolve(answer.toLowerCase());
    });
  });

  if (!permittedResponses || permittedResponses.includes(userResponse)) {
    readLineInterface.close();
  } else {
    const attention_STYLED = chalk.bgYellow(chalk.bold(` ATTENTION: `));
    const currentUserResponse_STYLED = chalk.bgRed(
      chalk.bold(` ${userResponse} `)
    );
    const permittedReponses_STYLED = chalk.bgGreen(
      chalk.bold(` ${permittedResponses.join("/")} `)
    );

    const wrongResponseMessage = `${attention_STYLED} seems like you have provided value ${currentUserResponse_STYLED} that does not match any of the expected values ${permittedReponses_STYLED}. In order to proceed, please, provide a value, either in lower- or upper-case, matching some expected value`;

    console.log(wrongResponseMessage);

    userResponse = await getUserResponse(questionText, permittedResponses);
  }

  return userResponse;
}

////////////////////////////////////////////////////////////

async function parseJSONAndReturnResult(dataToParse) {
  try {
    const parsedData = JSON.parse(dataToParse);

    return parsedData;
  } catch (error) {
    const selectedOption = await getUserResponse(
      "Seems the storage file is corrupted. Do you want to completely overwrite it? (y/n)",
      ["y", "n"]
    );

    return selectedOption;
  }
}

// ------ END ------ //
