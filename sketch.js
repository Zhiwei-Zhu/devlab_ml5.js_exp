let mobilenet;
let classifier;
let video;
let label = 'test';
let button1;
let button2;
let trainButton;

function modelReady() {
    console.log('Le modèle est prêt');
}

function videoReady() {
    console.log('la vidéo est prête');
}

function whileTraining(loss) {
    if (loss == null) {
        console.log('entrainement terminé');
        classifier.classify(Resultat);
    } else {
        console.log(loss);
    }
}


function Resultat(error, result) {
    if (error) {
        console.error(error);
    } else {
        label = result;
        classifier.classify(Resultat);
    }
}

function setup() {
    createCanvas(500, 500);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video, videoReady);

    button1 = createButton('left');
    button1.mousePressed(function() {
        classifier.addImage('left');
    });

    button2 = createButton('right');
    button2.mousePressed(function() {
        classifier.addImage('right');
    });

    trainButton = createButton('train');
    trainButton.mousePressed(function() {
        classifier.train(whileTraining);
    });


}

function draw() {
    background(0);
    image(video, 0, 0, 500, 470);
    fill(255);
    textSize(16);
    text(label, 10, height - 10);
}