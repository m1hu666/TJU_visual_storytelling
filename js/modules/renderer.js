import { state } from './state.js';

export function drawNode(ctx, p, r, theme, rings, isHover, year) {
    ctx.save(); ctx.translate(p.x, p.y);
    const glowR = isHover ? r * 4 : r * 2;
    const grad = ctx.createRadialGradient(0,0,r*0.2, 0,0,glowR);
    grad.addColorStop(0, theme.hex); grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad; ctx.globalAlpha = isHover ? 0.6 : 0.3;
    ctx.beginPath(); ctx.arc(0,0,glowR,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0,0,r*0.3,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = theme.hex;
    rings.forEach((ring, i) => {
        ctx.save();
        ctx.rotate(ring.angle + state.globalTime * ring.speed * (isHover?5:1));
        ctx.beginPath();
        ctx.ellipse(0, 0, r*ring.r, r*ring.r*0.4, 0, 0, Math.PI*2);
        ctx.lineWidth = (isHover?2:1)*p.s; ctx.stroke();
        if(isHover) {
            const lx = Math.cos(state.globalTime*5)*r*ring.r;
            const ly = Math.sin(state.globalTime*5)*r*ring.r*0.4;
            ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(lx,ly,2*p.s,0,Math.PI*2); ctx.fill();
        }
        ctx.restore();
    });
    if (p.d < 4000) {
        ctx.fillStyle = '#fff'; ctx.font = `700 ${14*p.s}px 'Orbitron'`;
        ctx.textAlign = 'center'; ctx.shadowColor = theme.hex; ctx.shadowBlur = 10;
        ctx.fillText(year, 0, -r*1.5); ctx.shadowBlur = 0;
    }
    ctx.restore();
}
