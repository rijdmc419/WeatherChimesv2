const mqtt = require('mqtt');

const maxApi = require('max-api');


//let client;

maxApi.post("Hello");


//when "connect" message is called into the .js object in Max
maxApi.addHandler('connect', (url, user, key, host_name, group) => {
    
    //output Hello to the Max Log
    maxApi.post("Hello");

    //connect to the specififed Mqtt url
    const client = mqtt.connect(url, {
        username: user,
        password: key
    });

    //find a specific feed under the url
    //put whole url of group or feed
    //(username)/groups/(group name or key)/json
    //(account associated with the devices)/groups/(device_name)/json
    //var device = `jonah0502/feeds/${feed_name}`;
    var device = `${host_name}/groups/${group}/json`;
    

    //var group =  `${client.options.username}/groups/${group_name}`;
    //birds_of_paradice/feeds/testing1

    client.on('connect', function() {
        //if connected to adafruit.io successfully, output to Max log, and outlet a message in the MaxPatch
        console.log('connected');
        maxApi.outlet('connected');
        maxApi.post("connected");


        /*
        client.subscribe(group, function(err) {
            if(! err) {
                //if subscribed successfully to feed output to Max log
                console.log('subscribed');
                maxApi.post("subscribed");

                //client.publish(testing1, 'Hello from NodeJS');
            }
        });
        */

        
        client.subscribe(device, function(err) {
            try{
                if(! err) {
                    //if subscribed successfully to feed output to Max log
                    console.log('subscribed');
                    maxApi.post("subscribed");

                    client.publish(birds_of_paradice/feeds/practicechimes.chime1, '10');
                }
            }
            catch{
                maxApi.post(`Error subscribing: ${err}`)
            }
        });
        

        
    });

    client.on("error", function(error) {
    	maxApi.outlet('error')
        maxApi.post(error);
    });

    client.on('message', function(topic, message) {
        maxApi.outlet(message.toString());
    });
});


//cd "Documents/Jonah URSA Project/MQTT Practice"