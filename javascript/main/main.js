function network_Check()    //네트워크 체크 함수
{
    if (navigator.onLine == true)
    {
        console.log("Network Connection Success")       //연결상태 정상시 콘솔 메세지 출력
        MQTT_Check();
    }
    if (navigator.onLine == false)
    {
        console.log("Network Connection failed! - code : 10");      //연결상태 실패시 콘솔 메세지 출력
    }

}

function mic_Check(callback)
{        //음성인식을 위한 마이크 기능 작동 체크 함수

    navigator.getUserMedia(
        {
        audio: true     //마이크 사용 권한 요청
        },
        function success()
        {
           console.log("MIC Check Success");        //마이크 사용 권한이 승인되었을 때 출력 콘솔 메세지
        },
        function error()
        {
            console.log("MIC Check failled - code : 15");       //마이크 사용 권한이 거부되었을 때 출력 콘솔 메세지
        }
    );
    var id = 1;
    callback(id);
}


function clock_Check(id)
{
    var time_checking = new Date().getFullYear();       //정상적인 시간을 얻어오는지 판별하기 위한 현재 년도 얻어오기
    if (time_checking <= 0) {       //불가능한 값일 떄(년도 값이 음수)를 만족하는지 점검하여 Date()객체가 정상적으로 불러와지는지 확인
        console.log("Time Object import Failed");      //사간값이 비정상일 때(오류) 출력 콘솔 메세지
    }
    else
    {
        console.log("Time Object import Success");       //시간값이 정상일 때 출력 콘솔 메세지
    }

}

function systemCheck()     //시스템 체크 프로세스 구동 함수
{

    network_Check();    //상기 정의한 각 기능 점검 함수들을 순차적으로 실행
    mic_Check(clock_Check);
    //clock_Check();
}
setInterval(systemCheck(), 1000);      //실행 간격 -> 메모리에 상주하게 되면서 10분 간격으로 점검함