/**
 * Handles the asynchronous loading of all project assets.
 */
class AssetLoader {
  constructor() {
    this.images = {};
  }

  /**
   * Fetches the manifest and loads all 2D images.
   * @param {string} manifestPath - Path to the assets.json file.
   */
  async loadAll(manifestPath) {
    try {
      const response = await fetch(manifestPath);
      const manifest = await response.json();

      // Use a loop to load images and wait for each to finish
      for (const item of manifest.data2d) {
        const fullPath = `./assets/${item.path}`;
        this.images[item.name] = await loadImage(fullPath);
      }
      
      console.log("All assets loaded successfully.");
    } catch (err) {
      console.error("Asset loading failed:", err);
    }
  }

  /**
   * Helper to retrieve a loaded image by name.
   */
  get(name) {
    return this.images[name];
  }
}

const assets = new AssetLoader();