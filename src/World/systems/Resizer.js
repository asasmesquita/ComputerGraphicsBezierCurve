const setSize = (container, camera, renderer) => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
};
  
class Resizer {

    constructor(container, camera, renderer) {
        // set initial size on load
        setSize(container, camera, renderer);
    
        window.addEventListener('resize', () => {
            //set the size again ifevent occurs
            setSize(container, camera, renderer);
            //perform more custom actions here
            this.onResize();
        });
    }

    //this is a function that will be defined when called via anonymous fucntion
    onResize() {}
}

export { Resizer };