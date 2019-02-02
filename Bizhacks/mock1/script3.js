var header;

var outLang;

onLoad();

function onLoad() {
	header = document.getElementById("header").innerHTML;
	console.log(header);
   handleLanguage(localStorage.getItem("language"));
}

function handleLanguage(language) {
   switch (language) {
       case "french":
           outLang = "fr"
           break;
       case "chinese":
           outLang = 'zh';
           break;
   }
   textToText()
}


function textToText() {
   fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170329T180255Z.3c18d2dc7b65d525.f23ed9a9efa992bded4ef96334e3c154f61d2dea&lang=' + `${outLang.substring(0,2)}` + '&text=' + `${header}`)
       .then(function (response) {
           console.log(response);
           return response.json();
       })
       .then(function (myJson) {
           console.log(JSON.stringify(myJson.text[0]));
           header = (myJson.text[0]);
           // SELECTED_ARRAY.push(text);
           document.getElementById("header").innerHTML = header;
       });
};