var Preloader = (function () {
    function Preloader(game) {
        this._loader = null;
        this._game = game;
        this._scene = this._game.scene;
        this._loader = new BABYLON.AssetsManager(this._scene);
        this._loader.useDefaultLoadingScreen = false;
        this._loader.onFinish = this.onFinish.bind(this);
    }
    Preloader.prototype.loadAssets = function () {
        this._loader.load();
    };
    Preloader.prototype.onFinish = function () {
        this.callback();
    };
    Preloader.prototype._addMesh = function (folder, name) {
        if (name) {
            var task = this._loader.addMeshTask(name, '', "assets/" + folder + "/", name + ".babylon");
        }
        else {
            var task = this._loader.addMeshTask(folder, '', "assets/" + folder + "/", folder + ".babylon");
        }
        task.onSuccess = this._addMeshAssetToGame.bind(this);
    };
    Preloader.prototype._addMeshAssetToGame = function (t) {
        var parent = new BABYLON.Mesh('', this._scene);
        for (var _i = 0, _a = t.loadedMeshes; _i < _a.length; _i++) {
            var m = _a[_i];
            // m.setEnabled(false);
            m.getScene().stopAnimation(m);
            m.parent = parent;
            m.isPickable = true;
        }
        // parent.setEnabled(false);
        console.log("%c Loaded : " + t.name, 'background: #333; color: #bada55');
        this._game.assets[t.name] = parent;
    };
    return Preloader;
}());
//# sourceMappingURL=Preloader.js.map