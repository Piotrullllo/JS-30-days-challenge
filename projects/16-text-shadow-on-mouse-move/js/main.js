const textContainer = document.querySelector('.text');
let color1 = 'red';
let color2 = 'blue';

function handleShadowsUpdateMouse(e){
    const objectInfo = textContainer.getBoundingClientRect();
    const centerX = objectInfo.left+objectInfo.width/2;
    const centerY = objectInfo.top+objectInfo.height/2;
    const offsetX = (e.clientX-centerX)/8;
    const offsetY = (e.clientY-centerY)/8;
    const shadow1 = `${offsetX}px ${offsetY}px 0 ${color1}`;
    const shadow2 = `${-offsetX}px ${-offsetY}px 0 ${color2}`;
    textContainer.style["textShadow"] = `${shadow1},${shadow2}`;
}

window.addEventListener('mousemove', handleShadowsUpdateMouse);
