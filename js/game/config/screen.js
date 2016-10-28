const ScaleType = {
	NONE: 1,
	SAME_ASPECT_RATIO: 2,
	TO_FULLSCREEN: 3,
	WITH_ROTATION: 4,
};

define({
	w: 0,
	h: 0,
	wViewport: 900,
	hViewport: 600,
	currentScaleType: ScaleType.WITH_ROTATION
});