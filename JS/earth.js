let scene;
let camera;
let renderer;
let hold;
let lastmousepos;
let zoom = false;
let nav = false;
let zoomX;
let zoomY;

function main()
{
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

    const earthgeometry = new THREE.SphereGeometry(0.60,64,64);

    const eatrhmaterial = new THREE.MeshPhongMaterial({
        roughness : 1,
        metalness:0,
        map: THREE.ImageUtils.loadTexture('texture/2_no_clouds_16k.jpeg'),
        bumpScale: 0.1,
    });

    const earthmesh = new THREE.Mesh(earthgeometry,eatrhmaterial);

    scene.add(earthmesh);

    // ambientlight

    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientlight);

    // point light

    const pointerlight =  new THREE.PointLight(0xffffff,0.9);

    // light position

    pointerlight.position.set(5,3,5);
    scene.add(pointerlight);

    // cloud
    const cloudgeometry =  new THREE.SphereGeometry(0.61,32,32);

    const cloudmaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
        transparent: true
    });

    const cloudmesh = new THREE.Mesh(cloudgeometry,cloudmaterial);

    scene.add(cloudmesh);

    const mouse = {
        x: undefined,
        y: undefined
    }
    
    const animate = () =>{
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
                if(lastmousepos < 0){
                    cloudmaterial.opacity = 1;
                    earthmesh.rotation.x = 0;
                    earthmesh.rotation.y += 0.002;
                    cloudmesh.rotation.y -= 0.0015;
                    if(earthmesh.rotation.y > Math.PI*2){
                        earthmesh.rotation.y = 0;
                    }
                }
                else{
                    console.log(nav);
                    cloudmaterial.opacity = 1;
                    earthmesh.rotation.x = 0;
                    earthmesh.rotation.y -= 0.002;
                    cloudmesh.rotation.y += 0.0015;
                    if(earthmesh.rotation.y < 0){
                        earthmesh.rotation.y = Math.PI*2;
                    }
                    if(nav == true){
                        if( camera.position.x <= 0.5){
                            camera.position.x += 0.01;
                        }
                    }
                    else{
                        if( camera.position.x >= 0){
                            camera.position.x -= 0.01;
                        }
                    }
                }

            }
        }
        else{
            nav = false;
            camera.position.x = 0;
            if( earthmesh.rotation.y  >= zoomX-0.1 && earthmesh.rotation.y <= zoomX+0.1){
                if( earthmesh.rotation.x  >= zoomY-0.1 && earthmesh.rotation.x <= zoomY+0.1){
                    if( camera.position.z <= 0.8){
                        if( cloudmaterial.opacity <= 0.5){
                            cloudmesh.rotation.y += 0.0001;
                        }
                        else{
                            cloudmaterial.opacity -= 0.03;
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
function zoom_in(cord_x,cord_y) 
{
   zoom = true;
   zoomX = cord_x;
   zoomY = cord_y;
   console.log(zoomCountry)
}
function zoom_out() 
{
   zoom = false;
   
   camera.position.z = 2;
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

window.onload = main;