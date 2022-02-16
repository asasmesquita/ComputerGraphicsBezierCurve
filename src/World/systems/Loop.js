import { Clock } from 'https://unpkg.com/three@0.124.0/build/three.module.js';

//create loop of scene rendering

const clock = new Clock();

class Loop{
    constructor(camera, scene, renderer){
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    //create rendering loop
    start(){
        this.renderer.setAnimationLoop(() => {
            //animate objects into new position
            this.tick();

            //render a frame
            this.renderer.render(this.scene, this.camera);
        });
    }

    //stop the rendering loop
    stop(){
        this.renderer.setAnimationLoop(null);
    }

    //animate set of objects into new positions
    //tisck method must be defined on each objects that has animation
    tick(){
        //only call get Delta once per frame
        const delta = clock.getDelta();//returns time elapsed since last .getDelta() was called

        //update animations
        for(const obj of this.updatables){
            obj.tick(delta);
        }

    }
}

export { Loop };