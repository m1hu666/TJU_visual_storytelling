export function getRiverSpine(z) {
    const k = z * 0.0008;
    return {
        x: Math.sin(k) * 400 + Math.cos(k*2.1) * 200,
        y: Math.sin(k*1.5) * 150 + 100
    };
}

export function project(x, y, z, cameraZ, mouse, W, H) {
    const depth = z - cameraZ;
    const px = -mouse.rx * 50;
    const py = -mouse.ry * 50;
    if (depth < 10) return null;
    const scale = 800 / depth;
    return { x: W/2 + (x + px) * scale, y: H/2 + (y + py) * scale, s: scale, d: depth };
}
