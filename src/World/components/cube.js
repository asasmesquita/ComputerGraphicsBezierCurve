//create a cube

import { BoxGeometry,
         MathUtils,
         MeshStandardMaterial,
         Mesh,
         MeshBasicMaterial,
         MeshPhongMaterial,
         TextureLoader } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createCube(color){
    //create geometry   
    const geometry = new BoxGeometry(10, 10, 10);
    // white is  default color for basic material
    const material = createMaterial(color);
    //create a mesh with the geometray and material
    const cube = new Mesh(geometry, material);
    
    const radiansPerSecond = MathUtils.degToRad(30);
    
    //animate cube called in animation loop
    cube.tick = (delta) => {
        //change cube color to red
        //cube.material.color.set(0xFF0000);
        cube.rotation.z += radiansPerSecond * delta;
        cube.rotation.x += radiansPerSecond * delta;
        cube.rotation.y += radiansPerSecond * delta;
    };  
    
    return cube;
}

function createMaterial(color){
    //create a texture loader
    const textureLoader = new TextureLoader();
    //texture loader can load standard image formats PNG, JPEG, GIF, BMP ...
    const texture = textureLoader.load('../../../assets/textures/uv-test-bw.png');
    
    //create standard material
    const material = new MeshStandardMaterial({
        map: texture,
        color: color
    });

    return material;
}

function createTransparentCube(color){
    //create geometry   
    const geometry = new BoxGeometry(1, 1, 0.01);
    // white is  default color for basic material
    const material = new MeshPhongMaterial({
        color: color,
        opacity: 0.4,
        transparent: true
    });
    //create a mesh with the geometray and material
    const cube = new Mesh(geometry, material);
    
    return cube;
}

export { createCube, createTransparentCube };