img = "";
status = "";
objects = [];
song = "";

function preload()
{
    song = loadSound("best_alarm.mp3"); 
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Person";

} 


function draw()
{
    image(video,0,0,380,380);

       if(status != "")
       {
        objectDetector.detect(video,gotResult);
         for(i = 0; i< objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("baby_visible").innerHTML = "Baby found! ";
            fill(0,142,204);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "%", objects[i].x +15, objects[i].y +20);
            noFill();
            stroke(0,142,204);
            rect(objects[i].x -25, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label == "person")
         {
             document.getElementById("baby_visible").innerHTML = "Baby Found.";
             console.log("stop");
             song.stop();
         }

         else
         {
            document.getElementById("baby_visible").innerHTML = "Baby Not Found.";
             console.log("play");
             song.play();
         }
        }

         
         

         

        } 
         
       
    
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status =true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
     console.log(results);
     objects = results;
}