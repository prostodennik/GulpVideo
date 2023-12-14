// let video;
// video = document.querySelector('video');
// const fps = 60;
// const width = 1440;
// const height = 720;
// let canvasInterval;
// canvasInterval = null;
// //
// window.onload = function () {
//     canvasInterval = setInterval(drawCanvas, 1000 / fps);
//
//     function drawCanvas() {
//         const canvas = document.querySelector('canvas');
//         const ctx = canvas.getContext('2d');
//         ctx.drawImage(video, 0, 0, width, height);
//     }
// };

// window.onscroll = function () {
//     const canvas = document.querySelector('canvas');
//     const ctx = canvas.getContext('2d');
//     ctx.drawImage(video, 0, 0, width, height);
//
//     video.play();
//
//     if (canvasInterval) {
//         clearInterval(canvasInterval);
//         canvasInterval = null;
//     }
// }

let totalImages = 894; // Wow, so many images for such a short clip
let images = [];
for (let i = 3; i < totalImages + 3; i++) {
    let filename = 'frame-';
    if (i < 10) filename += '00000';
    else if (i < 100) filename += '0000';
    else if (i < 1000) filename += '000';
    filename += i + '.jpg';
    let img = new Image;
    img.src = './images/jpg/' + filename;
    images.push(img);
}
let canv = document.querySelector('canvas');
let context = canv.getContext('2d');

//после загрузки отрисовываем в канвас первую картинку
images[0].onload = function () {
    context.drawImage(images[0], 0, 0, 1280, 720);
}


let currentLocation = 0;

let setImage = function (newLocation) {
    context.drawImage(images[newLocation], 0, 0, 1280, 720);
}
let wheelDistance = function (evt) {
    if (!evt) evt = event;
    let w = evt.wheelDelta, d = evt.detail;
    if (d) {
        if (w) return w / d / 40 * d > 0 ? 1 : -1;
        else return -d / 3;
    } else return w / 120;
};
let wheelDirection = function (evt) {
    if (!evt) evt = event;
    return (evt.detail < 0) ? 1 : (evt.wheelDelta > 0) ? 1 : -1;
};

let MouseWheelHandler = function (e) {
    e.preventDefault(); // No scroll

    // The following equation will return either a 1 for scroll down
    // or -1 for a scroll up
    let distance = wheelDistance(e);
    let direction = wheelDirection(e);

    // This code mostly keeps us from going too far in either direction
    currentLocation -= Math.round(distance * 5);
    if (currentLocation < 0) currentLocation = 0;
    if (currentLocation >= images.length)
        currentLocation = images.length - 1;

    // See below for the details of this function
    console.log("currentLocation", currentLocation, distance);
    setImage(currentLocation);
};
let canvasFillWin = function (e) {
    // let h = 720;
    // let w = 1280;
    // let ratio = h / w;
    // let winW = $(window).width();
    // let winH = $(window).height();
    // let winRatio = winH / winW;


    // if (winRatio > ratio) {
    //     $(canv).width(winH / ratio).height(winH).css({
    //             marginLeft: -winH / ratio / 2 + "px",
    //             left: "50%",
    //             top: "0",
    //             marginTop: "0"
    //         });
    // } else {
    //     $(canv)
    //         .width(winW)
    //         .height(winW * ratio)
    //         .css({
    //             marginLeft: "0",
    //             left: "0",
    //             top: "50%",
    //             marginTop: -winW * ratio / 2 + "px"
    //         });
    // }

}
// IE9, Chrome, Safari, Opera
window.addEventListener("mousewheel", MouseWheelHandler, false);
// Firefox
window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
window.addEventListener("resize", canvasFillWin, false);
setImage(4);
canvasFillWin();







