//create a torus

import { TorusGeometry,
        MathUtils,
        Mesh,
        MeshBasicMaterial,
        MeshStandardMaterial,
        MeshPhongMaterial,
        TextureLoader } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createTorus(color){
    //create geometry   
    const geometry = new TorusGeometry(10, 3, 10, 20);
    //create a default white basic material
    const material = createMaterial(color);
    //create a mesh with the geometray and material
    const torus = new Mesh(geometry, material);

    const radiansPerSecond = MathUtils.degToRad(20);

    //animate
    torus.tick = (delta) =>{
        //changes here
        torus.material.color.b += radiansPerSecond * delta;
        if(torus.material.color.b >= 1){
            torus.material.color.b = 0;
        }
        torus.rotation.x += radiansPerSecond * delta;
    }
    
    return torus;
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

export { createTorus };