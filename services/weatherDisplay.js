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
    )}°C (feels like: ${Math.round(weatherInfo.main.feels_like)}°C)
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
      return "☀️";
    case "02":
      return "🌤️";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
  }
}

// ------ END ------ //
