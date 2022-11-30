let scene;
let camera;
let renderer;
let hold;
let lastmousepos;
let zoom = false;
let nav = false;
let zoomX;
let zoomY;
let country_name;
let earth_scale = 0.5;
let intro = false;
let night_button = document.querySelector('input');
let night = false;
let day = false;

function main()
{
    let canv = document.querySelector('canvas');
    canv.classList.add("load");
    addEventListener('mousedown', () => {
        hold = true
        return hold
    })
    addEventListener('mouseup', () => {
        hold = false
        return hold
    })

    addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / innerWidth)
        * 2 - 1
    })

    const canvas = document.querySelector('#c');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    camera.position.x = 0;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true,});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.autoClear = false;
    renderer.setClearColor(0x00000, 0.0);


    // earthgeometry

    const earthgeometry = new THREE.SphereGeometry(earth_scale,256,256);

    const earthmaterial = new THREE.MeshPhongMaterial({
        roughness : 1,
        metalness:0,
        map: THREE.ImageUtils.loadTexture('texture/snapbuilder.png'),
        specularMap: THREE.ImageUtils.loadTexture('texture/map/map_spec.png'),
        displacementMap: THREE.ImageUtils.loadTexture('texture/map/map_dis.png'),
        displacementScale: 0.15,
    });

    const earthmesh = new THREE.Mesh(earthgeometry,earthmaterial);

    scene.add(earthmesh);

    // ambientlight

    const ambientlight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientlight);

    // point light

    const pointerlight =  new THREE.PointLight(0xffffff,0.9);

    // light position

    pointerlight.position.set(5,3,5);
    scene.add(pointerlight);

    // cloud
    const cloudgeometry =  new THREE.SphereGeometry(earth_scale + 0.1 ,32,32);

    const cloudmaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
        transparent: true,
    });
    // stars

        const stargeometry =  new THREE.SphereGeometry(10,64,64);

        const starmaterial = new THREE.MeshBasicMaterial({

        map: THREE.ImageUtils.loadTexture('texture/galaxy.png'),
        side: THREE.BackSide
    });
    
    const starmesh = new THREE.Mesh(stargeometry,starmaterial);
    
    scene.add(starmesh);

    const cloudmesh = new THREE.Mesh(cloudgeometry,cloudmaterial);
    scene.add(cloudmesh);

    const mouse = {
        x: undefined,
        y: undefined
    }
    camera.position.z = 10;
    const animate = () =>{
        starmesh.rotation.z += 0.0005;
        requestAnimationFrame(animate);
        if(zoom == false) {
            if (hold == true) {
                if (mouse.x >= -0.5 && mouse.x <= 0.5) {
                    earthmesh.rotation.y -= mouse.x / 12;
                    cloudmesh.rotation.y += mouse.x / 12;
                    lastmousepos = mouse.x
                    if(earthmesh.rotation.y > Math.PI*2){
                        earthmesh.rotation.y = 0;
                    }
                    if(earthmesh.rotation.y < 0){
                        earthmesh.rotation.y = Math.PI*2;
                    }
                }
                else{
                    hold = false
                }
            }
            else{
                if( camera.position.z > 2.1){
                    camera.position.z -= 0.06;
                }
                else{
                    if(intro == false)
                    {
                        momo();
                        let nav = document.querySelector('.nav-btn');
                        let night = document.querySelector('.label');
                        nav.classList.remove("hide");
                        night.classList.remove("hide");
                        intro = true;
                    }
                }
                if(night_button.checked == true && night == false){
                    let body = document.querySelector("body");
                    body.classList.add("hide")
                    setTimeout(() => {
                        earthmesh.material = new THREE.MeshPhongMaterial({
                            roughness : 1,
                            metalness:0,
                            map: THREE.ImageUtils.loadTexture('texture/snapbuilder_night.png'),
                            specularMap: THREE.ImageUtils.loadTexture('texture/map/map_spec.png'),
                            displacementMap: THREE.ImageUtils.loadTexture('texture/map/map_dis.png'),
                            displacementScale: 0.15,
                        });
                        cloudmaterial.opacity = 0.3;
                        night = true;
                        day = false;
                     }, 200);
                     setTimeout(() => {
                    body.classList.remove("hide")
                    }, 500);

                }
                if(night_button.checked == false && day == false){
                    let body = document.querySelector("body");
                    body.classList.add("hide")
                    setTimeout(() => {
                        earthmesh.material = new THREE.MeshPhongMaterial({
                            roughness : 1,
                            metalness:0,
                            map: THREE.ImageUtils.loadTexture('texture/snapbuilder.png'),
                            specularMap: THREE.ImageUtils.loadTexture('texture/map/map_spec.png'),
                            displacementMap: THREE.ImageUtils.loadTexture('texture/map/map_dis.png'),
                            displacementScale: 0.15,
                        });
                        cloudmaterial.opacity = 0.3;
                        night = false;
                        day = true;
                     }, 200);
                     setTimeout(() => {
                    body.classList.remove("hide")
                    }, 500);
                }
                if(nav == true){
                    if( camera.position.x <= 0.5){
                        camera.position.x += 0.01;
                    }
                    let title = document.querySelector('.ml2');
                    title.classList.add("hide");
                    let night = document.querySelector('label');
                    night.classList.add("nav");
                }
                if(nav == false){
                    if( camera.position.x >= 0){
                        camera.position.x -= 0.01;
                    }
                    let title = document.querySelector('.ml2');
                    title.classList.remove("hide");
                    let night = document.querySelector('label');
                    night.classList.remove("nav");
                }
                if( camera.position.z <= 2){
                    camera.position.z += 0.02;
                }
                if( earthmesh.rotation.x >= 0){
                    earthmesh.rotation.x -= 0.01;
                }
                if(lastmousepos < 0){
                    cloudmaterial.opacity = 1;
                    earthmesh.rotation.y += 0.002;
                    cloudmesh.rotation.y -= 0.0015;
                    if(earthmesh.rotation.y > Math.PI*2){
                        earthmesh.rotation.y = 0;
                    }
                    if( camera.position.z <= 2){
                        camera.position.z += 0.02;
                    }
                }
                else{
                    cloudmaterial.opacity = 1;
                    earthmesh.rotation.y -= 0.002;
                    cloudmesh.rotation.y += 0.0015;
                    if(earthmesh.rotation.y < 0){
                        earthmesh.rotation.y = Math.PI*2;
                    }
                }
            }
        }
        else{
            nav = false;
            if( camera.position.x >= 0){
                camera.position.x -= 0.03;
            }
            if( earthmesh.rotation.y  >= zoomX-0.025 && earthmesh.rotation.y <= zoomX+0.025){
                if( earthmesh.rotation.x  >= zoomY-0.1 && earthmesh.rotation.x <= zoomY+0.1){
                    if( camera.position.z <= 0.8){
                        if( cloudmaterial.opacity <= 0.7){
                            cloudmesh.rotation.y += 0.0002;
                        }
                        else{
                            cloudmaterial.opacity -= 0.03;
                            show_country_info();
                        }
                    }
                    else{
                        camera.position.z -= 0.03;
                    }
                }
                else{
                    earthmesh.rotation.x += 0.04;
                }
            }
            else{
                if(earthmesh.rotation.y > Math.PI*2){
                    earthmesh.rotation.y = 0;
                }
                if(earthmesh.rotation.y < 0){
                    earthmesh.rotation.y = Math.PI*2;
                }
                earthmesh.rotation.y -= 0.04;
            }
        }
        render();
    }

    const render = () => {
        renderer.render(scene,camera);
    }
    animate();
}
window.onload = main;
function zoom_in(cord_x,cord_y,coutry) 
{
   zoom = true;
   zoomX = cord_x;
   zoomY = cord_y;
   country_name = coutry;

   let night = document.querySelector('.label');
   let info_card = document.getElementById("pop-up");
   let info_text = document.getElementById("pop-up-text");
   let nav = document.querySelector('.nav-btn');
   info_card.style.backgroundImage = "url(../Images/Japon/" + country_name + ".jpg)";
   info_text.innerHTML = country_name;
   nav.classList.add("hide");
   night.classList.add("hide");
   night.classList.remove("nav");
}
function zoom_out() 
{
   zoom = false;
   hide_country_info();
}
function nav_out() 
{
    if(nav == false){
        nav = true;
    }
    else{
        nav = false;
    }
}
function show_country_info() 
{
    let title = document.querySelector('.ml2');
    let info_card = document.getElementById("pop-up");
    let canvas = document.querySelector("canvas");
    title.classList.add("hide");
    info_card.classList.add("reveal");
    canvas.classList.add("reveal");
}
function hide_country_info() 
{
    let night = document.querySelector('.label');
    let nav = document.querySelector('.nav-btn');
    let title = document.querySelector('.ml2');
    let info_card = document.getElementById("pop-up");
    let canvas = document.querySelector("canvas");
    nav.classList.remove("hide");
    title.classList.remove("hide");
    info_card.classList.remove("reveal");
    canvas.classList.remove("reveal");
    night.classList.remove("hide");
}

var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

function momo(){
    anime.timeline({loop: false})
    .add({
      targets: '.ml2 .letter',
      scale: [4,1],
      opacity: [0,1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 950,
      delay: (el, i) => 150*i
    });
}