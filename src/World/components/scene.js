//create a scene

import { Color, Scene } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createScene(){
    const scene = new Scene();

    scene.background = new Color(0x0101010);
    
    return scene;
}

export { createScene };