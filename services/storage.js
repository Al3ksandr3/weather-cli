import { homedir } from "os";
import { join, parse } from "path";
import { promises } from "fs";
import { createInterface } from "readline";
import chalk from "chalk";

// ------ START ------ //

const storageFilePath = join(homedir(), "weather-cli.json");

export async function mapKeyToValueAndSave(key, value) {
  let dataToBeSaved = { [key]: value };

  /* Here we make sure that storage file exists in a home dircetory in which case we return "true". If not, 
    error is handled inisde "isExist" method and we get "false" as a result. */
  const storageFileExists = await isExist(storageFilePath);

  if (storageFileExists) {
    /* In case file exists it might still be corrupted and can't be properly parsed. Therefore,
    reading of such file might generate errors associated with corrupted file content. In case 
    such scenario occurs, it has to be handled properly by allowing user to either completely 
    overwrite the file with the prepared-to-save data or cancel the process of saving completely. */

    const storageReadResult = await readDataFromStorageAndReturnParsingResult(
      storageFilePath
    );

    if (storageReadResult === null || storageReadResult === "y") {
      await saveDataToStorage(dataToBeSaved, storageFilePath);
    } else if (storageReadResult === "n") {
      return "EXIT";
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
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

////////////////////////////////////////////////////////////

async function saveDataToStorage(data, path) {
  try {
    await promises.writeFile(path, JSON.stringify(data), "utf-8");
  } catch (error) {
    console.log("File can't be written to...");
  }
}

////////////////////////////////////////////////////////////

async function readDataFromStorageAndReturnParsingResult(path) {
  try {
    const fileContent = await promises.readFile(path, "utf-8");

    const parsingResult = await parseJSONAndReturnResult(fileContent);

    return parsingResult;
  } catch (error) {
    return "Unknown error";
  }
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
    const wrongResponseMessage =
      chalk.bgYellow(` ATTENTION: `) +
      ` seems like you have provided value ${chalk.bgRed(
        ` ${userResponse} `
      )} that does not match any of the expected values ${chalk.bgGreen(
        ` ${permittedResponses.join("/")} `
      )}. In order to proceed, please, provide a value either in lower- or upper-case matching some expected value.`;

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
