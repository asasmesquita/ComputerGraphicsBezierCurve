//create a tube

import { TubeGeometry,
         Mesh,
         MeshPhongMaterial } from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { Bezier3Curve } from '../systems/BezierCurve.js';

function createTube(c0, c1, c2, c3){
    //create path
    const path = new Bezier3Curve(c0, c1, c2, c3); 
    //console.log(path);   
    //create Geometry
    const geometry = new TubeGeometry(path, 50, 0.25, 20, false);
    //create material
    const material = new MeshPhongMaterial({color: 0x00ff00});
    //create mesh
    const tube = new Mesh(geometry, material);

    return tube;
}

export { createTube };