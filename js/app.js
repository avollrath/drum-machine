const allBtns = document.querySelectorAll(".buttons__btn");
const allIndicators = document.querySelectorAll(".buttons__indicator");
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const soundBtns = document.querySelectorAll(".left-panel__btn");
const bpmBtn = document.querySelector(".bpm-btn");
const presetBtn = document.querySelector(".preset-btn");

let step = 1;
let speed = 2;
let playing = 0;
let playFunction;

let kickSound = 1;
let snareSound = 1;
let tomSound = 1;
let hihatSound = 1;
let fxSound = 1;



const volumeControl = document.querySelector(".volume");

const setVolume = function() {
 
  kick.channels.forEach(channel => (channel.resource.volume = this.value / 10));
  snare.channels.forEach(
    channel => (channel.resource.volume = this.value / 10)
  );
  tom.channels.forEach(channel => (channel.resource.volume = this.value / 10));
  hihat.channels.forEach(
    channel => (channel.resource.volume = this.value / 10)
  );
  fx.channels.forEach(
    channel => (channel.resource.volume = this.value / 10)
  );
};

volumeControl.addEventListener("change", setVolume);
volumeControl.addEventListener("input", setVolume);



const channelVolumes = document.querySelectorAll(".channel-volume");

const setChannelVolume = function(instrument, value) {

    if (instrument == "kick") {
        kick.channels.forEach(
            channel => (channel.resource.volume = value / 10))}
    

    else if (instrument == "snare") {
    snare.channels.forEach(
      channel => (channel.resource.volume = value / 10)
    )}

    else if (instrument == "tom") {
    tom.channels.forEach(channel => (channel.resource.volume = value / 10))}

    else if (instrument == "hihat") {
    hihat.channels.forEach(
      channel => (channel.resource.volume = value / 10)
    )}
    else if (instrument == "fx") {
    fx.channels.forEach(
      channel => (channel.resource.volume = value / 10)
    );
  };

};

channelVolumes.forEach(slider => {


    slider.addEventListener("change", function(){setChannelVolume(slider.dataset.channel, this.value) });
 slider.addEventListener("input", function(){setChannelVolume(slider.dataset.channel, this.value) });

})





bpmBtn.addEventListener("click", function() {
  document
    .querySelector(`.bpm[data-bpm="${speed}"]`)
    .classList.remove("active");
  speed = speed == 3 ? (speed = 1) : speed + 1;
  document.querySelector(`.bpm[data-bpm="${speed}"]`).classList.add("active");

  if (playing == 1) {
  clearInterval(playFunction);
  if (speed == 1) interval(200);
  else if (speed == 2) interval(150);
  else if (speed == 3) interval(100);
  }
  else return;

});

soundBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    
    if (this.classList.contains("kick")) {
      document
        .querySelector(`.dot[data-dot="kick${kickSound}"]`)
        .classList.remove("active");
      kickSound = kickSound == 9 ? (kickSound = 1) : kickSound + 1;
      document
        .querySelector(`.dot[data-dot="kick${kickSound}"]`)
        .classList.add("active");
      kick = new Switcher(`../assets/sounds/kick${kickSound}.wav`, 16);
    }

    if (this.classList.contains("snare")) {
      document
        .querySelector(`.dot[data-dot="snare${snareSound}"]`)
        .classList.remove("active");
      snareSound = snareSound == 9 ? (snareSound = 1) : snareSound + 1;
      document
        .querySelector(`.dot[data-dot="snare${snareSound}"]`)
        .classList.add("active");
      snare = new Switcher(`../assets/sounds/snare${snareSound}.wav`, 16);
    }

    if (this.classList.contains("tom")) {
      document
        .querySelector(`.dot[data-dot="tom${tomSound}"]`)
        .classList.remove("active");
      tomSound = tomSound == 9 ? (tomSound = 1) : tomSound + 1;
      document
        .querySelector(`.dot[data-dot="tom${tomSound}"]`)
        .classList.add("active");
      tom = new Switcher(`../assets/sounds/tom${tomSound}.wav`, 16);
    }

    if (this.classList.contains("hihat")) {
      document
        .querySelector(`.dot[data-dot="hihat${hihatSound}"]`)
        .classList.remove("active");
      hihatSound = hihatSound == 9 ? (hihatSound = 1) : hihatSound + 1;
      document
        .querySelector(`.dot[data-dot="hihat${hihatSound}"]`)
        .classList.add("active");
      hihat = new Switcher(`../assets/sounds/hihat${hihatSound}.wav`, 16);
    }

    if (this.classList.contains("fx")) {
        document
          .querySelector(`.dot[data-dot="fx${fxSound}"]`)
          .classList.remove("active");
        fxSound = fxSound == 9 ? (fxSound = 1) : fxSound + 1;
        document
          .querySelector(`.dot[data-dot="fx${fxSound}"]`)
          .classList.add("active");
       fx = new Switcher(`../assets/sounds/fx${fxSound}.wav`, 16);
      }
  });
});



kick = new Switcher("../assets/sounds/kick1.wav", 16);
snare = new Switcher("../assets/sounds/snare1.wav", 16);
tom = new Switcher("../assets/sounds/tom1.wav", 16);
hihat = new Switcher("../assets/sounds/hihat1.wav", 16);
fx = new Switcher("../assets/sounds/fx1.wav", 16);

function Channel(audio_uri) {
  this.audio_uri = audio_uri;
  this.resource = new Audio(audio_uri);
}

Channel.prototype.play = function() {
  this.resource.play();
};

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
};

// add light toggle to buttons

allBtns.forEach(btn =>
  btn.addEventListener("click", function() {
    btn.classList.toggle("lit");

    if (btn.classList.contains("lit")){
    switch (btn.dataset.row) {
        case "1": 
        kick.play()
        break;
        
        case "2":
        snare.play();
        break;

        case "3": 
        tom.play();
        break;

        case "4":
        hihat.play();
        break;

        case "5":
        fx.play();
        break;

    }
}
  })
);

const interval = bpm => {
  playFunction = setInterval(function() {
    allBtns.forEach(btn => {
      btn.style.filter = "none";

      if (
        btn.classList.contains("lit") &&
        btn.dataset.row == 1 &&
        btn.dataset.btn == step
      ) {
        kick.play();
        btn.style.filter = "brightness(1.3)";
      }
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
      ) {
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
      if (
        btn.classList.contains("lit") &&
        btn.dataset.row == 5 &&
        btn.dataset.btn == step
      ) {
        fx.play();
        btn.style.filter = "brightness(1.3)";
      }

    });

    allIndicators.forEach(indicator => {
      indicator.classList.remove("indi-lit");

      if (indicator.dataset.indicator == step) {
        indicator.classList.toggle("indi-lit");
      }
    });

    step < 16 ? step++ : (step = 1);
  }, bpm);
};

const start = () => {
  playing = 1;

  playBtn.classList.add("lit");
  pauseBtn.classList.remove("lit");

  pauseBtn.addEventListener("click", function() {
    if (playing === 1) {
      playBtn.classList.remove("lit");
      pauseBtn.classList.add("lit");
      clearInterval(playFunction);
      playing = 0;
    } else if (playin === 0) {
      clearInterval(playFunction);
      playing = 1;
      start();
    }
  });

  clearInterval(playFunction);
  if (speed == 1) interval(200);
  else if (speed == 2) interval(150);
  else if (speed == 3) interval(100);

  stopBtn.addEventListener("click", function() {
    clearInterval(playFunction);

    allBtns.forEach(btn => {
      btn.style.filter = "none";
    });

    playBtn.classList.remove("lit");
    pauseBtn.classList.remove("lit");
    clearInterval(interval);
    allBtns.forEach(btn => btn.classList.remove("lit"));
    allIndicators.forEach(indicator => {
      indicator.classList.remove("indi-lit");
    });
    step = 1;
  });
};

playBtn.addEventListener("click", start);


const presetHouse = () => {

    clearInterval(playFunction);
    step = 1;
    speed = 3;
    playBtn.classList.add("lit");
    pauseBtn.classList.remove("lit");

allBtns.forEach(btn => btn.classList.remove("lit"));
allIndicators.forEach(i => i.classList.remove("indi-lit"));
document.querySelectorAll(".dot").forEach(dot => dot.classList.remove("active"));


document.querySelectorAll(".bpm").forEach(bpm => bpm.classList.remove("active"));
document.querySelector(`.bpm[data-bpm="3"]`).classList.add("active");

document.querySelector(".preset[data-preset='house'").classList.add("active");


//kick 

kickSound = 6;
document.querySelector(`.dot[data-dot="kick6"]`).classList.add("active");
kick = new Switcher(`../assets/sounds/kick6.wav`, 16);

document.querySelector('.buttons__btn[data-btn="1"][data-row="1"]').classList.add("lit");
document.querySelector('.buttons__btn[data-btn="5"][data-row="1"]').classList.add("lit");
document.querySelector('.buttons__btn[data-btn="9"][data-row="1"]').classList.add("lit");
document.querySelector('.buttons__btn[data-btn="13"][data-row="1"]').classList.add("lit");

//snare

snareSound = 1;
document.querySelector(`.dot[data-dot="snare1"]`).classList.add("active");
snare = new Switcher(`../assets/sounds/snare1.wav`, 16);

document.querySelector('.buttons__btn[data-btn="5"][data-row="2"]').classList.add("lit");
document.querySelector('.buttons__btn[data-btn="13"][data-row="2"]').classList.add("lit");

//tom

tomSound = 9;
document.querySelector(`.dot[data-dot="tom9"]`).classList.add("active");
tom = new Switcher(`../assets/sounds/tom9.wav`, 16);
document.querySelector('.buttons__btn[data-btn="12"][data-row="3"]').classList.add("lit");
document.querySelector('.buttons__btn[data-btn="15"][data-row="3"]').classList.add("lit");

//hihat

hihatSound = 5;
document.querySelector(`.dot[data-dot="hihat5"]`).classList.add("active");
hihat = new Switcher(`../assets/sounds/hihat5.wav`, 16);

document.querySelector('.buttons__btn[data-btn="3"][data-row="4"]').classList.add("lit");
document.querySelector('.buttons__btn[data-btn="7"][data-row="4"]').classList.add("lit");
document.querySelector('.buttons__btn[data-btn="11"][data-row="4"]').classList.add("lit");
document.querySelector('.buttons__btn[data-btn="15"][data-row="4"]').classList.add("lit");

//fx
fxSound = 4;
document.querySelector(`.dot[data-dot="fx4"]`).classList.add("active");
fx = new Switcher(`../assets/sounds/fx4.wav`, 16);

document.querySelector('.buttons__btn[data-btn="4"][data-row="5"]').classList.add("lit");
document.querySelector('.buttons__btn[data-btn="7"][data-row="5"]').classList.add("lit");


start();

}


presetBtn.addEventListener("click" , presetHouse);
