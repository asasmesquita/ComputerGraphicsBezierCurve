import { Raycaster,
        Vector2 } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createRaycaster(){
    const raycaster = new Raycaster();

    return raycaster;
}

export { createRaycaster };