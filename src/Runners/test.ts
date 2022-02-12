import {VRect, CaptureScreenshot, GetForegroundWindowHandle} from "windows-ffi";

// First capture a screenshot of a section of the screen.
const screenshot = CaptureScreenshot({
	windowHandle: GetForegroundWindowHandle(), // comment to screenshot all windows
	rectToCapture: new VRect(0, 0, 800, 600),
});
 
// The image-data is now stored in the `screenshot.buffer` Buffer object.
// Access it directly (and cheaply) using the helper functions on `screenshot`.
for (let x = 0; x < 800; x++) {
	console.log(`Pixel color at [${x}, 0] is:`, screenshot.GetPixel(x, 0).ToHex_RGB());
}