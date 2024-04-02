let timer = document.getElementById("timer");

let quote = document.getElementById("quoteDisplay");

let resultTipe = document.getElementById("result");

let textInput = document.getElementById("quoteInput");

let submitButton = document.getElementById("submitBtn");

let resetButton = document.getElementById("resetBtn");

let loading = document.getElementById("loading");

let quoteContent = "";
let num = null;

loading.classList.add("d-block");
let options = {
    method: "GET"
}

fetch("https://apis.ccbp.in/random-quote", options)

    .then(
        function(response) {
            return response.json();
        }
    )
    .then(
        function(jsonData) {
            loading.classList.remove("d-block");
            quoteContent = jsonData.content;
            quote.textContent = quoteContent;
            let abc = quoteContent.split(" ");
            num = abc.length;

        }
    );






let counter = -1;
let qniqueId = setInterval(function() {
    counter = counter + 1;
    timer.textContent = counter + " seconds";
}, 1000);


submitButton.addEventListener("click", function() {
    if (textInput.value !== quoteContent) {
        resultTipe.textContent = "You typed incorrect sentence!";
    } else {
        resultTipe.textContent = "You typed " + num + " words" + " in " + counter + " seconds";
        clearInterval(qniqueId);
    }

});

textInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        if (textInput.value !== quoteContent) {
            resultTipe.textContent = "You typed incorrect sentence!";
        } else {
            resultTipe.textContent = "You typed " + num + " words" + " in " + counter + " seconds";
            clearInterval(qniqueId);
        }
    }
});

resetButton.onclick = function() {
    clearInterval(qniqueId);
    counter = -1;
    qniqueId = setInterval(function() {
        counter = counter + 1;
        timer.textContent = counter + " seconds";
    }, 1000);
    textInput.value = "";
    loading.classList.add("d-block");
    fetch("https://apis.ccbp.in/random-quote", options)

        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            function(jsonData) {
                loading.classList.remove("d-block");
                quoteContent = jsonData.content;
                quote.textContent = quoteContent;

            }
        );
};