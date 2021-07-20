sound = "";
leftx = 0;
rightx = 0;
lefty = 0;
righty = 0;
far = 0;
right_score = 0;


function preload() {
    sound = loadSound("www.mp3");
}

function setup() {
    daio = createCanvas(500, 450);
    daio.position(440, 300);
    camera = createCapture(VIDEO);
    camera.hide();
    poseNet = ml5.poseNet(camera, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(camera, 0, 0, 500, 450);
    fill(255, 0, 0);
    stroke(255, 0, 0);
    if (far > 0.2) {
        circle(leftx, lefty, 20);
        num = Number(lefty);
        num2 = floor(num);
        vol = num2 / 450;
        document.getElementById("volume").innerHTML = 'Volume = ' + vol;
        sound.setVolume(vol);
    }
    if (right_score > 0.2) {
        circle(rightx, righty, 20);
        if (righty <= 90 && righty > 0) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            sound.rate(0.5);
        } else if (righty <= 180 && righty > 90) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            sound.rate(1);
        } else if (righty <= 270 && righty > 180) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            sound.rate(1.5);
        } else if (righty <= 360 && righty > 270) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            sound.rate(2);
        } else if (righty <= 450 && righty > 360) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            sound.rate(2.5);
        }
    }
}

function play() {
    sound.play();
    sound.setVolume(0.5);
    sound.rate(1);
}

function modelLoaded() {
    console.log("Model is Loaded")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftx = results[0].pose.leftWrist.x;
        lefty = results[0].pose.leftWrist.y;
        rightx = results[0].pose.rightWrist.x;
        righty = results[0].pose.rightWrist.y;
        far = results[0].pose.keypoints[9].score;
        right_score = results[0].pose.keypoints[10].score;
        console.log("Left Wrist x is " + leftx + " Left Wrist y is " + lefty);
        console.log("Right Wrist x is " + rightx + " Left Wrist y is " + righty);
        console.log("Left Wrist score is " + far);
        console.log("Right Wrist score is " + right_score);
    }
}