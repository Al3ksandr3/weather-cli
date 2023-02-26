import axios from "axios";

import { retrieveValueFromStorageByKey } from "./storage.js";

import {
  handleErrorsForValueRetrievalByKeyFromStorage,
  handleErrorsForWeatherDataRequest,
} from "./errorHandlers.js";

import { SOME_INFO_IS_MISSED } from "../utils/constants.js";

// ------ START ------ //

async function requestAllRequiredDataFromStorage(keys, keyShorthands) {
  keys[Symbol.asyncIterator] = function () {
    const lastIndexOfKeysList = keys.length;
    let currentIndex = 0;

    return {
      next: async () => {
        if (currentIndex === lastIndexOfKeysList) {
          return { done: true };
        }

        const currentKey = this[currentIndex];

        const currentKeyShorthand = keyShorthands[currentIndex];

        currentIndex++;

        try {
          const currentKeyValue = await retrieveValueFromStorageByKey(
            currentKey
          );

          return { done: false, value: [currentKey, currentKeyValue] };
        } catch (error) {
          handleErrorsForValueRetrievalByKeyFromStorage(
            error,
            currentKey,
            currentKeyShorthand
          );

          return {
            done: false,
            value: [currentKey, undefined],
          };
        }
      },
    };
  };

  const keyValuePairs = [];

  for await (const keyValuePair of keys) {
    keyValuePairs.push(keyValuePair);
  }

  const retrievedKeysList = keyValuePairs.filter((keyValuePair) => {
    return keyValuePair[1] !== undefined;
  });

  if (retrievedKeysList.length !== keys.length) {
    throw new Error(SOME_INFO_IS_MISSED);
  } else {
    return Object.fromEntries(keyValuePairs);
  }
}

////////////////////////////////////////////////////////////

function mapParamsToAPIServiceFormat(initialParams, mapping) {
  return Object.fromEntries(
    Object.entries(initialParams).map((paramValuePair) => [
      mapping[paramValuePair[0]],
      paramValuePair[1],
    ])
  );
}

export async function getWeather(keys, keyShorthands) {
  try {
    const paramsForAPIRequest = await requestAllRequiredDataFromStorage(
      keys,
      keyShorthands
    );

    const mappedParams = mapParamsToAPIServiceFormat(paramsForAPIRequest, {
      city: "q",
      apiKey: "appid",
    });

    const requestToWeatherService = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      { params: mappedParams }
    );

    return requestToWeatherService.data;
  } catch (error) {
    handleErrorsForWeatherDataRequest(error);

    return null;
  }
}

// ------ END ------ //
