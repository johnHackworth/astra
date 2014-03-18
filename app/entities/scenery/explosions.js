window.astra = window.astra || {};
window.astra.explosions = {};
window.astra.explosions.rocketExhaust = {
    maxParticles: 60,
    size: 16,
    sizeRandom: 6,
    speed: 0,
    speedRandom: 30,
    // Lifespan in frames
    lifeSpan: 0,
    lifeSpanRandom: 20,
    // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
    angle: 180,
    angleRandom: 10,
    startColour: [255, 160, 0, 1],
    startColourRandom: [30, 80, 0, 0],
    endColour: [30, 30, 30, 1],
    endColourRandom: [10, 10, 0, 1],
    // Only applies when fastMode is off, specifies how sharp the gradients are drawn
    sharpness: 20,
    sharpnessRandom: 10,
    // Random spread from origin
    spread: 30,
    // How many frames should this last
    duration: -1,
    // Will draw squares instead of circle gradients
    fastMode: true,
    gravity: { x: 0, y: 0.1 },
    // sensible values are 0-3
    jitter: 3,
    originOffsetX: 20
}

window.astra.explosions.shipCrash = {
    maxParticles: 250,
    size: 25,
    sizeRandom: 10,
    speed: 0,
    speedRandom: 10,
    // Lifespan in frames
    lifeSpan: 0,
    lifeSpanRandom: 30,
    // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
    angle: 0,
    angleRandom: 360,
    startColour: [255, 160, 0, 1],
    startColourRandom: [80, 80, 0, 0],
    endColour: [250, 250, 250, 1],
    endColourRandom: [60, 60, 0, 1],
    // Only applies when fastMode is off, specifies how sharp the gradients are drawn
    sharpness: 20,
    sharpnessRandom: 10,
    // Random spread from origin
    spread: 20,
    // How many frames should this last
    duration: 80,
    // Will draw squares instead of circle gradients
    fastMode: true,
    gravity: { x: 0, y: 0.1 },
    // sensible values are 0-3
    jitter: 3,
    originOffsetX: 20
}

window.astra.explosions.shipCrashSmoke = {
    maxParticles: 150,
    size: 25,
    sizeRandom: 20,
    speed: 0,
    speedRandom: 1,
    // Lifespan in frames
    lifeSpan: 250,
    lifeSpanRandom: 100,
    // Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
    angle: 0,
    angleRandom: 10,
    startColour: [30, 30, 30, 1],
    startColourRandom: [30, 30, 30, 0],
    endColour: [85, 85, 85, 1],
    endColourRandom: [6, 6, 6, 1],
    // Only applies when fastMode is off, specifies how sharp the gradients are drawn
    sharpness: 20,
    sharpnessRandom: 10,
    // Random spread from origin
    spread: 5,
    // How many frames should this last
    duration: 6800,
    // Will draw squares instead of circle gradients
    fastMode: true,
    gravity: { x: 0, y: -0.025},
    // sensible values are 0-3
    jitter: 0,
    originOffsetX: 20,
    originOffsetY: -50,
}
