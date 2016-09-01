declare var Grid: any;

class Game {

    private engine: BABYLON.Engine;
    public assets: Array<any>;
    public scene: BABYLON.Scene;

    constructor(canvasId: string) {

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(canvas, true);
        this.engine.enableOfflineSupport = false;

        this.assets = [];
        this.scene = null;

        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        this.initScene();

    }

    private initScene() {

        this.scene = new BABYLON.Scene(this.engine);

        let camera = new BABYLON.ArcRotateCamera('', -1.5, 1, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.attachControl(this.engine.getRenderingCanvas());
        let light = new BABYLON.HemisphericLight('', new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;

        // Load assets
        let loader = new Preloader(this);
        loader.callback = this.run.bind(this);
        
        loader.loadAssets();
    }

    private run() {

        this.scene.executeWhenReady(() => {
            
            // Remove loader
            var loader = <HTMLElement> document.querySelector("#loader");
            loader.style.display = "none";

            this._init();

            this.engine.runRenderLoop(() => {
                this.scene.render();
            });
        });
    }


    private _init () {
        this.scene.debugLayer.show();

        BABYLON.Mesh.CreateBox('', 1, this.scene);
    }
}
