const paragraphs = [
    "The quick brown fox jumps over the lazy dog. Practice typing every day to improve your speed and accuracy.",
    "Programming is the art of solving problems through logical thinking and creativity. Consistency leads to mastery.",
    "Technology changes rapidly, but strong programming fundamentals always remain valuable for every developer.",
    "Success comes from discipline, patience, and continuous learning. Small improvements every day create remarkable results.",
    "Typing faster saves time and increases productivity. Focus on accuracy first, then gradually improve your speed."
];

const progressBar = document.getElementById("progressBar");
const rating = document.getElementById("rating");

// Elements
const paragraph = document.getElementById("paragraph");
const input = document.getElementById("input");

const time = document.getElementById("time");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const mistakes = document.getElementById("mistakes");

const restart = document.getElementById("restart");

const popup = document.getElementById("popup");
const finalWPM = document.getElementById("finalWPM");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalMistakes = document.getElementById("finalMistakes");
const closePopup = document.getElementById("closePopup");

let timer = 60;
let interval = null;
let started = false;

let errorCount = 0;
let correctChars = 0;

function loadParagraph(){

    const random = Math.floor(Math.random()*paragraphs.length);

    paragraph.innerHTML="";

    paragraphs[random].split("").forEach(letter=>{

        const span=document.createElement("span");

        span.innerText=letter;

        paragraph.appendChild(span);

    });

    paragraph.querySelector("span").classList.add("current");

    input.value="";

    timer=60;
    started=false;
    errorCount=0;
    correctChars=0;

    time.textContent=timer;
    wpm.textContent=0;
    accuracy.textContent="100%";
    mistakes.textContent=0;

    popup.classList.remove("active");

    clearInterval(interval);

    input.disabled=false;
    progressBar.style.width="0%";

}
loadParagraph();

function startTimer() {

    interval = setInterval(() => {

        timer--;

        time.textContent = timer;

progressBar.style.width=((60-timer)/60)*100+"%";

        if (timer <= 0) {

            clearInterval(interval);

            finishTest();

        }

    },1000);

}

input.addEventListener("input",()=>{

    if(!started){

        started=true;

        startTimer();

    }

    const characters=paragraph.querySelectorAll("span");

    const typed=input.value.split("");

    errorCount=0;

    correctChars=0;

    characters.forEach((char,index)=>{

        if(typed[index]==null){

            char.classList.remove("correct","wrong");

        }

        else if(typed[index]===char.innerText){

            char.classList.add("correct");

            char.classList.remove("wrong");

            correctChars++;

        }

        else{

            char.classList.add("wrong");

            char.classList.remove("correct");

            errorCount++;

        }

    });

    characters.forEach(c=>c.classList.remove("current"));

    if(characters[typed.length]){

        characters[typed.length].classList.add("current");

    }

    mistakes.textContent=errorCount;

    let acc=typed.length===0?100:Math.round((correctChars/typed.length)*100);

    accuracy.textContent=acc+"%";

    let words=correctChars/5;

    let minutes=(60-timer)/60;

    let speed=minutes>0?Math.round(words/minutes):0;

    wpm.textContent=speed;

});

function finishTest(){

    input.disabled=true;

    finalWPM.textContent=wpm.textContent;

    finalAccuracy.textContent=accuracy.textContent;

    finalMistakes.textContent=mistakes.textContent;

    let score=parseInt(wpm.textContent);

    if(score<20){

        rating.innerHTML="🐢 Beginner";

    }
    else if(score<40){

        rating.innerHTML="🥉 Good";

    }
    else if(score<60){

        rating.innerHTML="🥈 Great";

    }
    else if(score<80){

        rating.innerHTML="🥇 Excellent";

    }
    else{

        rating.innerHTML="🏆 Typing Master";

    }

    popup.classList.add("active");

}

restart.addEventListener("click",loadParagraph);

closePopup.addEventListener("click",loadParagraph);