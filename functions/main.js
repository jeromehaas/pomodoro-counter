"use strict";
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTROL THE MENU
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var menu = document.getElementById("hamburger");
var menuBackground = document.getElementById("menu-background");
var navigation = document.getElementById("navigation");
var navigationItems = document.getElementsByClassName("navigation-item");
var numberOfNavitionItems = navigationItems.length;
menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    menuBackground.classList.toggle("is-expanded");
    navigation.classList.toggle("is-inviewport");
    console.log(numberOfNavitionItems);
    var counter = 0;
    var i;
    for (i = 0; i < numberOfNavitionItems; i++) {
        console.log(navigationItems[i]);
        navigationItems[i].classList.toggle("is-visible");
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET THE USER INPUT
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function getUserInput() {
    var intervals = document.getElementById('intervals');
    var studyTime = document.getElementById('studytime');
    var breakTime = document.getElementById('breaktime');
    var valueFromIntervals = intervals.value;
    var valueFromStudyTime = studyTime.value;
    var valueFromBreakTime = breakTime.value;
    return {
        valueFromIntervals: valueFromIntervals,
        valueFromStudyTime: valueFromStudyTime,
        valueFromBreakTime: valueFromBreakTime
    };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// RUN THE TIMER
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function studyTimeCounter(intervals, studyTime, breakTime) {
    var switcher = 0;
    var zahler = 0;
    var zahlerTotal = intervals - 1;
    var AmountOfIntervals = intervals;
    var studyTimeInMinutes = studyTime;
    var studyTimeInSeconds = studyTime * 60;
    var RemainingStudyTimeInSeconds = studyTimeInSeconds;
    var studyTimeGoal = studyTimeInSeconds;
    var breaktimeInMinutes = breakTime;
    var breakTimeInSeconds = breakTime * 60;
    var RemainingBreakTimeInSeconds = breakTimeInSeconds;
    var breakTimeGoal = breakTimeInSeconds;
    var totalGoal = (zahlerTotal) * (studyTimeInSeconds + breakTimeInSeconds) + studyTimeInSeconds + 1;
    var secondCounter = 0;
    var newTimerButton = document.getElementById('new-timer-button');
    document.getElementById("intervals-information").innerText = (zahler + " / " + intervals);
    document.getElementById("studytime-information").innerText = (studyTimeInMinutes + " MINS");
    document.getElementById("breaktime-information").innerText = (breaktimeInMinutes + " MINS");
    document.getElementById("progress-information").innerText = ("0" + "%");
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // LOOP FOR THE INTERVAL START
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    var myInterval = setInterval(function () {
        //CLEAR THE INTERVAL WHEN USER PRESS "SET A NEW TIMER" BUTTON AND HIDE THE INFORMATION BOX
        newTimerButton.addEventListener('click', function () {
            clearInterval(myInterval);
            setTimeout(function () {
                document.getElementById('new-timer-button').style.top = "-50px";
                document.getElementById('information-box').style.bottom = "-600px";
                document.getElementById('front-side').style.transform = "rotateY(0deg)";
                document.getElementById('back-side').style.transform = "rotateY(180deg)";
            }, 500);
        });
        //CALCULATE THE PROGRESS INFORMATION
        var progress = (100 / totalGoal) * secondCounter;
        progress = Math.ceil(progress);
        document.getElementById("progress-information").innerText = (progress + "%");
        secondCounter++;
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // IF THE SWITCH HAS A EVEN VALUE ITS STUDTIME
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (switcher % 2 == 0) {
            var seconds = RemainingStudyTimeInSeconds;
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            seconds %= 60;
            minutes %= 60;
            hours %= 60;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            hours = (hours < 10) ? "0" + hours : hours;
            var remainingTime = (hours + ":" + minutes + ":" + seconds);
            var counter = document.getElementById('counter');
            var counterContext = counter.getContext('2d');
            var pointToFill = 4.72;
            var counterWidth = counterContext.canvas.width;
            var counterHeight = counterContext.canvas.height;
            var difference;
            difference = ((RemainingStudyTimeInSeconds / studyTimeInSeconds) * Math.PI * 2 * 10);
            counterContext.clearRect(0, 0, counterWidth, counterHeight);
            counterContext.font = '17px letter-gothic-std';
            counterContext.lineWidth = 13;
            counterContext.fillStyle = 'white';
            counterContext.textAlign = 'center';
            if (switcher % 2 == 0) {
                counterContext.clearRect(0, 0, counterWidth, counterHeight);
                counterContext.fillText("STUDY", 100, 140);
                document.getElementById('bg-image').style.left = "0";
                counterContext.strokeStyle = 'white';
            }
            counterContext.textAlign = 'center';
            counterContext.fillText(remainingTime, 100, 110);
            counterContext.beginPath();
            counterContext.arc(100, 100, 90, pointToFill, difference / 10 + pointToFill);
            counterContext.stroke();
            if (RemainingStudyTimeInSeconds == 0) {
                RemainingStudyTimeInSeconds = studyTimeGoal - 1;
                switcher++;
            }
            else {
                RemainingStudyTimeInSeconds--;
            }
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            // IF THE SWITCH HAS A UNEVEN VALUE ITS BREAKTIME
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
        else if (switcher % 2 != 0) {
            var seconds = RemainingBreakTimeInSeconds;
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            seconds %= 60;
            minutes %= 60;
            hours %= 60;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            hours = (hours < 10) ? "0" + hours : hours;
            var remainingTime = (hours + ":" + minutes + ":" + seconds);
            var counter = document.getElementById('counter');
            var counterContext = counter.getContext('2d');
            var pointToFill = 4.72;
            var counterWidth = counterContext.canvas.width;
            var counterHeight = counterContext.canvas.height;
            var difference;
            difference = ((RemainingBreakTimeInSeconds / breakTimeInSeconds) * Math.PI * 2 * 10);
            counterContext.clearRect(0, 0, counterWidth, counterHeight);
            counterContext.lineWidth = 10;
            counterContext.fillStyle = 'white';
            if (switcher % 2 != 0) {
                counterContext.clearRect(0, 0, counterWidth, counterHeight);
                counterContext.fillText("BREAK", 100, 140);
                document.getElementById('bg-image').style.left = "-200vw";
                counterContext.strokeStyle = 'white';
            }
            counterContext.font = '17px letter-gothic-std';
            counterContext.textAlign = 'center';
            counterContext.fillText(remainingTime, 100, 110);
            counterContext.beginPath();
            counterContext.arc(100, 100, 90, pointToFill, difference / 10 + pointToFill);
            counterContext.stroke();
            if (RemainingBreakTimeInSeconds == 0) {
                RemainingBreakTimeInSeconds = breakTimeGoal - 1;
                zahler++;
                document.getElementById("intervals-information").innerText = (zahler + " / " + AmountOfIntervals);
                switcher++;
            }
            else {
                RemainingBreakTimeInSeconds--;
            }
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // CHECK IF THE TIME IS UP AFTER EVERY INTERVAL
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (RemainingStudyTimeInSeconds == 0 && zahler == zahlerTotal) {
            zahler++;
            document.getElementById("intervals-information").innerText = (zahler + " / " + AmountOfIntervals);
            counterContext.clearRect(0, 0, counterWidth, counterHeight);
            counterContext.strokeStyle = 'white';
            counterContext.fillText("FINISHED", 100, 110);
            counterContext.beginPath();
            counterContext.arc(100, 100, 90, 1.5, 4.72 * Math.PI);
            counterContext.stroke();
            var sound = document.getElementById('myAudio');
            sound.play();
            clearInterval(myInterval);
        }
    }, 1000);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // LOOP FOR THE INTERVAL END
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTROL THE APPLICATION
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var button = document.getElementById('form-submit-button');
button.addEventListener('click', function () {
    //GET THE VALUES OF THE USER INPUT FROM THE FORM
    var userInput = getUserInput();
    var valueFromIntervals = userInput.valueFromIntervals;
    var valueFromStudyTime = userInput.valueFromStudyTime;
    var valueFromBreakTime = userInput.valueFromBreakTime;
    //ONLY IF THE VALUES ARE BIGGER THAN ONE EXECUTE THE FOLLOWING CODE
    if (valueFromIntervals >= 1 && valueFromStudyTime >= 1 && valueFromBreakTime >= 1) {
        //FLIP THE CARD, SHOW THE BUTTON AND THE INFORMATION BOX
        document.getElementById('front-side').style.transform = "rotateY(-180deg)";
        document.getElementById('back-side').style.transform = "rotateY(0deg)";
        document.getElementById('information-box').style.bottom = "0";
        document.getElementById('new-timer-button').style.top = "20px";
        //AFTER 1 SECOND TAKE THE VALUES FROM THE FORM AND EXECUTE THE STUDYTIMER-FUNCTION
        setTimeout(function () {
            var userInput = getUserInput();
            var valueFromIntervals = userInput.valueFromIntervals;
            var valueFromStudyTime = userInput.valueFromStudyTime;
            var valueFromBreakTime = userInput.valueFromBreakTime;
            studyTimeCounter(valueFromIntervals, valueFromStudyTime, valueFromBreakTime);
        }, 1000);
    }
});
