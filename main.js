status = "";

function preload()
{
    sound = loadSound("alarm.mp3");
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error , results) {
    if (error) {
       console.log(error);
    }
    else{
       console.log(results);
       objects = results;
    }
}

function draw() {
    image(video,0,0,380,380);

    if(status = true)
    {
        objectDetector.detect(video , gotResult);
        for(i=0 ; i < objects.length ; i++)
        {
              document.getElementById("status").innerHTML = "Status : Object Detected";
              document.getElementById("baby").innerHTML = "Baby Found";

              fill("#ff0000");
              percent = floor(objects[i].confidence * 100);
              text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
              noFill();
              stroke("#ff0000");
              rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

              sound.stop();
        }
    }
    else 
    {
        sound.play();
        document.getElementById("baby").innerHTML = "Baby Not Found";
    }
}