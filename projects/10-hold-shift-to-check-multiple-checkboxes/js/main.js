const checks = document.querySelectorAll(".list input[type='checkbox']");

let lastChecked;

function handleCheck(e){
    let inBetween = false;
    if(e.shiftKey && lastChecked != this){
        checks.forEach(item =>{
            if(item === this || item === lastChecked){
                inBetween = !inBetween;
            }
            if(inBetween && this.checked == true){
                item.checked = true;
            } else if (inBetween && this.checked == false){
                item.checked = false;
            }
        });
    }
    lastChecked = this;
}

checks.forEach(item => item.addEventListener('click', handleCheck));