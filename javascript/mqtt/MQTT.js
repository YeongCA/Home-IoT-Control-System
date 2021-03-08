<!-- MQTT Server Information -->
var connect_flag = 0;
var mqtt;
var reconnectTimeout = 5000;
var host = "broker.hivemq.com";
var port = 8000;

MQTTconnect(); // 시작 시 MQTT연결
<!-- MQTT Functions -->
function MQTTconnect() { // 서버연결 시도
    console.log("connecting to " + host + " " + port);
    mqtt = new Paho.MQTT.Client(host, port, "clientjs");
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
    };
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect(options);
}
function onFailure(message) { // 서버연결 실패 시
    console.log("Connection Attempt to Host " + host + "Failed");
    setTimeout(MQTTconnect, reconnectTimeout);
    // document.getElementById("Output").innerHTML = "Connection Failed - Retrying";
}

function onConnect() { // 서버연결 성공 시
    console.log("Connected");
    mqtt.subscribe("Yuhan/Light");
    mqtt.subscribe("Yuhan/Temper");
    mqtt.subscribe("Yuhan/Humi");
    mqtt.subscribe("Yuhan/PM10");
    mqtt.subscribe("Yuhan/PM2");
    message = new Paho.MQTT.Message("Mirro Connected!");
    message.destinationName = "Start"; // 이거두면 초반부 메시지도착오류로 다른 토픽으로 출력
    mqtt.send(message);
    console.log("Send Start message");
    // document.getElementById("Output").innerHTML = "Send: " + message;

    MQTT_Pub("Yuhan/Light", "0"); // OFF 세팅
    MQTT_Pub("Yuhan/Aircon", "0"); // Off 세팅
}

function onMessageArrived(msg) { // 메시지 도착 시 실행
    Temp_Message = msg.payloadString;
    Temp_Topic = msg.destinationName;
    out_msg = Temp_Topic + " <<- " + Temp_Message;
    console.log(out_msg);
    
    

    // document.getElementById("Output").innerHTML = out_msg;

    if (Temp_Topic == "Yuhan/Temper") {

        document.getElementById("Yuhan/Temper").innerHTMa = (Temp_Message + "°");
conole.log("a");
        var a = ((Temp_Message * 2) + 100) + "px";
            //$(".intemp_meter").css('height', ((Temp_Message * 2) + 100) + 'px');
        //$(".intemp_meter").css('top', (200 - ((Temp_Message * 2) + 100)) + 'px');
        console.log(document.getElementsByClassName('intemp_meter')[0].style.height = a;
        
       
        //$("#Yuhan/Temper").html(Temp_Message + "°");
    }
    else if (Temp_Topic == "Yuhan/Humi") {
        document.getElementById("Yuhan/Humi").innerHTML = (Temp_Message);
        //$("#Yuhan/Humi").html(Temp_Message + "%");
    }
    else if (Temp_Topic == "Yuhan/PM10") {
        document.getElementById("Yuhan/PM10").innerHTML = Temp_Message;
        //$("#Yuhan/PM10").html(Temp_Message);
        
        var pm10_pin_deg = Temp_Message / 2;

        if ((Temp_Message >= 0) && (Temp_Message <= 30)) {
            $(".pm10_valueClr").css('color', 'rgb(90,174,255)');
            $('.pm10_descriptClr').css('color', 'rgb(90,174,255)');
            $("#PM10_description").html("매우 좋음");

        }
        else if ((Temp_Message >= 31) && (Temp_Message<= 60)) {
            $('.pm10_valueClr').css('color', 'rgb(0,165,0)');
            $(".pm10_descriptClr").css('color', 'rgb(0,165,0)');
            $("#PM10_description").html("보통");
        }
        else if ((Temp_Message >= 61) && (Temp_Message <= 150)) {
            $('.pm10_valueClr').css('color', 'rgb(255,148,54)');
            $(".pm10_descriptClr").css('color', 'rgb(255,148,54)');
            $("#PM10_description").html("나쁨");
        }
        else if (Temp_Message >= 151) {
            $('.pm10_valueClr').css('color', 'rgb(255,144,144)');
            $(".pm10_descriptClr").css('color', 'rgb(255,144,144)');
            $("#PM10_description").html("매우 나쁨");
        }
        else {
            $('.pm10_valueClr').css('color', 'rgb(255,255,255)');
            $(".pm10_descriptClr").css('color', 'rgb(255,255,255)');
            $("#PM10_description").html("N/A");
            $("#Yuhan/PM10").html("N/A");
        }


        $(".pm10_pinpointer").css('transform', 'rotate(' + pm10_pin_deg + 'deg)');
        if (Temp_Message > 330) {
            $(".pm10_pinpointer").css('transform', 'rotate(165deg)');
        }
     }
    else if (Temp_Topic == "Yuhan/PM2") {
        document.getElementById("Yuhan/PM2").innerHTML = Temp_Message;
        //$("#Yuhan/PM2").html(Temp_Message);     

        var pm25_pin_deg = Temp_Message * 2;

        
        if ((Temp_Message >= 0) && (Temp_Message <= 15)) {
        $(".pm25_valueClr").css('color', 'rgb(90,174,255)');
        $('.pm25_descriptClr').css('color', 'rgb(90,174,255)');
        $("#PM25_description").html("매우 좋음");
    }
        else if ((Temp_Message >= 16) && (Temp_Message <= 35)) {
            $('.pm25_valueClr').css('color', 'rgb(0,165,0)');
            $(".pm25_descriptClr").css('color', 'rgb(0,165,0)');
            $("#PM25_description").html("보통");
        }
        else if ((Temp_Message >= 36) && (Temp_Message <= 75)) {
            $('.pm25_valueClr').css('color', 'rgb(255,148,54)');
            $(".pm25_descriptClr").css('color', 'rgb(255,148,54)');
            $("#PM25_description").html("나쁨");
        }
        else if (Temp_Message >= 76) {
            $('.pm25_valueClr').css('color', 'rgb(255,144,144)');
            $(".pm25_descriptClr").css('color', 'rgb(255,144,144)');
            $("#PM25_description").html("매우 나쁨");
        }
        else {
            $('.pm25_valueClr').css('color', 'rgb(255,255,255)');
            $(".pm25_descriptClr").css('color', 'rgb(255,255,255)');
            $("#PM25_description").html("N/A");
            $("#Yuhan/PM2").html("N/A");
        }

        $(".pm25_pinpointer").css('transform', 'rotate(' + pm25_pin_deg + 'deg)');
        if (Temp_Message > 82) {
            $(".pm25_pinpointer").css('transform', 'rotate(164deg)');
        }
    }
}

function MQTT_Pub(topic, input) { // 메시지발송 
    message = new Paho.MQTT.Message(input);
    message.destinationName = topic;
    mqtt.send(message);
    console.log(topic + " ->> " + input);
    // document.getElementById("Output").innerHTML = message;
}
function MQTT_Sub(topic) { // 메시지구독
    mqtt.subscribe(topic);
    console.log("Subscribe: " + topic);
}



function Pub_Aircon(input) {
    message = new Paho.MQTT.Message(input);
    message.destinationName = "Yuhan/Aircon";
    mqtt.send(message);
    console.log(input);
    // document.getElementById("Output").innerHTML = message;
}
function Pub_Sen3(input) {
    message = new Paho.MQTT.Message(input);
    message.destinationName = "Servo";
    mqtt.send(message);
    console.log(input);
    // document.getElementById("Output").innerHTML = message;
}