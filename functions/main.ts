/////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONTROL THE MENU
/////////////////////////////////////////////////////////////////////////////////////////////////////////


let menu = document.getElementById("hamburger");
let menuBackground = document.getElementById("menu-background");
let navigation = document.getElementById("navigation");
let navigationItems:any = document.getElementsByClassName("navigation-item");
let numberOfNavitionItems = navigationItems.length;

menu.addEventListener("click", function() {

   menu.classList.toggle("is-active");
   menuBackground.classList.toggle("is-expanded");
   navigation.classList.toggle("is-inviewport")
   console.log(numberOfNavitionItems);

    let counter = 0;
    let i;

    for (i = 0; i < numberOfNavitionItems ; i++) {
        console.log(navigationItems[i]);
        navigationItems[i].classList.toggle("is-visible");
    }

});


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET THE USER INPUT
/////////////////////////////////////////////////////////////////////////////////////////////////////////


function getUserInput() {

    let intervals: any = document.getElementById('intervals');
    let studyTime: any = document.getElementById('studytime');
    let breakTime: any = document.getElementById('breaktime');

    let valueFromIntervals: any = intervals.value;
    let valueFromStudyTime: any = studyTime.value;
    let valueFromBreakTime: any = breakTime.value;


    return {
        valueFromIntervals: valueFromIntervals,
        valueFromStudyTime: valueFromStudyTime,
        valueFromBreakTime: valueFromBreakTime

    }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// RUN THE TIMER
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function studyTimeCounter(intervals: number, studyTime: number, breakTime: number): any {


        var switcher = 0;
        var zahler: any = 0;
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

        let totalGoal = (zahlerTotal) * (studyTimeInSeconds + breakTimeInSeconds) + studyTimeInSeconds + 1;
        let secondCounter: number = 0;

        let newTimerButton = document.getElementById('new-timer-button');
        let newTimerButtonMobile = document.getElementById('new-timer-button-mobile');

        document.getElementById("intervals-information").innerText = (zahler + " / " + intervals);
        document.getElementById("studytime-information").innerText = (studyTimeInMinutes + " MINS");
        document.getElementById("breaktime-information").innerText = (breaktimeInMinutes + " MINS");
        document.getElementById("progress-information").innerText = ("0" + "%");


        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // LOOP FOR THE INTERVAL START
        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        let myInterval = setInterval(function () {

            //CLEAR THE INTERVAL WHEN USER PRESS "SET A NEW TIMER" BUTTON AND HIDE THE INFORMATION BOX
            newTimerButton.addEventListener('click', function() {

                clearInterval(myInterval);

                setTimeout(function() {
                    document.getElementById('new-timer-button').style.top="-50px";
                    document.getElementById('new-timer-button-mobile').style.top="-50px";
                    document.getElementById('information-box').style.bottom="-600px";
                    document.getElementById('front-side').style.transform="rotateY(0deg)";
                    document.getElementById('back-side').style.transform="rotateY(180deg)";
                }, 500);

            });

            newTimerButtonMobile.addEventListener('click', function() {

                clearInterval(myInterval);

                setTimeout(function() {
                    document.getElementById('new-timer-button').style.top="-50px";
                    document.getElementById('new-timer-button-mobile').style.top="-50px";
                    document.getElementById('information-box').style.bottom="-600px";
                    document.getElementById('front-side').style.transform="rotateY(0deg)";
                    document.getElementById('back-side').style.transform="rotateY(180deg)";
                }, 500);

            });





            //CALCULATE THE PROGRESS INFORMATION
            let progress = (100 / totalGoal) * secondCounter;
            progress = Math.ceil(progress);
            document.getElementById("progress-information").innerText = (progress + "%");
            secondCounter++;


                /////////////////////////////////////////////////////////////////////////////////////////////////////////
                // IF THE SWITCH HAS A EVEN VALUE ITS STUDTIME
                /////////////////////////////////////////////////////////////////////////////////////////////////////////

                if(switcher % 2 == 0){

                var seconds: any = RemainingStudyTimeInSeconds;
                var minutes: any = Math.floor(seconds / 60);
                var hours: any = Math.floor(minutes / 60);

                seconds %= 60;
                minutes %= 60;
                hours %= 60;

                seconds =   (seconds < 10)  ? "0" + seconds : seconds;
                minutes =   (minutes < 10)  ? "0" + minutes : minutes;
                hours =     (hours < 10)    ? "0" + hours : hours;

                let remainingTime = (hours + ":" + minutes + ":" + seconds);

                var counter: any = document.getElementById('counter');
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


                if (switcher % 2 == 0){
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
                    switcher++
                } else {
                    RemainingStudyTimeInSeconds--;
                }



                    /////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // IF THE SWITCH HAS A UNEVEN VALUE ITS BREAKTIME
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////

                    } else if (switcher % 2 != 0)  {

                        var seconds: any = RemainingBreakTimeInSeconds;
                        var minutes: any = Math.floor(seconds / 60);
                        var hours: any = Math.floor(minutes / 60);

                        seconds %= 60;
                        minutes %= 60;
                        hours %= 60;

                        seconds =   (seconds < 10)  ? "0" + seconds : seconds;
                        minutes =   (minutes < 10)  ? "0" + minutes : minutes;
                        hours =     (hours < 10)    ? "0" + hours : hours;

                        let remainingTime = (hours + ":" + minutes + ":" + seconds);

                        var counter: any = document.getElementById('counter');
                        var counterContext = counter.getContext('2d');
                        var pointToFill = 4.72;
                        var counterWidth = counterContext.canvas.width;
                        var counterHeight = counterContext.canvas.height;
                        var difference;

                        difference = ((RemainingBreakTimeInSeconds / breakTimeInSeconds) * Math.PI * 2 * 10);
                        counterContext.clearRect(0, 0, counterWidth, counterHeight);
                        counterContext.lineWidth = 10;
                        counterContext.fillStyle = 'white';

                        if (switcher % 2 != 0){
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
                    } else {
                        RemainingBreakTimeInSeconds--;
                    }


                }

            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            // CHECK IF THE TIME IS UP AFTER EVERY INTERVAL
            /////////////////////////////////////////////////////////////////////////////////////////////////////////

                if (RemainingStudyTimeInSeconds == 0 && zahler == zahlerTotal) {
                    zahler ++;
                    document.getElementById("intervals-information").innerText = (zahler + " / " + AmountOfIntervals);
                    counterContext.clearRect(0, 0, counterWidth, counterHeight);
                    counterContext.strokeStyle = 'white';
                    counterContext.fillText("FINISHED", 100, 110);
                    counterContext.beginPath();
                    counterContext.arc(100, 100, 90, 1.5, 4.72 * Math.PI);
                    counterContext.stroke();
                    let sound: any = document.getElementById('myAudio');
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

let button = document.getElementById('form-submit-button');

button.addEventListener('click', function() {


    //GET THE VALUES OF THE USER INPUT FROM THE FORM
    let userInput: any = getUserInput();
    let valueFromIntervals: any = userInput.valueFromIntervals;
    let valueFromStudyTime: any = userInput.valueFromStudyTime;
    let valueFromBreakTime: any = userInput.valueFromBreakTime;

    //ONLY IF THE VALUES ARE BIGGER THAN ONE EXECUTE THE FOLLOWING CODE
    if (valueFromIntervals >= 1 && valueFromStudyTime  >= 1 && valueFromBreakTime  >= 1) {

        //FLIP THE CARD, SHOW THE BUTTON AND THE INFORMATION BOX
        document.getElementById('front-side').style.transform="rotateY(-180deg)";
        document.getElementById('back-side').style.transform="rotateY(0deg)";
        document.getElementById('information-box').style.bottom="0";
        document.getElementById('new-timer-button').style.top="20px";
        document.getElementById('new-timer-button-mobile').style.top="20px";

        //AFTER 1 SECOND TAKE THE VALUES FROM THE FORM AND EXECUTE THE STUDYTIMER-FUNCTION
        setTimeout(function() {

            let userInput = getUserInput();
            let valueFromIntervals = userInput.valueFromIntervals;
            let valueFromStudyTime = userInput.valueFromStudyTime;
            let valueFromBreakTime = userInput.valueFromBreakTime;

            studyTimeCounter(valueFromIntervals, valueFromStudyTime, valueFromBreakTime);

        }, 1000);

    }

});











