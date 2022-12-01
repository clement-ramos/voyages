const scrollable = document.querySelector('.scrollable');
const stickyProject = document.querySelector('.project');

let images = [...document.querySelectorAll('.rotate-img')];

let current = 0;
let target = 0;
const ease = 0.1;

function lerp(start, end, t){
    return start * (1 - t) + end * t;
}

function init(){
    document.body.style.height = `${scrollable.getBoundingClientRect().height}px`;
}

function smoothScroll(){
    target = window.scrollY;
    current = lerp(current, target, ease);
    scrollable.style.transform = `translate3d(0, ${-current}px, 0)`;
    sticky();
    animateImages();
    window.requestAnimationFrame(smoothScroll);
}

function sticky(){
    let offset = window.innerHeight * 2;
    // console.log(offset);
    // console.log(current);
    if(current < offset){
        stickyProject.style.transform = `translate3d(0, 0, 0)`;
    }
    if(current >= offset && current <= offset * 2){
        // for(let j = 0; j < 1; j++){
        //     stickyProject.style.transform = `translate3d(0, ${(current - offset) * 2}px, 0)`;
        // }
        stickyProject.style.transform = `translate3d(0, ${(current - offset) * 2}px, 0)`;
    }
    if(current >  offset * 1.5){
        stickyProject.style.transform = `translate3d(0, ${offset * 1}px, 0)`;
    }
}

function animateImages(){
    for(let i = 0; i < images.length; i++){
        
        let { top } = images[i].getBoundingClientRect();
        if(i % 2 == 0){
            // images[i].style.transform = `rotate(${top * 0.03}deg )`;
            images[i].style.transform = `translateX(${top * 0.09}px )`;
        }else{
            // images[i].style.transform = `rotate(${(top * 0.03 * -1)}deg )`;
            images[i].style.transform = `translateX(${(top * 0.09 * -1)}px )`;
        } 
    }
}

init()
smoothScroll()