import { createCamera } from "./components/camera.js";
import { createSphere } from "./components/sphere.js";
import { createTransparentBoard } from './components/board.js';
import { createLine } from "./components/line.js";
import { createScene } from "./components/scene.js";
import { createRenderer } from "./systems/renderer.js";
import { createLights } from "./components/lights.js";
import { Resizer } from "./systems/Resizer.js";
import { createControls } from './systems/controls.js';
import { Loop } from './systems/Loop.js';
import { createRaycaster } from "./systems/raycaster.js";
import { Vector2,
         Vector3 } from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { createTube } from "./components/tube.js";

//js does not yet has private
//use module scope variables so that class properties cannot be accessed
//from outside the module
let camera;
let renderer;
let scene;
let loop;

const raycaster = new createRaycaster();
const mouse = new Vector2();
const overedTile = {x:0, y:0};//default
//spheres for control points
const c0 = new createSphere('yellow');
const c1 = new createSphere('red');
const c2 = new createSphere('green');
const c3 = new createSphere('blue');
//define sphere control points initial positions
c0.position.x = 0;
c0.position.y = 0;
c0.position.z = 0;
c1.position.x = 0;
c1.position.y = 4;
c1.position.z = 0;
c2.position.x = 4;
c2.position.y = 4;
c2.position.z = 0;
c3.position.x = 4;
c3.position.y = 0;
c3.position.z = 0;
let selectedC = null;//used as "pointer" to selected control point
let incrementCota = 0.1;//used to modify z coordinate of control points
//define white lines between board and control points
//initial start and end point equal to original control point start position
const line0 = new createLine(0, 0, 0, 0, 0, 0, 0xFFFFFF);
const line1 = new createLine(0, 4, 0, 0, 4, 0, 0xFFFFFF);
const line2 = new createLine(4, 4, 0, 4, 4, 0, 0xFFFFFF);
const line3 = new createLine(4, 0, 0, 4, 0, 0, 0xFFFFFF);

class World {
    //1. create n instance of the world app
    constructor(){
        //define canvas
        const container = document.querySelector('#sceneContainer');
        //define animation components and systems
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        const controls = new createControls(camera, renderer.domElement);
        loop = new Loop(camera, scene, renderer);
        const {ambientLight, light} = createLights();

        //create things here
        //axis
        const lineX = new createLine(0, 0, 0.02, 10, 0, 0.02, 0x00000FF);
        const lineY = new createLine(0, 0, 0.02, 0, 10, 0.02, 0xFF0000);
        const lineZ = new createLine(0, 0, 10, 0, 0, 0, 0x00FF00);
        //Board
        const board = new createTransparentBoard(0xdadf00, 0xe70a08, 0);
        board.position.x = 0.5;
        board.position.y = 0.5;
        
        //add continously animated objects
        loop.updatables.push(controls);

        //add here initial scene elements
        scene.add(ambientLight, light);
        scene.add(lineX, lineY, lineZ, board, c0, c1, c2, c3, line0, line1, line2, line3);

        //event listeners
        //resize scene
        const resizer = new Resizer(container, camera, renderer);
        //render world on changes
        controls.addEventListener('change', () => {
            this.render();
        });
        //get (x,y) coordinates of mouse position over board
        container.addEventListener('mousemove', onMouseMove);
        //select control points, modify position of selected point, draw Bézier curve or reset scene
        window.addEventListener('keydown', markPoint);
        //reset the cota modification value to 0.1
        window.addEventListener('keyup', resetIncrementCota);
    }

    //render the scene on demand
    render(){
        //draw a single frame
        renderer.render(scene, camera);
    }
    //start animation loop with a stream of frames
    start(){
        loop.start();
    }
    //stop animation loop
    stop(){
        loop.stop();
    }
}

//function that handles mouse movement related events
function onMouseMove(event) {
    //get mouse position over container
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	
    // update the picking ray with the camera and mouse position
	raycaster.setFromCamera(mouse, camera);

	// calculate objects intersecting the picking ray
    // board is scene.children[5]
	const intersects = raycaster.intersectObjects(scene.children[5].children, true);
    
    for(let i = 0; i < intersects.length; i++ ){//go to all intersects
        if(intersects[i].object.position.x !=  overedTile.x || intersects[i].object.position.y != overedTile.y){//console.log value is distict from existing
            //update value
            overedTile.x = intersects[i].point.x;
            overedTile.y = intersects[i].point.y;
            //show result
            //console.log(overedTile);
        }
        break;//get just just one first intersect
	}
}

//function that handles keydown related events
function markPoint(event){
    //console.log(event.key)
    if(event.key == '1'){//if 1 is pressed
        //select 0
        selectedC = 0;
        c0.material.opacity = 100;
        //reset others
        c1.material.opacity = 0.65;
        c2.material.opacity = 0.65;
        c3.material.opacity = 0.65;
        //update text with selected point coord
        const ctx = document.getElementById('pointCoord');
        ctx.innerHTML = 'C0(' + c0.position.x.toFixed(2) + ', ' + c0.position.y.toFixed(2) + ', ' + c0.position.z.toFixed(2) +')';
    }
    else if(event.key == '2'){//if 2 is pressed
        //select 1
        selectedC = 1;
        c1.material.opacity = 100;
        //reset others
        c0.material.opacity = 0.65;
        c2.material.opacity = 0.65;
        c3.material.opacity = 0.65;
        //update text with selected point coord
        const ctx = document.getElementById('pointCoord');
        ctx.innerHTML = 'C1(' + c1.position.x.toFixed(2) + ', ' + c1.position.y.toFixed(2) + ', ' + c1.position.z.toFixed(2) +')';
    }
    else if(event.key == '3'){//if 3 is pressed
        //select 2
        selectedC = 2;
        c2.material.opacity = 100;
        //reset others
        c0.material.opacity = 0.65;
        c1.material.opacity = 0.65;
        c3.material.opacity = 0.65;
        //update text with selected point coord
        const ctx = document.getElementById('pointCoord');
        ctx.innerHTML = 'C2(' + c2.position.x.toFixed(2) + ', ' + c2.position.y.toFixed(2) + ', ' + c2.position.z.toFixed(2) +')';
    }
    else if(event.key == '4'){//if 4 is pressed
        //select 3
        selectedC = 3;
        c3.material.opacity = 100;
        //reset others
        c0.material.opacity = 0.65;
        c1.material.opacity = 0.65;
        c2.material.opacity = 0.65;
        //update text with selected point coord
        const ctx = document.getElementById('pointCoord');
        ctx.innerHTML = 'C3(' + c3.position.x.toFixed(2) + ', ' + c3.position.y.toFixed(2) + ', ' + c3.position.z.toFixed(2) +')';
    }
    else if(selectedC == 0){//control point 
        if(event.key == ' '){//update C0 (x, y) position
            c0.position.x = overedTile.x;
            c0.position.y = overedTile.y;
            //modify rendered geometry to dynamic
            line0.geometry.attributes.position.needsUpdate = true;
            //start point
            line0.geometry.attributes.position.array[0] = overedTile.x;
            line0.geometry.attributes.position.array[1] = overedTile.y;
            //end point
            line0.geometry.attributes.position.array[3] = overedTile.x;
            line0.geometry.attributes.position.array[4] = overedTile.y;
            
        }
        else if(event.key == 'w' || event.key == 'W'){//increase z
            c0.position.z += incrementCota;
            //modify rendered geometry to dynamic
            line0.geometry.attributes.position.needsUpdate = true;
            //update line to control point
            line0.geometry.attributes.position.array[5] = c0.position.z;
            //console.log(line0.geometry.attributes.position.array)
            if(incrementCota < 1){//max velocity
                incrementCota += incrementCota;//increase velocity while keydown
            }
        }
        else if(event.key == 's' || event.key == 'S'){//decrease z
            c0.position.z -= incrementCota;
             //modify rendered geometry to dynamic
             line0.geometry.attributes.position.needsUpdate = true;
             //update line to control point
             line0.geometry.attributes.position.array[5] = c0.position.z;
            if(incrementCota < 1){//max velocity
                incrementCota += incrementCota;//increase velocity while keydown
            }
        }
        //update text with selected point coord
        const ctx = document.getElementById('pointCoord');
        ctx.innerHTML = 'C0(' + c0.position.x.toFixed(2) + ', ' + c0.position.y.toFixed(2) + ', ' + c0.position.z.toFixed(2) +')';
    }
    else if(selectedC == 1){//control point 1
        if(event.key == ' '){//update C1 (x, y) position
            c1.position.x = overedTile.x;
            c1.position.y = overedTile.y;
            //modify rendered geometry to dynamic
            line1.geometry.attributes.position.needsUpdate = true;
            //start point
            line1.geometry.attributes.position.array[0] = overedTile.x;
            line1.geometry.attributes.position.array[1] = overedTile.y;
            //end point
            line1.geometry.attributes.position.array[3] = overedTile.x;
            line1.geometry.attributes.position.array[4] = overedTile.y;
        }
        else if(event.key == 'w' || event.key == 'W'){//increase z
            c1.position.z += incrementCota;
            //modify rendered geometry to dynamic
            line1.geometry.attributes.position.needsUpdate = true;
            //update line to control point
            line1.geometry.attributes.position.array[5] = c1.position.z;
            if(incrementCota < 1){//max velocity
                incrementCota += incrementCota;//increase velocity while keydown
            }
        }
        else if(event.key == 's' || event.key == 'S'){//decrease z
            c1.position.z -= incrementCota;
            //modify rendered geometry to dynamic
            line1.geometry.attributes.position.needsUpdate = true;
            //update line to control point
            line1.geometry.attributes.position.array[5] = c1.position.z;
            if(incrementCota < 1){//max velocity
                incrementCota += incrementCota;//increase velocity while keydown
            }
        }
        //update text with selected point coord
        const ctx = document.getElementById('pointCoord');
        ctx.innerHTML = 'C1(' + c1.position.x.toFixed(2) + ', ' + c1.position.y.toFixed(2) + ', ' + c1.position.z.toFixed(2) +')';
    }
    else if(selectedC == 2){//control point 2
        if(event.key == ' '){//update C2 (x, y) position
            c2.position.x = overedTile.x;
            c2.position.y = overedTile.y;
            //modify rendered geometry to dynamic
            line2.geometry.attributes.position.needsUpdate = true;
            //start point
            line2.geometry.attributes.position.array[0] = overedTile.x;
            line2.geometry.attributes.position.array[1] = overedTile.y;
            //end point
            line2.geometry.attributes.position.array[3] = overedTile.x;
            line2.geometry.attributes.position.array[4] = overedTile.y;
        }
        else if(event.key == 'w' || event.key == 'W'){//increase z
            c2.position.z += incrementCota;
            //modify rendered geometry to dynamic
            line2.geometry.attributes.position.needsUpdate = true;
            //update line to control point
            line2.geometry.attributes.position.array[5] = c2.position.z;
            if(incrementCota < 1){//max velocity
                incrementCota += incrementCota;//increase velocity while keydown
            }
        }
        else if(event.key == 's' || event.key == 'S'){//decrease z
            c2.position.z -= incrementCota;
            //modify rendered geometry to dynamic
            line2.geometry.attributes.position.needsUpdate = true;
            //update line to control point
            line2.geometry.attributes.position.array[5] = c2.position.z;
            if(incrementCota < 1){//max velocity
                incrementCota += incrementCota;//increase velocity while keydown
            }
        }
        //update text with selected point coord
        const ctx = document.getElementById('pointCoord');
        ctx.innerHTML = 'C2(' + c2.position.x.toFixed(2) + ', ' + c2.position.y.toFixed(2) + ', ' + c2.position.z.toFixed(2) +')';
    }
    else if(selectedC == 3){//control point 3
        if(event.key == ' '){//update C1 (x, y) position
            c3.position.x = overedTile.x;
            c3.position.y = overedTile.y;
            //modify rendered geometry to dynamic
            line3.geometry.attributes.position.needsUpdate = true;
            //start point
            line3.geometry.attributes.position.array[0] = overedTile.x;
            line3.geometry.attributes.position.array[1] = overedTile.y;
            //end point
            line3.geometry.attributes.position.array[3] = overedTile.x;
            line3.geometry.attributes.position.array[4] = overedTile.y;
        }
        else if(event.key == 'w' || event.key == 'W'){//increase z
            c3.position.z += incrementCota;
            //modify rendered geometry to dynamic
            line3.geometry.attributes.position.needsUpdate = true;
            //update line to control point
            line3.geometry.attributes.position.array[5] = c3.position.z;
            if(incrementCota < 1){//max velocity
                incrementCota += incrementCota;//increase velocity while keydown
            }
        }
        else if(event.key == 's' || event.key == 'S'){//decrease z
            c3.position.z -= incrementCota;
            //modify rendered geometry to dynamic
            line3.geometry.attributes.position.needsUpdate = true;
            //update line to control point
            line3.geometry.attributes.position.array[5] = c3.position.z;
            if(incrementCota < 1){//max velocity
                incrementCota += incrementCota;//increase velocity while keydown
            }
        }
        //update text with selected point coord
        const ctx = document.getElementById('pointCoord');
        ctx.innerHTML = 'C3(' + c3.position.x.toFixed(2) + ', ' + c3.position.y.toFixed(2) + ', ' + c3.position.z.toFixed(2) +')';
    }
    //reset scene elements to initial positions
    if(event.key == 'Backspace'){
        //control points
        c0.position.x = 0;
        c0.position.y = 0;
        c0.position.z = 0;
        c1.position.x = 0;
        c1.position.y = 4;
        c1.position.z = 0;
        c2.position.x = 4;
        c2.position.y = 4;
        c2.position.z = 0;
        c3.position.x = 4;
        c3.position.y = 0;
        c3.position.z = 0;
        //selected point to null
        selectedC = null;
        //all control point to transparent
        c0.material.opacity = 0.65;
        c1.material.opacity = 0.65;
        c2.material.opacity = 0.65;
        c3.material.opacity = 0.65;
        //white lines
        //modify rendered geometry to dynamic
        line0.geometry.attributes.position.needsUpdate = true;
        line0.geometry.attributes.position.array[0] = c0.position.x;
        line0.geometry.attributes.position.array[1] = c0.position.y;
        //cota of array[2] will always be zero
        line0.geometry.attributes.position.array[3] = c0.position.x;
        line0.geometry.attributes.position.array[4] = c0.position.y;
        line0.geometry.attributes.position.array[5] = c0.position.z;
        //modify rendered geometry to dynamic
        line1.geometry.attributes.position.needsUpdate = true;
        line1.geometry.attributes.position.array[0] = c1.position.x;
        line1.geometry.attributes.position.array[1] = c1.position.y;
        //cota of array[2] will always be zero
        line1.geometry.attributes.position.array[3] = c1.position.x;
        line1.geometry.attributes.position.array[4] = c1.position.y;
        line1.geometry.attributes.position.array[5] = c1.position.z;
        //modify rendered geometry to dynamic
        line2.geometry.attributes.position.needsUpdate = true;
        line2.geometry.attributes.position.array[0] = c2.position.x;
        line2.geometry.attributes.position.array[1] = c2.position.y;
        //cota of array[2] will always be zero
        line2.geometry.attributes.position.array[3] = c2.position.x;
        line2.geometry.attributes.position.array[4] = c2.position.y;
        line2.geometry.attributes.position.array[5] = c2.position.z;
        //modify rendered geometry to dynamic
        line3.geometry.attributes.position.needsUpdate = true;
        line3.geometry.attributes.position.array[0] = c3.position.x;
        line3.geometry.attributes.position.array[1] = c3.position.y;
        //cota of array[2] will always be zero
        line3.geometry.attributes.position.array[3] = c3.position.x;
        line3.geometry.attributes.position.array[4] = c3.position.y;
        line3.geometry.attributes.position.array[5] = c3.position.z;
        //coordinates shown in html
        const ctx = document.getElementById('pointCoord');
        ctx.innerHTML = '';//show empty string
        //remove all scene' children above 13 (total initial scene elements - 1)
        for(let i = scene.children.length; i > 13; i--){
            //remove the rest
            scene.remove(scene.children[i]);
        }
    }
    
    //generate and insert line into scene
    if(event.key == 'x' || event.key == 'X'){
        //define vector3 control points based on current positions
        const c0V3 = new Vector3(c0.position.x, c0.position.y, c0.position.z);
        const c1V3 = new Vector3(c1.position.x, c1.position.y, c1.position.z);
        const c2V3 = new Vector3(c2.position.x, c2.position.y, c2.position.z);
        const c3V3 = new Vector3(c3.position.x, c3.position.y, c3.position.z);
        //generate tube
        const tube = new createTube(c0V3, c1V3, c2V3, c3V3);
        //add to scene
        scene.add(tube);
    }  

}

//function that handles keyUp related events
function resetIncrementCota(event){
    //resets the cota incrementing value to 0.1
    if(event.key == 'w' || event.key == 'W' || event.key == 's' || event.key == 'S'){
        incrementCota = 0.1;//original velocity value
    }
}

export { World };