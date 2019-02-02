var ENGLISH_ARRAY = ["Please meet", "James in", "Aisle 8"]

var SELECTED_ARRAY;

var text;

var outLang;

onLoad();

function onLoad() {
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

    translateFunction();
}

function translateFunction() {
    ENGLISH_ARRAY.map((x, id) => {
        text = x;
        textToText(id);
    });
}

function textToText(i) {
    fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170329T180255Z.3c18d2dc7b65d525.f23ed9a9efa992bded4ef96334e3c154f61d2dea&lang=' + `${outLang.substring(0,2)}` + '&text=' + `${text}`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (myJson) {
            console.log(JSON.stringify(myJson.text[0]));
            text = (myJson.text[0]);
            // SELECTED_ARRAY.push(text);
            let id = i;
            let id2 = id;
            id = JSON.stringify(id);
            document.getElementById(id).innerHTML = (text);
        });
};
