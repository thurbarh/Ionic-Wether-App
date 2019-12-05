import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import{appconfig} from '../appconfiguration/appconfig';
import { Currentweathermodel } from '../model/currentweathermodel';
import { Forecastmodel } from '../model/forecastmodel';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private httpClient:HttpClient) { }

  getTodayByCoordinates(latitude:string, longitude:string):Observable<Currentweathermodel>{
   
    const _url=appconfig.base_url+"weather?lat="+latitude+"&lon="+longitude+"&appid="+appconfig.apiKey;

    const res=this.httpClient.get<Currentweathermodel>(_url);

    return res;
  }
  getTodayByLocationname(name:string):Observable<Currentweathermodel>{

    const _url=appconfig.base_url+"weather?q="+name+"&appid="+appconfig.apiKey;
    const res=this.httpClient.get<Currentweathermodel>(_url);
    return res;
  }
  getForecastByCoordinate(latitude:string,longitude:string):Observable<Forecastmodel>{
     const _url=appconfig.base_url+"forecast?lat="+latitude+"&lon="+longitude+"&appid="+appconfig.apiKey;
     const res=this.httpClient.get<Forecastmodel>(_url);
     return res;
  }
  getForecastByLocationName(name:string,country:string):Observable<Forecastmodel>{
    const _url=appconfig.base_url+"forecast?q="+name+","+country+"&appid="+appconfig.apiKey;
    console.log(_url);
    const res=this.httpClient.get<Forecastmodel>(_url);
    return res;
  }
}
