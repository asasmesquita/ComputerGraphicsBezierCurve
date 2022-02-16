import {DirectionalLight,
        AmbientLight,
        HemisphereLight,
        MathUtils } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createLights(){
    //ambient light
    const ambientLight = new HemisphereLight(
        'white',//color of light
        'darkslategrey',//dim ground color
        5//intensity
    );


    //basic meshMaterial is not affected by lights nor does it need one eto be visible
    //light constructor takes colar and intensity as parameters
    const light = new DirectionalLight('white', 8);
    
    //directional light shines from ligh.position to light.target.position
    //move light position
    light.position.set(0, 10, 50);

    const radiansPerSecond = MathUtils.degToRad(20);

    //animate
    light.tick = () => {
        //changes here
        light.position.x = 500 * Math.sin(Date.now() / 2400);
        light.position.z = 500 * Math.cos(Date.now() / 2400);
    }



    return {ambientLight, light};

}

export { createLights };