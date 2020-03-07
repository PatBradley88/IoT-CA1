$(document).ready(function(){
    let cache = (localStorage.getItem('data') == undefined 
            || localStorage.getItem('data') == null) ? {
        'timestamp': '',
        'light' : 0,
        'distance' : 0,
        'sound' : 0
    } : localStorage.getItem('data');
    let data = {'payloadString': JSON.stringify(cache)}
    onMessageArrived(data)
    let BROKER = 'broker.mqttdashboard.com';
    let PORT = 8000;
    let CLIENTID = 'clientId-PIOVRy9yKe';
    let SUBSCRIBER = 'PBNCI/publish1';
    client = new Paho.MQTT.Client(BROKER, PORT, CLIENTID);
    client.connect({onSuccess:onConnect});
    client.onMessageArrived = onMessageArrived;


    // called when the client connects
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        client.subscribe(SUBSCRIBER);
        //message = new Paho.MQTT.Message("Hello");
        //message.destinationName = "World";
        //client.send(message);
    }

    // called when a message arrives
    // function onMessageArrived(message) {
    //     console.log("onMessageArrived:"+message.payloadString);
    //     let readings = JSON.parse(message.payloadString);
    //     let reading_keys = Object.keys(readings);
    //     let reading_vals = Object.values(readings);
    //     let c = 0;
    //     // while(c < reading_keys.length){
    //     //     data[reading_keys[c]] = reading_vals[c];
    //     //     $(`#${reading_keys[c]}_value`).text(reading_vals[c])
    //     //     c++;
    //     //     console.log(c)
    //     // }
    //     localStorage.setItem('data', JSON.stringify(data));
    //     console.log(localStorage.getItem('data'))
    //}
    function onMessageArrived(message) {
        console.log("onMessageArrived:"+message.payloadString);
        let readings = JSON.parse(message.payloadString);
        $('#light_value').text(readings['light']);
        $('#distance_value').text(readings['distance']);
        $('#sound_value').text(readings['sound']);
        localStorage.setItem('light', readings['light']);
        localStorage.setItem('distance', readings['distance']);
        localStorage.setItem('sound', readings['sound']);
    }

    function getCachedData(){
        let light = localStorage.getItem('light') != undefined ? localStorage.getItem('light') : "-";
        let distance = localStorage.getItem('distance') != undefined ? localStorage.getItem('distance') : "-";
        let sound = localStorage.getItem('sound') != undefined ? localStorage.getItem('sound') : "-";
        
        return {
            'timestamp': new Date().toISOString(),
            'light': light,
            'distance': distance,
            'sound': sound,
        };
    }


})