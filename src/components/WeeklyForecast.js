import React from 'react';
import axios from "axios";
import './WeeklyForecast.css';

class WeeklyForecast extends React.Component 
{
  state = 
  {
    coords : 
    {
      latitude:0,
      longitude:0
    },
    cityinfo:
    {

      city: '',
      country:''
    },
    info:
    {
      currTemp : '',
      currHumid : '',
      currWind : '',
      currVisibility : '',
      currDesc : '',
      currIcon : '',
      dailyday : [],
      dailyTemp : [],
      dailyHumid : [],
      dailyWind : [],
      dailyIcon : []
    }
  }

  componentDidMount()
  {
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition((pos)=> 
      {
        let curPos = 
        {
          latitude : pos.coords.latitude,
          longitude : pos.coords.longitude
        }
        this.setState({coords:curPos});

        axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.state.coords.latitude}&longitude=${this.state.coords.longitude}&localityLanguage=en`).then(cityresponse => 
        {
          let cinfo = 
          {
            city : cityresponse.data.city,
            country : cityresponse.data.countryName
          }

          this.setState({ cityinfo : cinfo});
        })

        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&cnt=7&exclude=hourly,minutely&appid=a46356085ca4d46617dbe82f8f470bab`).then(response => 
        {
          console.log(response);
          let weeklyWeat = 
          {
            currTemp : response.data.current.temp,
            currHumid : response.data.current.humidity,
            currWind : response.data.current.wind_speed,
            currVisibility : response.data.current.visibility,
            currDesc : response.data.current.weather[0].description,
            currIcon : `http://openweathermap.org/img/wn/${response.data.current.weather[0].icon}.png`,
            dailyTemp : [],
            dailyHumid : [],
            dailyWind : [],
            dailyIcon : []
          }

          for (let i = 0; i < 7; i++) 
          {
            weeklyWeat.dailyTemp[i] = Math.round(response.data.daily[i+1].temp.day - 273.15);
            weeklyWeat.dailyHumid[i] = response.data.daily[i+1].humidity;
            weeklyWeat.dailyWind[i] = response.data.daily[i+1].wind_speed;
            weeklyWeat.dailyIcon[i] = `http://openweathermap.org/img/wn/${response.data.daily[i+1].weather[0].icon}.png`;
          }
          console.log(weeklyWeat);

          this.setState({ info : weeklyWeat});
        })
      })
    }
  }

  render() 
  {
    let cTemp = this.state.info.currTemp - 273.15;
    cTemp = Math.round(cTemp);
    let ftemp = (this.state.info.currTemp - 273.15) * 9/5 + 32;
    ftemp = Math.round(ftemp);

    console.log(this.state.info.dailyday)
    console.log(this.state.info.dailyIcon);
    console.log(this.state.info.dailyHumid);
    console.log(this.state.info.dailyTemp);
    console.log(this.state.info.dailyWind);

    const daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let i = d.getDay(); //1
    let dailyday = [];
    let j = 0;

    while(j < 7)
    {
      dailyday[j] = daysWeek[i]; //mon, tue, wed, thur, fri, sat

      if(i == 6)
      {
        i = 0;
        j++;
      }
      else
      {
        j++; // 1, 2, 3, 4, 5
        i++; // 2, 3, 4, 5, 6
      }
    }
    
    return (
      <div class = "week">
        <div>
          <p id = "city">{this.state.cityinfo.city}</p>
          <p id = "country">{this.state.cityinfo.country}</p>
        </div>
        <table class = "first">
          <tr>
            <th id = "currIcon"><img id = "currIcon" src={this.state.info.currIcon} alt="curImage"></img></th>
            <th>
              <tr id = "temp">{cTemp} °C</tr>
              <tr id = "temp">{ftemp} °F</tr>
              <tr id = "Day">{dailyday[0]}</tr>
              <tr id = "detail">{this.state.info.currDesc}</tr>
              <tr id = "det">Visibility : {this.state.info.currVisibility}</tr>
              <tr id = "det">Wind : {this.state.info.currWind}</tr>
              <tr id = "det">Humidity : {this.state.info.currHumid}</tr>
            </th>
          </tr>
        </table>

        <table class = "rest">
          <tr>
            <th id = "currIcon"><img id = "currIcon" src={this.state.info.dailyIcon[1]} alt="curImage"></img></th>
            <th id = "sub">
              <tr id = "Day">{dailyday[1]}</tr>
              <span id = "temp">{this.state.info.dailyTemp[1]} °C</span>
              <tr id = "det">Wind : {this.state.info.dailyWind[1]}</tr>
              <tr id = "det">Humidity : {this.state.info.dailyHumid[1]}</tr>
            </th>
          </tr>
          <tr>
            <th id = "currIcon"><img id = "currIcon" src={this.state.info.dailyIcon[2]} alt="curImage"></img></th>
            <th id = "sub">
              <tr id = "Day">{dailyday[2]}</tr>
              <span id = "temp">{this.state.info.dailyTemp[2]} °C</span>
              <tr id = "det">Wind : {this.state.info.dailyWind[2]}</tr>
              <tr id = "det">Humidity : {this.state.info.dailyHumid[2]}</tr>
            </th>
          </tr>
          <tr>
            <th id = "currIcon"><img id = "currIcon" src={this.state.info.dailyIcon[3]} alt="curImage"></img></th>
            <th id = "sub">
              <tr id = "Day">{dailyday[3]}</tr>
              <span id = "temp">{this.state.info.dailyTemp[3]} °C</span>
              <tr id = "det">Wind : {this.state.info.dailyWind[3]}</tr>
              <tr id = "det">Humidity : {this.state.info.dailyHumid[3]}</tr>
            </th>
          </tr>
          <tr>
            <th id = "currIcon"><img id = "currIcon" src={this.state.info.dailyIcon[4]} alt="curImage"></img></th>
            <th id = "sub">
              <tr id = "Day">{dailyday[4]}</tr>
              <span id = "temp">{this.state.info.dailyTemp[4]} °C</span>
              <tr id = "det">Wind : {this.state.info.dailyWind[4]}</tr>
              <tr id = "det">Humidity : {this.state.info.dailyHumid[4]}</tr>
            </th>
          </tr>
          <tr>
            <th id = "currIcon"><img id = "currIcon" src={this.state.info.dailyIcon[5]} alt="curImage"></img></th>
            <th id = "sub">
              <tr id = "Day">{dailyday[5]}</tr>
              <span id = "temp">{this.state.info.dailyTemp[5]} °C</span>
              <tr id = "det">Wind : {this.state.info.dailyWind[5]}</tr>
              <tr id = "det">Humidity : {this.state.info.dailyHumid[5]}</tr>
            </th>
          </tr>
          <tr>
            <th id = "currIcon"><img id = "currIcon" src={this.state.info.dailyIcon[6]} alt="curImage"></img></th>
            <th id = "sub">
              <tr id = "Day">{dailyday[6]}</tr>
              <span id = "temp">{this.state.info.dailyTemp[6]} °C</span>
              <tr id = "det">Wind : {this.state.info.dailyWind[6]}</tr>
              <tr id = "det">Humidity : {this.state.info.dailyHumid[6]}</tr>
            </th>
          </tr>
        </table>
      </div>
    );
  }
}
 
export default WeeklyForecast;
