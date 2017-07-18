
var soundArray = [];
var gameArray = [];
var mode = -1;
var clicks = 0;
var game;
var myVar;
var strictMode = false;
var strictClick = 0;

var sound0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

//enable array compare
Array.prototype.equals = function (array, strict) {
    if (!array)
        return false;

    if (arguments.length == 1)
        strict = true;

    if (this.length != array.length)
        return false;

    for (var i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i], strict))
                return false;
        }
        else if (strict && this[i] != array[i]) {
            return false;
        }
        else if (!strict) {
            return this.sort().equals(array.sort(), true);
        }
    }
    return true;
}


//plays sound array in 1 sec interval
function playSounds(arr){
    var i = 0;
    
    myVar = setInterval(function(){
        playUniqueSound(arr[i]);
        i++;
        if(i === arr.length){
            clearInterval(myVar);
            console.log("Sounds playing over!");
        }
        
        
    }, 1000);
 
       
}

//plays specific sound and animate block
function playUniqueSound(num){
    
    var originalColor;
    switch(num) {
        case 0:
            sound0.play();
            originalColor = $(".block0").css("background");
            $(".block0").css("background","cyan");
            setTimeout(function(){
              $(".block0").css("background", originalColor);
            }, 500);
            break;
        case 1:
            sound1.play();
            originalColor = $(".block1").css("background");
            $(".block1").css("background","cyan");
            setTimeout(function(){
              $(".block1").css("background", originalColor);
            }, 500);
            break;
        case 2:
            sound2.play();
            originalColor = $(".block2").css("background");
            $(".block2").css("background","cyan");
            setTimeout(function(){
              $(".block2").css("background", originalColor);
            }, 500);
            break;
        case 3:
            sound3.play();
              originalColor = $(".block3").css("background");
            $(".block3").css("background","cyan");
            setTimeout(function(){
              $(".block3").css("background", originalColor);
            }, 500);
          
            break;
       }
}


// return random num
function randNum(){
    return Math.floor(Math.random() * 4);
}
$( document ).ready(function() {
    console.log( "ready!" );

        $(".block0").click(function(){
            sound0.play();
            gameArray.push(0);
            console.log(gameArray);
            clicks++;
            
            //animation
            originalColor = $(".block0").css("background");
            $(".block0").css("background","cyan");
            setTimeout(function(){
              $(".block0").css("background", originalColor);
            }, 500);
        });

          $(".block1").click(function(){
            sound1.play();
            gameArray.push(1);
            console.log(gameArray);
            clicks++;
              
            //animation
            originalColor = $(".block1").css("background");
            $(".block1").css("background","cyan");
            setTimeout(function(){
              $(".block1").css("background", originalColor);
            }, 500);
        });

          $(".block2").click(function(){
            sound2.play();
            gameArray.push(2);
            console.log(gameArray);
            clicks++;
              
            //animation
            originalColor = $(".block2").css("background");
            $(".block2").css("background","cyan");
            setTimeout(function(){
              $(".block2").css("background", originalColor);
            }, 500);
        });

          $(".block3").click(function(){
            sound3.play();
            gameArray.push(3);
            console.log(gameArray);
            clicks++;
              
            //animation
            originalColor = $(".block3").css("background");
            $(".block3").css("background","cyan");
            setTimeout(function(){
              $(".block3").css("background", originalColor);
            }, 500);
        });


        $("#start").click(function(){
             gameArray = [];
            //mode -1 initial status game starts with random num in array
            //mode 0 - game play sounds
            //mode 1 - user input
            //mode 2 - compare arrays
            
            game = setInterval(function(){
              
                if(mode === -1){
                    soundArray.push(randNum());
                    playSounds(soundArray)
                    $(".status").html("");
                    console.log("Now in mode -1");
                    
                    mode = 1;
                }
                
                  if(mode === 0){
                    playSounds(soundArray)
                    $(".status").html("");
                    console.log("Now in mode 0");
                    
                    mode++
                    
                }
                if(mode === 1){
                    //printing score
                    $(".count").html("Count: " + (soundArray.length - 1));
                    console.log("Waitin for user input");
                    if(clicks == soundArray.length){
                        mode++;
                    }
                    
                    if(clicks > 1 & soundArray[clicks - 1] != gameArray[clicks - 1]){
                        
                        if(!strictMode){
                            console.log("STH WENT WRONG :C");
                            console.log(!strictMode);
                            gameArray = [];
                            clicks = 0;
                            mode = 0;
                            $(".status").html("WRONG");
                        
                        }
                        if(strictMode){
                            $(".status").html("GAME OVER!");
                            clicks = 0;
                            gameArray = [];
                            soundArray = [];
                            clearInterval(game);
                            clearInterval(myVar);
                        }


                       
                    }
                }
                if(mode === 2){
                    console.log("comparing arrays")
                    console.log(soundArray);
                    console.log(gameArray);
                    if(gameArray.equals(soundArray)){
                        console.log("arrays the same! proceeding");
                        //add new sound
                        soundArray.push(randNum());
                        //back to the beggining of loop
                        mode = 0;
                        //reseting clicks number 
                        clicks = 0;
                        //reseting game array
                        gameArray = [];
                    }
                    else{
                        console.log("arrays not the same ;C game over");
                                 if(!strictMode){
                            console.log("STH WENT WRONG :C");
                            console.log(!strictMode);
                            gameArray = [];
                            clicks = 0;
                            mode = 0;
                            $(".status").html("WRONG");
                        
                        }
                        if(strictMode){
                            $(".status").html("GAME OVER!");
                            clicks = 0;
                            gameArray = [];
                            soundArray = [];
                            clearInterval(game);
                            clearInterval(myVar);
                        }
                        
                    }
                }
                
                
               
            },800)
              




        });

        $("#reset").click(function(){
            clearInterval(game);
            clearInterval(myVar);
            $(".count").html("Count: " + 0);
            mode = 0;
            clicks = 0;
            gameArray = [];
            soundArray = [];
        });
    
        $("#strict").click(function(){
            // do dopisania
            if(strictClick == 0) {
                console.log("mode on" + strictClick)
                strictMode = true;
                $("#strict").html("Strict: on")
                strictClick++;
            }
            else{
                console.log("mode off")
                strictMode = false;
                $("#strict").html("Strict: off")
                strictClick--;
            }
  

        })
    
});