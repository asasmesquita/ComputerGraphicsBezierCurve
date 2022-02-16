//create a renderer

import { WebGLRenderer } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createRenderer(){
    //turn on the Anti-aliasing
    const renderer = new WebGLRenderer({antialias: true});

    //turn on the physically correct lighting model
    renderer.physicallyCorrectLights = true;
    
    return renderer;
}

export { createRenderer };