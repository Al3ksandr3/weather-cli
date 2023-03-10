import chalk from "chalk";

import {
  createTopOffsetForText,
  getTextWithoutExtraSpaces,
} from "../utils/textTransformers.js";

// ------ START ------ //

export function weatherDisplay(weatherInfo) {
  const weatherDescription = weatherInfo.weather[0];

  const weatherMessagePrefix = chalk.bgGreen(
    chalk.bold(` Weather in ${weatherInfo.name}: `)
  );

  const weatherIcon = getIcon(weatherDescription.icon);

  const weatherMessage = `${weatherMessagePrefix} 
   ${weatherIcon} @${weatherDescription.description}
    Temperature: ${Math.round(
      weatherInfo.main.temp
    )}Â°C (feels like: ${Math.round(weatherInfo.main.feels_like)}Â°C)
    Pressure: ${weatherInfo.main.pressure} hPa
    Humidity: ${weatherInfo.main.humidity}%
    Wind speed: ${weatherInfo.wind.speed} meter/sec
  `;

  console.log(
    createTopOffsetForText(getTextWithoutExtraSpaces(weatherMessage, "@"))
  );
}

////////////////////////////////////////////////////////////

function getIcon(icon) {
  switch (icon.slice(0, -1)) {
    case "01":
      return "âī¸";
    case "02":
      return "đ¤ī¸";
    case "03":
      return "âī¸";
    case "04":
      return "âī¸";
    case "09":
      return "đ§ī¸";
    case "10":
      return "đĻī¸";
    case "11":
      return "đŠī¸";
    case "13":
      return "âī¸";
    case "50":
      return "đĢī¸";
  }
}

// ------ END ------ //
