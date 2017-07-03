import { soap } from "strong-soap";

var XMLHandler = soap.XMLHandler;
const xmlHandler = new XMLHandler();

export class GlobalWeather {
  constructor({ connector }) {
    this.connector = connector;
  }

  getWeather(CityName, CountryName) {
    return this.connector
      .request("GlobalWeather", "GlobalWeatherSoap", "GetWeather", {
        CityName,
        CountryName
      })
      .then(result => ({
        weather: JSON.stringify(
          xmlHandler.xmlToJson(null, result.GetWeatherResult, null)
        )
      }));
  }

  getCities(CountryName) {
    return this.connector
      .request("GlobalWeather", "GlobalWeatherSoap", "GetCitiesByCountry", {
        CountryName
      })
      .then(
        result =>
          xmlHandler.xmlToJson(null, result.GetCitiesByCountryResult, null)
            .NewDataSet.Table
      );
  }
}
