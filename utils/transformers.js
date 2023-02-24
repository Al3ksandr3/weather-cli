export function getTextWithoutExtraSpaces(text) {
  let textWithoutExtraSpaces = "";

  for (let character of text) {
    let lastCharacterOfCurrentMasterText =
      textWithoutExtraSpaces[textWithoutExtraSpaces.length - 1];

    if (
      character === " " &&
      (lastCharacterOfCurrentMasterText === " " ||
        lastCharacterOfCurrentMasterText === "\n")
    ) {
      continue;
    } else {
      textWithoutExtraSpaces += character;
    }
  }

  return textWithoutExtraSpaces;
}

////////////////////////////////////////////////////////////

export function createTopOffsetForText(text) {
  return `\n${text}`;
}
