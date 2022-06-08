document.addEventListener('DOMContentLoaded', function(event) {

// declare variables
const sliderContainer = document.querySelector(".range__slider");
const slider = document.querySelector("#slider");
const sliderText = document.querySelector(".length__title");
const sliderManual = document.querySelector("#manual-number");
const displayResult = document.querySelector("#result");
const chosenLength = document.querySelector("#chosenLength");

slider.addEventListener("change", function() {
    sliderText.setAttribute("data-length", slider.value);
    sliderManual.value = slider.value;
//    chosenLength.innerText = slider.value;
    }); // end slider event listener

sliderManual.addEventListener("change", function(){
    sliderText.setAttribute("data-length", sliderManual.value);
    slider.value = sliderManual.value;
//    chosenLength.innerText = sliderManual.value;
}); // end sliderManual event listener

// more variables
const lowerBtn = document.querySelector("#lowercase");
const upperBtn = document.querySelector("#uppercase");
const numberBtn = document.querySelector("#number");
const symbolBtn = document.querySelector("#symbol");
const generateBtn = document.querySelector("#generate");
let generatedPassword = "";
// GENERATE 
generateBtn.addEventListener('click', function(){
    copiedInfo.innerText = "copied!";
	copiedInfo.style.opacity = 0;
	copyBtn.style.display = "";
    const length = slider.value;
    const hasUpper = upperBtn.checked;
    const hasLower = lowerBtn.checked;
    const hasNumber = numberBtn.checked;
    const hasSymbol = symbolBtn.checked;

    if(!hasUpper && !hasLower && !hasNumber && !hasSymbol){
        let error = "You must tick at least one box!";
        console.log(error);
        return false;
    } else {
        // if you don't use async function, it will output a Promise
        async function run_pass_gen(){
            
            let array_of_chars = await eel.generate_password(length, hasUpper, hasLower, hasNumber, hasSymbol)(); // the final pair of brackets is important
            // python gives us an array of characters, so use join to combine hem
            generatedPassword = array_of_chars.join('');
            // update display value
            displayResult.innerText = generatedPassword;
            }
        run_pass_gen();
    }

})

// below function ensures at least 1 checkbox is always checked
function disableOnlyCheckbox(){
	let totalChecked = [upperBtn, lowerBtn, numberBtn, symbolBtn].filter(el => el.checked)
	totalChecked.forEach(el => {
		if(totalChecked.length == 1){
			el.disabled = true;
		}else{
			el.disabled = false;
		}
	})
}

[upperBtn, lowerBtn, numberBtn, symbolBtn].forEach(el => {
	el.addEventListener('click', () => {
		disableOnlyCheckbox()
	})
})

// Copy Password in clipboard
const copiedInfo = document.querySelector(".result__info.left");
const copyInfo = document.querySelector(".result__info.right");
const copyBtn = document.querySelector("#copy-btn");
copyBtn.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = displayResult.innerText;
	if (!password || password == "CLICK GENERATE") {
	    copiedInfo.innerText = "generate a password first!";
	    copiedInfo.style.opacity = 1;
		return;
	}
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();

	copiedInfo.style.opacity = 1;
	copyBtn.style.display = "none";
});

}); // end DOMContentLoaded
