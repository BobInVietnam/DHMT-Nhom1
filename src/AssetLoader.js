class AssetLoader {
    constructor() {
        this.assets = {};
    }

    async load(imgName ,imgPath) {
        this.assets[imgName] = await loadImage(imgPath, 
            () => {console.log(`ASSETS: ${imgName} loaded`)}),
            () => {console.error(`ASSETS: Couldn't load ${imgPath}`)}
    }
}

const assetLoader = new AssetLoader()