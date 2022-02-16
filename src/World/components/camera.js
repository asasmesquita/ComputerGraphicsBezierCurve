//create a camera

import { PerspectiveCamera,
         MathUtils } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createCamera(){
    const camera = new PerspectiveCamera(
        35, //fov
        1, //aspect of container 1 is just dummy value to be changed
        0.1, //near clipping plane
        1000//far clipping plane
    );

    ///move back the camera from (0, 0, 0) so that  we can view the scene
    camera.position.set(10, 10, 100);

    const radiansPerSecond = MathUtils.degToRad(200);
    

    //animate
    camera.tick = (delta) =>{
        //changes here
        camera.position.z += radiansPerSecond * delta * Math.sin(Date.now()/(60*60));
        //console.log(camera.position.z)
        
    }
    
    return camera;
}

export { createCamera };
