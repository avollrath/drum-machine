const allBtns = document.querySelectorAll(".buttons__btn");
const allIndicators = document.querySelectorAll(".buttons__indicator");
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");





let step = 1;

kick  = new Switcher('../assets/sounds/kick.wav', 8);
snare  = new Switcher('../assets/sounds/snare.wav', 8);
tom  = new Switcher('../assets/sounds/tom.wav', 8);
hihat  = new Switcher('../assets/sounds/hihat.wav', 8);


function Channel(audio_uri) {
	this.audio_uri = audio_uri;
	this.resource = new Audio(audio_uri);
}

Channel.prototype.play = function() {
	this.resource.play();
}

function Switcher(audio_uri, num) {
	this.channels = [];
	this.num = num;
	this.index = 0;

	for (var i = 0; i < num; i++) {
		this.channels.push(new Channel(audio_uri));
	}
}

Switcher.prototype.play = function() {
	this.channels[this.index++].play();
	this.index = this.index < this.num ? this.index : 0;
}



// add light toggle to buttons

allBtns.forEach(btn =>
  btn.addEventListener("click", function() {
    btn.classList.toggle("lit");
  })
);





const start = () => {

    let playing = 1;


    playBtn.classList.add("lit")
    pauseBtn.classList.remove("lit")

    pauseBtn.addEventListener("click", function(){

        if (playing === 1) {
    playBtn.classList.remove("lit")
    pauseBtn.classList.add("lit")
        clearInterval(interval);
        playing = 0;
        }

        else if (playin === 0) {

            clearInterval(interval);
            playing = 1;
            start();

        }
    });


    stopBtn.addEventListener("click", function(){

        playBtn.classList.remove("lit")
        pauseBtn.classList.remove("lit")
            clearInterval(interval);
            allBtns.forEach(btn => btn.classList.remove("lit"));
            allIndicators.forEach(indicator => {indicator.classList.remove("indi-lit")});
            step = 1;
        });

    

    const interval = setInterval(function() {
        allBtns.forEach(btn => {
      
          btn.style.filter = "none";
      
          if (
            btn.classList.contains("lit") &&
            btn.dataset.row == 1 &&
            btn.dataset.btn == step
          ){
            kick.play();
            btn.style.filter = "brightness(1.3)";}
          if (
            btn.classList.contains("lit") &&
            btn.dataset.row == 2 &&
            btn.dataset.btn == step
          ) {
            snare.play();
            btn.style.filter = "brightness(1.3)";
            }
          if (
            btn.classList.contains("lit") &&
            btn.dataset.row == 3 &&
            btn.dataset.btn == step
          ){
            tom.play();
            btn.style.filter = "brightness(1.3)";
            }
          if (
            btn.classList.contains("lit") &&
            btn.dataset.row == 4 &&
            btn.dataset.btn == step
          ) {
            hihat.play();
            btn.style.filter = "brightness(1.3)";
           }
        });
      
        allIndicators.forEach(indicator => {
          indicator.classList.remove("indi-lit");
      
          if (indicator.dataset.indicator == step) {
            indicator.classList.toggle("indi-lit");
          }
        });
      
        step < 8 ? step++ : (step = 1);
      }, 300);



}


playBtn.addEventListener("click", start);



