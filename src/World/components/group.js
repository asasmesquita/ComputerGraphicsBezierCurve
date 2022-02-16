//crate a (30x30) board made of a set of grouped cubes

import { Group,
         MathUtils,
         Mesh,
         SphereGeometry,
         MeshStandardMaterial } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function createMeshGroup(){
    //group for any thing
    const group = new Group();
    const geometry = new SphereGeometry(0.25, 16, 16);
    const material = new MeshStandardMaterial({
        color: 'indigo'
    });
    const protoSphere = new Mesh(geometry, material);
    group.add(protoSphere);
    //replicate object by clonning
    //20 objects 1/20 = 0.05
    //if 0<=i<=1 then x =cos(2*pi*i), y=sin(2*pi*i)
    for(let i = 0; i < 1; i += 0.005){
        const clonedSphere = protoSphere.clone();
        clonedSphere.position.x = Math.cos(2*Math.PI*i);
        clonedSphere.position.y = Math.sin(2*Math.PI*i);
        clonedSphere.position.z = i % 5;

        clonedSphere.scale.multiplyScalar(0.01 + i);

        group.add(clonedSphere);
    }
    
    const radiansPerSecond = MathUtils.degToRad(30);
    //each fra rotate the entire group
    group.tick = (delta) =>{
        group.rotation.z -= delta * radiansPerSecond;
    };

    //increase the size of the group
    //multiplyScalar multiplies x, y, and z components by a number
    group.scale.multiplyScalar(10);
    
    return group;
}

export { createMeshGroup };