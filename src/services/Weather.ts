import { injectable, singleton } from "tsyringe";
import axios from "axios";

@singleton()
export class Weather {
  private apiKey: string = process.env.OPEN_WEATHER_KEY!;
  private api = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5"
  });


  getWeather() {
    return this.api.get(`/weather?lat=44.34&lon=10.99&appid=${this.apiKey}`);
  }
}