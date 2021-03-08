
//kakao map API request
var geocoder = new kakao.maps.services.Geocoder();

var callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK)
    {
        var locstr = result[0].address_name;
        var citystr = locstr.split(' ');

        getWeather(citystr[0], locstr);
    }
};

geolocation_converter();

init();

//GPS좌표 - 지명주소 컨버터 함수 선언
function geolocation_converter()
{
    navigator.geolocation.getCurrentPosition((position)=> //Get geolocation coordinate
    {
        var lat = position.coords.latitude; //위도정보
        var lon = position.coords.longitude;//경도정보
        console.log("latitude : "+lat+" , longitude : "+lon); //위경도 콘솔 출력
        geocoder.coord2RegionCode(lon, lat, callback); // 카카오맵 API coord2RegionCode 함수 
        clearInterval(window.ref); 
        init(); //실행주기 지정
    });
}



function getWeather(location, locationStr) {

    var apikey = "ddacff9b437e91ddfc12e9d4dc88c73c";    //Open weathermap API licence 정보
    var city = location; //지명주소 정보(시단위)
    // JSON 요청 URL
    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;         

             
    //API 서버로의 데이터 요청 프로세스
    $.ajax({        //데이터 요청 시작
            dataType: "jsonp",      //요청 데이터 반환형(JSON)
            url: apiURL,            //요청 URL
            async: true,            //비동기식 통신 활성화
            success: function (data) {      

                //JSON type data받기에 성공한 경우 수신 데이터 처리

                var CurrentTemp = (data.main.temp - 273.15).toFixed(0);     //현제 온도값 받아오기
                var CurrentWthId = data.weather[0].id;                      //현제 날씨 ID 값(정수형)
                var CurrentWeather = data.weather[0].main;                  //현제 날씨 상태값(문자열)
                var city = data.name;                                       //반환된 도시 정보(도시명)
                var humidity = data.main.humidity;                          //현제 습도 값
                var windspd = (data.wind.speed).toFixed(1);                 //현제 풍속 값
                var wind_dict = data.wind.deg;                              //현제 풍향 값

                //수신 데이터 가공 및 출력부분
                //날씨 상태와 아이콘 처리 및 출력
                switch (CurrentWeather)
                {
                    case ("Thunderstorm"):
                        CurrentWeather = "비";
                        $("#iconimg").attr("src", "Thunderstorm.png");//
                        $("#weatherStates").html(CurrentWeather);
                        break;
                    case ("Haze"):
                        CurrentWeather = "맑음";
                        $("#weatherStates").html(CurrentWeather);
                        var time = new Date();
                        if ((time.getHours() >= 7) && (time.getHours() <= 18))
                        {
                            $("#iconimg").attr("src", "clear_day.png");//
                        }
                        else
                        {
                            $("#iconimg").attr("src", "clear_night.png");//
                        }
                        break;
                    case ("Drizzle"):
                        CurrentWeather = "비";
                        $("#iconimg").attr("src", "shower_rain.png");//
                        $("#weatherStates").html(CurrentWeather);
                        break;
                    case ("Rain"):
                        CurrentWeather = "조금비";
                        $("#weatherStates").html(CurrentWeather);
                        var time = new Date();
                        if ((time.getHours() >= 7) && (time.getHours() <= 18))
                        {
                            $("#iconimg").attr("src", "few_rainy_day.png");//
                        }
                        else
                        {
                            $("#iconimg").attr("src", "few_rainy_night.png");//
                        }
                        break;
                    case ("Snow"):
                        CurrentWeather = "눈";

                        $("#iconimg").attr("src", "snow.png");//  
                        $("#weatherStates").html(CurrentWeather);
                        break;
                    case ("Mist"):
                        CurrentWeather = "안개";
                        $("#iconimg").attr("src", "mist.png");//
                        $("#weatherStates").html(CurrentWeather);
                        break;
                    case ("Smoke"):
                        CurrentWeather = "안개";
                        $("#iconimg").attr("src", "mist.png");//
                        $("#weatherStates").html(CurrentWeather);
                        break;
                    case ("Dust"):
                        CurrentWeather = "안개";
                        $("#iconimg").attr("src", "mist.png");//
                        $("#weatherStates").html(CurrentWeather);
                        break;
                    case ("Fog"):
                        CurrentWeather = "안개";
                        $("#iconimg").attr("src", "mist.png");//
                        $("#weatherStates").html(CurrentWeather);
                        break;
                    case ("Clear"):
                        CurrentWeather = "맑음";
                        $("#weatherStates").html(CurrentWeather);
                        var time = new Date();
                        if ((time.getHours() >= 7) && (time.getHours() <= 18))
                        {
                            $("#iconimg").attr("src", "clear_day.png");//
                        }
                        else
                        {
                            $("#iconimg").attr("src", "clear_night.png");//
                        }
                        break;
                    case ("Clouds"):
                        if (CurrentWthId == 801)
                        {
                            CurrentWeather = "구름조금";
                            $("#weatherStates").html(CurrentWeather);
                            var time = new Date();
                            
                            if ((time.getHours() >= 7) && (time.getHours() <= 18))
                            {
                                
                                $("#iconimg").attr("src", "few_cloud_day.png");//
                            }
                            else
                            {
                                $("#iconimg").attr("src", "few_cloud_night.png");//
                            }
                        }
                        else if (CurrentWthId == 802)
                        {
                            CurrentWeather = "구름 많음";
                            $("#weatherStates").html(CurrentWeather);
                            var time = new Date();
                            if ((time.getHours() >= 7) && (time.getHours() <= 18))
                            {
                                $("#iconimg").attr("src", "few_cloud_day.png");//
                            }
                            else
                            {
                                $("#iconimg").attr("src", "few_cloud_night.png");//
                            }
                   
                        }
                        else if (CurrentWthId == 803)
                        {
                            CurrentWeather = "흐림";
                            $("#weatherStates").html(CurrentWeather);
                            $("#iconimg").attr("src", "cloudy.png");//
                        }
                        else if (CurrentWthId == 804)
                        {
                            CurrentWeather = "흐림";
                            $("#weatherStates").html(CurrentWeather);
                            $("#iconimg").attr("src", "cloudy.png");//
                        }
                        else
                        {
                            CurrentWeather = "알 수 없음";
                            $("#weatherStates").html(CurrentWeather);
                            $("#iconimg").attr("src", "unknown.png");

                        }
                        break;
                        default:
                        CurrentWeather = "알 수 없음";
                        $("#weatherStates").html(CurrentWeather);
                        $("#iconimg").attr("src", "unknown.png");
                        break;
                }

                //현제 풍향 값 데이터 처리 및 출력
                if (wind_dict == 0)
                {
                    wind_dict = "N";
                }
                else if ((wind_dict > 0) && (wind_dict < 90))
                {
                    wind_dict = "NE";
                }
                else if (wind_dict == 90)
                {
                    wind_dict = "E";
                }            
                else if ((wind_dict > 90) && (wind_dict < 180))
                {
                    wind_dict = "SE";
                }
                else if (wind_dict == 180)
                {
                    wind_dict = "S";
                }
                else if ((wind_dict > 180) && (wind_dict < 270))
                {
                    wind_dict = "SW";
                }
                else if (wind_dict == 270)
                {
                    wind_dict = "W";
                }
                else if ((wind_dict > 270) && (wind_dict) < 360)
                {
                    wind_dict = "NW";
                }
                else if (wind_dict == 360)
                {
                    wind_dict = "N";
                }
                else
                {
                    wind_dict = "N/A";
                }


                //현제 습도 값 데이터 처리 및 출력
                $("#humidity_property").html(humidity);
                $("#humidity_icon").attr("src", "humidity_icon.png");

                //현제 풍속 / 풍향 값 데이터 처리 및 출력
                $("#wind_spd").html(windspd);
                $("#wind_icon").attr("src", "wind.png");
                $("#wind_dict").html(wind_dict);

                //현제 온도 값 데이터 처리 및 출력
                $("#currentTemp").html(CurrentTemp + "°");

                //오늘 및 내일 날씨 데이터 출력 함수 선언
                // dayForecast_manual();


                //현제 위치 정보 출력
                $("#place").html(locationStr);
                
                },
            //에러 처리
        error: function ()
        {
                $("#place").html("GET_JSON_FAIL - 30");
                $("#currentTemp").html("??");
                $("#iconimg").attr("src", "Error.png");
                $("#DateDescp1").html("??");
                $("#today_wth_mintemp_icon").attr("src", "Error2.png");
                $("#today_wth_histtemp_icon").attr("src", "Error2.png");
                $("#DateDescp2").html("??"); 
                $("#tomorrow_wth_mintemp_icon").attr("src", "Error2.png");
                $("#tomorrow_wth_histtemp_icon").attr("src", "Error2.png");
                $("#humidity_icon").attr("src", "humidity_icon.png");
                $("#humidity_property").html("??");
                $("#wind_spd").html("??");
                $("#wind_icon").attr("src", "wind.png");
                $("#wind_dict").html("??");
         }


     });            
}

//오버플로 방지용 메모리 관리 실행 간격 설정 함수 몸체
function init()
{
    window.ref = window.setInterval(function () { geolocation_converter(); }, 30000);          
}



