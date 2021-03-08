if (annyang) {
    var speech_recongition_command = {
        '불 켜': function () {
            light_controler(0, 0, 0, 1);
        },
        '불 꺼': function () {
            light_controler(0, 0, 0, 0);
        },
        '에어컨 켜': function () {
            airconditioner_controller(1);
        },
        '에어컨 꺼': function () {
            airconditioner_controller(0);
        },
        '10초 뒤에 불 꺼': function () {
            light_controler(0, 0, 10, 1);
        },
        '10초 후에 불 꺼': function () {
            light_controler(0, 0, 10, 1);
        },
        '1분 뒤에 불 꺼': function () {
            light_controler(0, 1, 0, 1);
        },
        '1분 후에 불 꺼': function () {
            light_controler(0, 1, 0, 1);
        },
        '1분 30초 뒤에 불 꺼': function () {
            light_controler(0, 1, 30, 1);
        },
        '1분 30초 후에 불 꺼': function () {
            light_controler(0, 1, 30, 1);
        },
        '1시간 뒤에 불 꺼': function () {
            light_controler(1, 0, 0, 1);
        },
        '1시간 후에 불 꺼': function () {
            light_controler(1, 0, 0, 1);
        },
        '3시간 뒤에 불 꺼': function () {
            light_controler(3, 0, 0, 1);
        },
        '3시간 후에 불 꺼': function () {
            light_controler(3, 0, 0, 1);
        },
        '제어판': function () {
            $("#windowCtrl").css('display', 'none');
        },
        '일정': function () {
            $("#windowCtrl").css('display', 'block');
        }

    };

    annyang.addCommands(speech_recongition_command);


    annyang.start({ autoRestart: true, continous: true });
    annyang.resume();
}