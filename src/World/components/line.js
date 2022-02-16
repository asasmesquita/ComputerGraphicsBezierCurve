//create a line

import { LineBasicMaterial,
        Vector3,
        BufferGeometry,
        Line } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createLine(xi, yi, zi, xf, yf, zf, color){
    //create geometry
    const points =[];
    points.push( new Vector3(xi, yi, zi));
    points.push( new Vector3(xf, yf, zf));
    const geometry = new BufferGeometry().setFromPoints(points);
    //create a default white basic material
    const material = new LineBasicMaterial( {color: color});
    //create a mesh with the geometray and material
    const line = new Line(geometry, material);
    
    return line;
}

export { createLine };