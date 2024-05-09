const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function draw(context){
    //TODO
}

if(!context) alert('Canvas ')
else{
    //usa a altura e largura default do navegador
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //console.log(canvas);
    draw(context);
    //console.log(context);
}