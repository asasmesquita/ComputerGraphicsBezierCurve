import { World } from './World/World.js';

//global variables
let world;
//main function
function main(){
    //create instance of animation
    world = new World();
    
    //render the initial scene
    world.start();
}
//call main
main();




