import { injectable } from "tsyringe";
import axios from "axios";

@injectable()
export class WeatherManager {
  private apiKey: string = process.env.OPEN_WEATHER_KEY!;
  private api = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5"
  });


  getWeather() {
    return this.api.get(`/weather?lat=44.34&lon=10.99&appid=${this.apiKey}`);
  }
}