//create a sphere

import { SphereGeometry,
         MathUtils,
         MeshStandardMaterial,
         Mesh,
         MeshBasicMaterial,
         MeshPhongMaterial,
         TextureLoader } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createSphere(color){
    //create geometry   
    const geometry = new SphereGeometry(
        0.5,//radius
        32, //width elements
        16 //height elements
    );
    // white is  default color for basic material
    const material = createMaterial(color);
    //create a mesh with the geometray and material
    const sphere = new Mesh(geometry, material);
    
    const radiansPerSecond = MathUtils.degToRad(30);
    
    //animate cube called in animation loop
    sphere.tick = (delta) => {
        //change cube color to red
        //cube.material.color.set(0xFF0000);
        sphere.rotation.z += radiansPerSecond * delta;
        sphere.rotation.x += radiansPerSecond * delta;
        sphere.rotation.y += radiansPerSecond * delta;
    };  
    
    return sphere;
}

function createMaterial(color){
    //create a texture loader
    const textureLoader = new TextureLoader();
    //texture loader can load standard image formats PNG, JPEG, GIF, BMP ...
    const texture = textureLoader.load('../../../assets/textures/uv-test-bw.png');
    
    //create standard material
    const material = new MeshStandardMaterial({
        //map: texture,
        color: color,
        opacity: 0.65,
        transparent: true
    });

    return material;
}

export { createSphere };