import chalk from "chalk";

import { createInterface } from "readline";

import { printWrongResponseMessage } from "./loggers.js";

import { createTopOffsetForText } from "../utils/textTransformers.js";

// ------ START ------ //

export async function getUserResponse(
  initialQuestionText,
  permittedResponses,
  defaultResponse,
  allowDefault = true,
  applyDefaultStylingToQuestionText = true
) {
  const readLineInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let userResponse = await new Promise((resolve) => {
    const questionText = getQuestionText(
      initialQuestionText,
      permittedResponses,
      defaultResponse,
      applyDefaultStylingToQuestionText
    );

    readLineInterface.question(questionText, (answer) => {
      resolve(answer.toLowerCase());
    });
  });

  if (allowDefault && userResponse === "") {
    userResponse = defaultResponse;
  }

  if (!permittedResponses || permittedResponses.includes(userResponse)) {
    readLineInterface.close();
  } else {
    printWrongResponseMessage(userResponse, permittedResponses);

    userResponse = await getUserResponse(
      initialQuestionText,
      permittedResponses,
      defaultResponse,
      allowDefault,
      applyDefaultStylingToQuestionText
    );
  }

  return userResponse;
}

////////////////////////////////////////////////////////////

function getComposedQuestionText(
  initialQuestionText,
  permittedResponses,
  defaultResponse
) {
  let composedQuestionText = "";

  if (initialQuestionText) {
    composedQuestionText += initialQuestionText;
  }

  if (permittedResponses) {
    composedQuestionText = `${composedQuestionText} (${chalk.bold(
      permittedResponses.join("/")
    )})`;
  }

  if (defaultResponse) {
    composedQuestionText = `${composedQuestionText} (default: ${chalk.bold(
      defaultResponse
    )})`;
  }

  return composedQuestionText;
}

////////////////////////////////////////////////////////////

function getQuestionText(
  initialQuestionText,
  permittedResponses,
  defaultResponse,
  applyDefaultStylingToQuestionText
) {
  const composedQuestionText = getComposedQuestionText(
    initialQuestionText,
    permittedResponses,
    defaultResponse
  );

  const composedQuestionTextWithOffset =
    createTopOffsetForText(composedQuestionText);

  const styledComposedQuestionTextWithOffset = chalk.bgMagentaBright(
    composedQuestionTextWithOffset
  );

  return applyDefaultStylingToQuestionText
    ? styledComposedQuestionTextWithOffset
    : composedQuestionTextWithOffset;
}

// ------ END ------ //
