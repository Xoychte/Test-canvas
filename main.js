"use strict";
let canvas;

let BLACK = [0,0,0,255];
let WHITE = [255,255,255,255];

window.onload = function() {
    canvas = document.getElementById("viewport");
    const ctx = canvas.getContext("2d");
    const size = Number(document.getElementById("viewport").getAttribute("width"));
    let imageData = ctx.getImageData(0,0,size,size);  

    paint_it_black(imageData, size);
    generate_initial(size,imageData, ctx);

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

function generate_initial(size,imageData,ctx){
    for (let y = 0; y < size; y++){
        for (let x = 0; x < size; x++){
            let r = 255;
            let g = 255;
            let b = 255;
            let rand = Math.random()
            if (y===0 && rand > 0.99){
                r = 0
                b = 0
                g = 0
                }
            set_pixel(imageData,x,y,r,g,b);
            }  
        }   
    
    paint_canvas(imageData, ctx);
}

function update(){
    const size = Number(document.getElementById("viewport").getAttribute("width"));
    const ctx = canvas.getContext("2d");
    let oldImageData = ctx.getImageData(0,0,size,size); 
    let newImageData = ctx.getImageData(0,0,size,size); 

    /// Make the pixels fall
    for (let y = size; y >= 0; y--){
        for (let x = 0; x < size; x++){
            let oldPixel = get_pixel(oldImageData.data,x,y);
            if (oldPixel.toString() == BLACK.toString()){
                if (size-y > piles[x]){
                    set_pixel(newImageData,x,y,255,255,255);
                    set_pixel(newImageData,x,y+1,0,0,0);
                    if (size-y-1 == piles[x]){
                        piles[x]++
                    }
                }

            }
            if (oldPixel.toString() == BLACK.toString() &&y<size-1){
                
            } else {
                set_pixel(newImageData,x,y,oldPixel[0], oldPixel[1], oldPixel[2])
            }
        }

    }

    /// Add new pixels
    let firstRowSpace = 0;
    for (let x = 0; x<size; x++){
        let oldPixel = get_pixel(oldImageData.data,x,0)
        if (oldPixel.toString() == WHITE.toString()){
            firstRowSpace+=1;
        }
    }
    set_pixel(newImageData,random_position(firstRowSpace),1,0,0,0);
    paint_canvas(newImageData,ctx);
}


function random_position(size){
    return Math.floor(Math.random()*size)
}

function random_color(){
    return Math.floor(Math.random()*255)
}

function start_regenerating(){
    setInterval(update,1)
}

function create_piles(size){
    let piles =[];
    for (let i=0; i<size; i++){
        piles.push(1);
    }
    return piles;
}

let piles = create_piles(64)