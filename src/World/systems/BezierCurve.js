//class to generate Cubic Bezier curve
//returns Vector3 with point coordinates
//Use to generate point elements of Three.Curve
//https://threejs.org/docs/index.html?q=tube#api/en/geometries/TubeGeometry

import { Vector3,
         Curve } from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { bezier3 } from '../../../bezier3.mjs';

class Bezier3Curve extends Curve {

    constructor(c0, c1, c2, c3, scale = 1){
        super();
        this.scale = scale;
        //Cubic Bézier Control points
        this.c0 = new Vector3(c0.x, c0.y, c0.z);
        this.c1 = new Vector3(c1.x, c1.y, c1.z);
        this.c2 = new Vector3(c2.x, c2.y, c2.z);
        this.c3 = new Vector3(c3.x, c3.y, c3.z);
    }
    //overloads Curve and defines t between [0, 1]
    getPoint(t, optionalTarget = new Vector3()){
        //using externaly defined module function
        const point = new bezier3(this.c0, this.c1, this.c2, this.c3, t);
        //console.log(point)
        return optionalTarget.set(point.x, point.y, point.z).multiplyScalar(this.scale);
    }
}

export { Bezier3Curve };