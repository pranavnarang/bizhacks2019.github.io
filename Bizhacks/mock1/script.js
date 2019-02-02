var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + ' ;'
var speech;
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var outLang;
var inLang;
var voice;
var text = 'default';
var value;

onLoad();

function onLoad() {
    handleLanguage(localStorage.getItem("language"));
}

function handleLanguage(language){
   switch(language){
       case "french":
           outLang = 'fr';
           voice = 'French Female';
           text = 'Français';
           break;
       case "chinese":
           outLang = 'zh';
           voice = 'Chinese Female';
           text = '普通话'
              console.log( '!!!!!!!!!!!!!!!!!!!!!!!!!!!');
           break;
       case "spanish":
           outLang = 'es';
           voice = 'Spanish Female';
           text = 'Español'
           break;
                  }
     document.getElementById("foreignLang").innerHTML = text;
}

function test() {
    console.log('TEST');
}

function engButton() {
   speechRecognitionList.addFromString(grammar, 1);
   recognition.grammars = speechRecognitionList;
   //recognition.continuous = false;
   recognition.interimResults = false;
   recognition.maxAlternatives = 1;
   recognition.lang = 'en';
//    outLang = 'zh';
//    voice = "Chinese Female";
   document.body.onclick = function() {
        recognition.start();
        console.log('Ready to receive a color command.');
   }

   recognition.onresult = function(event) {
     var last = event.results.length - 1;
     speech = event.results[last][0].transcript;
     console.log('Confidence: ' + event.results[0][0].confidence);
     textToText();
   }

   recognition.onspeechend = function() {
     recognition.stop();
   }

   // recognition.onnomatch = function(event) {
   //   diagnostic.textContent = “I didn't recognise that word.“;
   // }

   // recognition.onerror = function(event) {
   //   diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
   // }
}

function frButton() {
   speechRecognitionList.addFromString(grammar, 1);
   recognition.grammars = speechRecognitionList;
   //recognition.continuous = false;
   recognition.interimResults = false;
   recognition.maxAlternatives = 1;
   recognition.lang = outLang;
   outLang = 'en';
   voice = "UK English Female";
   document.body.onclick = function() {
        recognition.start();
        console.log('Ready to receive a color command.');
   }

   recognition.onresult = function(event) {
     var last = event.results.length - 1;
     speech = event.results[last][0].transcript;
     console.log('Confidence: ' + event.results[0][0].confidence);
     textToText();
   }

   recognition.onspeechend = function() {
     recognition.stop();
   }

   // recognition.onnomatch = function(event) {
   //   diagnostic.textContent = “I didn't recognise that word.“;
   // }

   // recognition.onerror = function(event) {
   //   diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
   // }
}

function textToText() {
fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170329T180255Z.3c18d2dc7b65d525.f23ed9a9efa992bded4ef96334e3c154f61d2dea&lang=' + `${outLang.substring(0,2)}` + '&text=' + `${speech}`)
.then(function(response) {
  console.log(response);
  return response.json();
})
.then(function(myJson) {
  console.log(JSON.stringify(myJson.text[0]));
  speech = JSON.stringify(myJson.text[0]);

}).
then(function() {
      responsiveVoice.speak(speech, voice);
});

}