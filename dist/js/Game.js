var Game = (function () {
    function Game(canvasId) {
        var _this = this;
        var canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(canvas, true);
        this.engine.enableOfflineSupport = false;
        this.assets = [];
        this.scene = null;
        window.addEventListener("resize", function () {
            _this.engine.resize();
        });
        this.initScene();
    }
    Game.prototype.initScene = function () {
        this.scene = new BABYLON.Scene(this.engine);
        var camera = new BABYLON.ArcRotateCamera('', -1.5, 1, 100, new BABYLON.Vector3(0, 0, 0), this.scene);
        camera.attachControl(this.engine.getRenderingCanvas());
        var light = new BABYLON.HemisphericLight('', new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;
        // Load assets
        var loader = new Preloader(this);
        loader.callback = this.run.bind(this);
        loader.loadAssets();
    };
    Game.prototype.run = function () {
        var _this = this;
        this.scene.executeWhenReady(function () {
            // Remove loader
            var loader = document.querySelector("#loader");
            loader.style.display = "none";
            _this._init();
            _this.engine.runRenderLoop(function () {
                _this.scene.render();
            });
        });
    };
    Game.prototype._init = function () {
        this.scene.debugLayer.show();
        var center = null;
        var red = new BABYLON.StandardMaterial('red', this.scene);
        red.diffuseColor = BABYLON.Color3.Red();
        this.scene.constantlyUpdateMeshUnderPointer = true;
        this.scene.onPointerMove = function (evt, pr) {
            if (pr.hit) {
                if (center && center.name != pr.pickedMesh.name) {
                    center.material = null;
                }
                center = pr.pickedMesh;
                center.material = red;
            }
        };
    };
    /**
     * Returns an array of neighbors of the given face in a given radius
     */
    Game.prototype._getNeighbours = function (face, radius) {
        var res = [];
        for (var _i = 0, _a = this.scene.meshes; _i < _a.length; _i++) {
            var mesh = _a[_i];
            if (mesh.name == face.name) {
                continue;
            }
            // get distance face - mesh   
            var dist = BABYLON.Vector3.DistanceSquared(face.position, mesh.position);
            if (dist <= radius * radius) {
                res.push(mesh);
            }
        }
    };
    return Game;
}());
//# sourceMappingURL=Game.js.map