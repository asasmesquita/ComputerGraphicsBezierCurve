import { Vector3 } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

//calculates the cubic Bézier position via matrix multiplication
//where the point is defined by p(t)= BP and B=UM and therefore p(t)=UMP
//U being the one line matrix with the plane coordinates of the four control points
//returns a vector3 with the coordiantes of the point to draw
function bezier3(c0, c1, c2, c3, t){
    //Bézier cubic equations B = MP
    const M = [
        [-1, 3, -3, 1],
        [3, -6, 3, 0],
        [-3, 3, 0, 0],
        [1, 0, 0, 0]
    ];
    //defined by 0<=t<=1
    const U = [
        Math.pow(t, 3),
        Math.pow(t, 2),
        Math.pow(t, 1),
        Math.pow(t, 0)
    ];
    //console.log(U)

    let B = [];
    //implement matrix multiplication B = UM
    for(let colM = 0; colM < 4; colM++){
        let product = 0;
        for(let colU = 0; colU < 4; colU++){
            product += U[colU] * M[colU][colM];
        }
        B.push(product);
    }
    console.log(B);
    //calculate draw point coordinates, the P matrix based on the 4 control points
    const P = [
        [c0.x, c0.y, c0.z],
        [c1.x, c1.y, c1.z],
        [c2.x, c2.y, c2.z],
        [c3.x, c3.y, c3.z]
    ];
    //implement matrix multiplication p(t) = BP
    let x = 0;
    let y = 0;
    let z = 0;
    for(let pos = 0; pos < 4; pos++){
        x += B[pos] * P[pos][0];
        y += B[pos] * P[pos][1];
        z += B[pos] * P[pos][2];
    }
    //console.log(x);
    return new Vector3(x, y, z);
}

export {bezier3};