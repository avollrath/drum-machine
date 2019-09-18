const allBtns = document.querySelectorAll(".buttons__btn");
const allIndicators = document.querySelectorAll(".buttons__indicator");

let step = 1;

// add light toggle to buttons

allBtns.forEach(btn =>
  btn.addEventListener("click", function() {
    btn.classList.toggle("lit");
  })
);




setInterval(function(){ 
    
    

    allIndicators.forEach(indicator => {

        indicator.classList.remove("indi-lit");

        if (indicator.dataset.indicator == step) {
          indicator.classList.toggle("indi-lit");
        }
      });
    
    
        step < 8 ? step++ : step = 1;



}, 300);




