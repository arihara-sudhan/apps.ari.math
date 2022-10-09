function All(){
var numberA = getRandomNumber();
var numberB = getRandomNumber();
var text = 'What is ' + numberA + ' + ' + numberB + '?';
var response;
function getRandomNumber() {
    return Math.floor((Math.random() * 10) + 1);
}

ask(text, function (err, result) {
    if (err) {
        document.getElementById('result').innerHTML = 'No Answer.';
    } else {
        var answer = parseInt(result.transcript);
        if (answer == numberA + numberB) {
            response = "Correct! "+numberA + ' + ' + numberB + ' is ' + answer;
            speak(response);
            document.getElementById('result').innerHTML = response;
        } else {
            response = "Wrong! "+numberA + ' + ' + numberB + ' is not ' + answer;
            speak(response);
            document.getElementById('result').innerHTML = response;
        }
    }
});
 
 function ask(text, callback) {
    speak(text, function () {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
 
        recognition.onend = function (e) {
            if (callback) {
                callback('no results');
            }
        };
 
        recognition.onresult = function (e) {
            recognition.onend = null;
            if (callback) {
                callback(null, {
                    transcript: e.results[0][0].transcript,
                    confidence: e.results[0][0].confidence
                });
            }
        }
        recognition.start();
    });
}
 
 
function speak(text, callback) {
    var u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = 'en-US';
    u.onend = function () {
        if (callback) {
            callback();
        }
    };
    u.onerror = function (e) {
        if (callback) {
            callback(e);
        }
    };
    speechSynthesis.speak(u);
}}