self.onmessage = async (event) => {
  const file = event.data;

  try {
    const imageBitmap = await createImageBitmap(file);

    const maxSize = 512;
    const scale = Math.min(
      maxSize / imageBitmap.width,
      maxSize / imageBitmap.height,
      1
    );

    const width = Math.round(imageBitmap.width * scale);
    const height = Math.round(imageBitmap.height * scale);

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imageBitmap, 0, 0, width, height);

    const blob = await canvas.convertToBlob({
      type: "image/jpeg",
      quality: 0.7,
    });

    self.postMessage({ success: true, blob });
  } catch (err) {
    self.postMessage({
      success: false,
      error: err.message || "Image compression failed",
    });
  }
};
