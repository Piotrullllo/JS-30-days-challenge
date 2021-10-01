const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const inputs = document.querySelectorAll('.tools input');
const buttons = document.querySelectorAll('.tools button');

let isDrawing = false;
let mode = 'br';
let lastX = 0;
let lastY = 0;
let thickness = 20;
let mainColor = '#000000';
let secondColor = '#FFFFFF';

function handleUpdate(){
    if(this.name == 'thickrange'){
        thickness = this.value;
    } else if(this.name == 'mainclr'){
        mainColor = this.value;
    } else if(this.name == 'secClr'){
        secondColor = this.value;
    }  
}

function modeChange(){
    buttons.forEach(but =>{
        but.disabled = false
    });
    mode = this.value;
    this.disabled = true;
    console.log(mode);
}

function draw(e){
    if(!isDrawing)return;
    if(mode == 'br'){
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = mainColor;
    } else if (mode == 'er'){
         ctx.lineJoin = "square";
        ctx.lineCap = "square";
        ctx.strokeStyle = secondColor;
    }
    ctx.lineWidth = thickness;
    ctx.beginPath();
    // starts from
    ctx.moveTo(lastX, lastY);
    // goes to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}


canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
inputs.forEach(input => input.addEventListener('change', handleUpdate));
buttons.forEach(button => button.addEventListener('click', modeChange));