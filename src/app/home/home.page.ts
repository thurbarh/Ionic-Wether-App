import { Component } from '@angular/core';
import {ScreenOrientation}from '@ionic-native/screen-orientation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Weathermodel } from '../model/weathermodel';
import { Observable } from 'rxjs';
import { WeatherServiceService } from '../services/weather-service.service';
import { Currentweathermodel } from '../model/currentweathermodel';
import { Currentweatherviewmodel } from '../model/currentweatherviewmodel';
import { Forecastviewmodel } from '../model/forecastviewmodel';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude;
  longitude;
  cityname:string;
  currentForecast: any =[];
  current_Forecast: Forecastviewmodel;
  currentweather:Currentweatherviewmodel;

  slideOpts={
    slidesPerView: 3.5,
    spaceBetween: 1
  };
  slideOpts_scale={
    slidesPerView: 1.3,
    spaceBetween: -1,
    direction:'vertical'
    
  };
  constructor(private screenOrientation:ScreenOrientation,
              private geoloc:Geolocation,
              private weatherService:WeatherServiceService,public keyboard:Keyboard) {
    
    screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.getweatherLocation();
  }

  ngOnInit(){
  }
  
  doRefresh(event){
    if(this.cityname)this.getweatherBycity()
    else
    this.getweatherLocation();
    event.target.complete();
  }
  getweatherBycity(){
    if(this.cityname){
      this.weatherService.getTodayByLocationname(this.cityname).subscribe((data)=>{
      this.currentweather = {
        country:data.sys.country,
        date: this.formatunixtime(data.dt),
        name:data.name,
        description:data.weather[0].main,
        current_day_desc:"",
        icon:"http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png",
        temperature:data.main.temp
      };
      this.getForecastByCityname(this.cityname,data.sys.country); 
       });
     }else
     this.getweatherLocation();
  }
  getweatherLocation(){
    this.geoloc.getCurrentPosition().then((res)=>{
      
      this.latitude=res.coords.latitude;
      this.longitude=res.coords.longitude;
        this.weatherService.getTodayByCoordinates(this.latitude,this.longitude).subscribe((data)=>{
        this.currentweather = {
         
          country:data.sys.country,
          date: this.formatunixtime(data.dt),
          name:data.name,
          description:data.weather[0].main,
          current_day_desc:"",
          icon:"http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png",
          temperature:data.main.temp

        };
        this.getForecastByCoodinate(this.latitude,this.longitude);
      });
            
    }).catch((err)=>{
      console.log("Error getting current location, detail: "+err);
    });
  }
  getForecastByCoodinate(latitude:string,longitude:string){
    this.weatherService.getForecastByCoordinate(latitude,longitude).subscribe((data)=>{
      data.list.forEach(element => {
         this.current_Forecast={
          temperature:element.main.temp,
          date:this.formatunixtime_forecast(element.dt),
          icon:"http://openweathermap.org/img/wn/"+element.weather[0].icon+"@2x.png",
          time:this.formatUnixTime_time(element.dt),
        };
        this.currentForecast.push(this.current_Forecast);
      });
     });
  }
  getForecastByCityname(name:string,country:string){
    this.weatherService.getForecastByLocationName(name,country).subscribe((data)=>{
      data.list.forEach(element => {
         this.current_Forecast={
          temperature:element.main.temp,
          date:this.formatunixtime_forecast(element.dt),
          icon:"http://openweathermap.org/img/wn/"+element.weather[0].icon+"@2x.png",
          time:this.formatUnixTime_time(element.dt),
        };
        this.currentForecast.push(this.current_Forecast);
      });
     });
  }
  formatUnixTime_time(unixTime:number){
    if(unixTime){
      let dt=new Date(unixTime*1000);
      let hrs=dt.getHours();
      let timestap="AM"
      if(hrs>= 12){
         timestap="PM";
      }
      if(hrs > 12){
        return `${hrs-12}${timestap.toLowerCase()}`;
      }
      if(hrs ==0){
        return "12am";
      }
      if(hrs ==12){
        return "12pm";
      }
      return `${hrs}${timestap.toLowerCase()}`;
   }
   return"";
  }
  formatunixtime_forecast(unixTime:number){
    const monts=["jan","feb","mar","Apr","may","jun","jul","aug","sep","oct","nov","dec"];
    const week=["sun","mon","tue","wed","thur","fri","sat"];
    if(unixTime){
       let dt=new Date(unixTime*1000);
       let day=dt.getDay();
       let mth=dt.getMonth()+1;
       let yr=dt.getUTCFullYear();
       return `${week[day]} ${mth}`;
    }
    return"";
  }
  formatunixtime(unixTime:number){
    const monts=["jan","feb","mar","Apr","may","jun","jul","aug","sep","oct","nov","dec"];
    const week=["sun","mon","tue","wed","thur","fri","sat"];
    if(unixTime){
       let dt=new Date(unixTime*1000);
       let day=dt.getDay();
       let mth=dt.getMonth()+1;
       let yr=dt.getUTCFullYear();
       return `${week[day]} ${mth} ${yr}`;
    }
    return"";
  }
  
}
