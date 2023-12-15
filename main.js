"use strict";
let canvas;
window.onload = function() {
    canvas = document.getElementById("viewport");
    const ctx = canvas.getContext("2d");

    const size = Number(document.getElementById("viewport").getAttribute("width"));
    let imageData = ctx.getImageData(0,0,size,size);  
    
    paint_it_black(imageData, size)

    //generate//
    
    for (let y = 0; y < size; y++){
        for (let x = -0; x < size; x++){
            let r,g,b = 0;
            
            if (y > 0 && x > 0){

                switch ((x%2 + y%2)) {
                    case 2:
                        r = Math.floor((y/64)*255);
                        break;
                    case 0:
                        g = Math.floor((x/64)*255);
                        break;
                    default:
                        b = 180 - Math.floor((x+y)/128*255);
                }

            set_pixel(imageData,x,y,r,g,b)
            }  
        }   
    }
    paint_canvas(imageData, ctx);
}


function paint_canvas(data,context){
    context.putImageData(data,0,0);
}

function get_link(canvas){
    const dataUrl = canvas.toDataURL();
    console.log(dataUrl);
    return dataUrl;
}

function set_png(canvas){
    document.getElementById("download").setAttribute("src",get_link(canvas));
}

function get_pixel(array, x, y){
    let R = array[(y *64 + x) *4];
    let G = array[(y *64 + x) *4 +1];
    let B = array[(y *64 + x) *4 +2];
    let A = array[(y *64 + x) *4 +3];
    return [R,G,B,A];
}

function set_pixel(imgData,x,y,R,G,B){
    imgData.data [(y *64 + x) *4] = R  ;
    imgData.data [(y *64 + x) *4 +1] = G;
    imgData.data [(y *64 + x) *4 +2] = B;
    imgData.data [(y *64 + x) *4 +3] = 255;
}


function paint_it_black(imgData, size){
    for (let x = 0; x < size; x++){
        for (let y = 0; y < size; y++){
            set_pixel(imgData,x,y,0,0,0);
        }
    }
}