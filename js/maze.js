export const TILE_SIZE = 32;

const HARDCODED_MAZES = [
    [
        "111111111111111111111",
        "1P00000000100000000G11",
        "101010111010111011101",
        "101110000000000000001",
        "101010101111101011101",
        "100000100010001000001",
        "111110111010111011111",
        "000010100G40001010000",
        "111110101111101011111",
        "1G2000000010000000001",
        "101110111010111011101",
        "100010000000000010001",
        "101011101111101110101",
        "100000000010000000G31",
        "111111111111111111111"
    ],
    [
        "111111111111111111111",
        "1P00000000000000000G1",
        "101111101111101111101",
        "100000100000100000001",
        "101110111110111011101",
        "100010000000000010001",
        "111010111011101011111",
        "100010100G40001010001",
        "101110101111101011101",
        "1G2000000000000000001",
        "101111101111101111101",
        "100000100000100000001",
        "101110111110111011101",
        "100000000000000000G31",
        "111111111111111111111"
    ],
    [
        "111111111111111111111",
        "1P00000000000000000G1",
        "101111101111101111101",
        "100000100000100000001",
        "101110111110111011101",
        "100010000000000010001",
        "111010111011101011111",
        "100010100G40001010001",
        "101110101111101011101",
        "1G2000000000000000001",
        "101111101111101111101",
        "100000100000100000001",
        "101110111110111011101",
        "100000000000000000G31",
        "111111111111111111111"
    ],
    [
        "111111111111111111111",
        "1P00000000000000000G1",
        "101111101111101111101",
        "100000100000100000001",
        "101110111110111011101",
        "100010000000000010001",
        "111010111011101011111",
        "100010100G40001010001",
        "101110101111101011101",
        "1G2000000000000000001",
        "101111101111101111101",
        "100000100000100000001",
        "101110111110111011101",
        "100000000000000000G31",
        "111111111111111111111"
    ],
    [
        "111111111111111111111",
        "1P00000000000000000G1",
        "101111101111101111101",
        "100000100000100000001",
        "101110111110111011101",
        "100010000000000010001",
        "111010111011101011111",
        "100010100G40001010001",
        "101110101111101011101",
        "1G2000000000000000001",
        "101111101111101111101",
        "100000100000100000001",
        "101110111110111011101",
        "100000000000000000G31",
        "111111111111111111111"
    ]
];

// Shuffle and pick one map on each load
function pickRandomMaze() {
    const idx = Math.floor(Math.random() * HARDCODED_MAZES.length);
    return HARDCODED_MAZES[idx];
}

export const MAZE_LAYOUT = pickRandomMaze();


export let map = [];
export let pellets = [];
export let ghosts = [
    { id: 'projects', x: 0, y: 0, radius: TILE_SIZE / 2 - 1, color: '#FF0000', name: 'PROJECTS' },
    { id: 'about', x: 0, y: 0, radius: TILE_SIZE / 2 - 1, color: '#00FFFF', name: 'ABOUT' },   
    { id: 'contact', x: 0, y: 0, radius: TILE_SIZE / 2 - 1, color: '#FF00FF', name: 'CONTACT' },
    { id: 'resume', x: 0, y: 0, radius: TILE_SIZE / 2 - 1, color: '#00FF00', name: 'RESUME' } // Added Resume ghost
];
export let pacman = {
    x: 0, y: 0,
    radius: TILE_SIZE / 2 - 2,
    speed: TILE_SIZE / 5, 
    dx: 0, dy: 0,
    desiredDx: 0, desiredDy: 0,
    color: '#FFFF00', 
    mouthOpenValue: 0, mouthAngle: 0.2 * Math.PI, rotation: 0
};

export function resetEntities() {
    map.length = 0;
    pellets.length = 0;
    MAZE_LAYOUT.forEach((rowString, rowIndex) => {
        map[rowIndex] = [];
        for (let colIndex = 0; colIndex < rowString.length; colIndex++) {
            const char = rowString[colIndex];
            const nextChar = (colIndex + 1 < rowString.length) ? rowString[colIndex + 1] : null;
            map[rowIndex][colIndex] = 0; 
            if (char === 'P') {
                pacman.x = colIndex * TILE_SIZE + TILE_SIZE / 2;
                pacman.y = rowIndex * TILE_SIZE + TILE_SIZE / 2;
            } else if (char === 'G') {
                if (nextChar === '1' && ghosts[0]) {
                    ghosts[0].x = colIndex * TILE_SIZE + TILE_SIZE / 2;
                    ghosts[0].y = rowIndex * TILE_SIZE + TILE_SIZE / 2;
                } else if (nextChar === '2' && ghosts[1]) {
                    ghosts[1].x = colIndex * TILE_SIZE + TILE_SIZE / 2;
                    ghosts[1].y = rowIndex * TILE_SIZE + TILE_SIZE / 2;
                } else if (nextChar === '3' && ghosts[2]) {
                    ghosts[2].x = colIndex * TILE_SIZE + TILE_SIZE / 2;
                    ghosts[2].y = rowIndex * TILE_SIZE + TILE_SIZE / 2;
                }else if (nextChar === '4' && ghosts[3]) { // Place Resume ghost
                    ghosts[3].x = colIndex * TILE_SIZE + TILE_SIZE / 2;
                    ghosts[3].y = rowIndex * TILE_SIZE + TILE_SIZE / 2;
                }
            } else if (char === '1') { 
                const prevChar = (colIndex > 0) ? rowString[colIndex-1] : null;
                if (prevChar === 'G' && (rowString[colIndex] === '1' || rowString[colIndex] === '2' || rowString[colIndex] === '3')) {
                    map[rowIndex][colIndex] = 0; 
                } else {
                    map[rowIndex][colIndex] = 1; 
                }
            } else if (char === '0') { 
                const prevChar = (colIndex > 0) ? rowString[colIndex-1] : null;
                if (prevChar && (prevChar === '1' || prevChar === '2' || prevChar === '3') && (colIndex > 1 && rowString[colIndex-2] === 'G')) {
                    map[rowIndex][colIndex] = 0; 
                } else if (prevChar === 'G') { 
                    map[rowIndex][colIndex] = 0;
                }
                else {
                    map[rowIndex][colIndex] = 0; 
                    pellets.push({ x: colIndex * TILE_SIZE + TILE_SIZE / 2, y: rowIndex * TILE_SIZE + TILE_SIZE / 2, eaten: false });
                }
            } else if (char === '2' || char === '3') { 
                const prevChar = (colIndex > 0) ? rowString[colIndex-1] : null;
                if (prevChar === 'G') { 
                    map[rowIndex][colIndex] = 0; 
                } else { 
                    map[rowIndex][colIndex] = 0; 
                }
            }
        }
    });
    pacman.dx = pacman.speed; 
    pacman.dy = 0;
    pacman.desiredDx = pacman.speed; 
    pacman.desiredDy = 0;
    pacman.rotation = 0;
}

export function drawWall(ctx, x, y) {
    const px = x * TILE_SIZE;
    const py = y * TILE_SIZE;

    // Create a vertical gradient
    const gradient = ctx.createLinearGradient(px, py, px, py + TILE_SIZE);
    gradient.addColorStop(0, '#2F11FF'); // Top color
    gradient.addColorStop(1, '#3FAAFF'); // Bottom color

    ctx.fillStyle = gradient;

    if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(px, py, TILE_SIZE*0.9, TILE_SIZE*0.8, TILE_SIZE * 0.3);
        ctx.fill();
    } else {
        ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE);
    }
}

export function drawPellet(ctx, pellet) {
    if (!pellet.eaten) {
        ctx.beginPath();
        ctx.arc(pellet.x, pellet.y, TILE_SIZE / 8, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF'; 
        ctx.fill();
        ctx.closePath();
    }
}
export function drawGhost(ctx, ghost) {
    
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ghost.radius, Math.PI, 0);
    ctx.lineTo(ghost.x + ghost.radius, ghost.y + ghost.radius * 0.8);
    const waveCount = 3;
    for (let i = 0; i < waveCount; i++) {
        ctx.quadraticCurveTo(
            ghost.x + ghost.radius - (ghost.radius * 2 / waveCount) * (i + 0.5), 
            ghost.y + ghost.radius * 1.2, 
            ghost.x + ghost.radius - (ghost.radius * 2 / waveCount) * (i + 1), 
            ghost.y + ghost.radius * 0.8
        );
    }
    ctx.lineTo(ghost.x - ghost.radius, ghost.y + ghost.radius * 0.8); 
    ctx.closePath();
    ctx.fillStyle = ghost.color;
    ctx.fill();
    const eyeRadius = ghost.radius / 4;
    const eyeOffsetX = ghost.radius / 2.5;
    const eyeOffsetY = -ghost.radius / 5;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ghost.x - eyeOffsetX, ghost.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.arc(ghost.x + eyeOffsetX, ghost.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    let pupilOffsetX = 0; let pupilOffsetY = 0;
    if (pacman.x < ghost.x) pupilOffsetX = -eyeRadius/3;
    if (pacman.x > ghost.x) pupilOffsetX = eyeRadius/3;
    if (pacman.y < ghost.y) pupilOffsetY = -eyeRadius/3;
    if (pacman.y > ghost.y) pupilOffsetY = eyeRadius/3;
    ctx.arc(ghost.x - eyeOffsetX + pupilOffsetX, ghost.y + eyeOffsetY + pupilOffsetY, eyeRadius / 2, 0, Math.PI * 2);
    ctx.arc(ghost.x + eyeOffsetX + pupilOffsetX, ghost.y + eyeOffsetY + pupilOffsetY, eyeRadius / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `${TILE_SIZE * 0.51}px 'Tektur'`;
    ctx.textAlign = 'center';
    ctx.fillText(ghost.name, ghost.x, ghost.y - ghost.radius - 6);
}
export function drawPacman(ctx, pacman) {
    pacman.mouthOpenValue += 0.1; 
    const dynamicMouthAngle = Math.abs(Math.sin(pacman.mouthOpenValue)) * pacman.mouthAngle;
    ctx.beginPath();
    let startAngle, endAngle;
    if (pacman.rotation === 0) { 
        startAngle = dynamicMouthAngle; endAngle = Math.PI * 2 - dynamicMouthAngle;
    } else if (pacman.rotation === 1) { 
        startAngle = Math.PI / 2 + dynamicMouthAngle; endAngle = Math.PI / 2 - dynamicMouthAngle + Math.PI * 2;
    } else if (pacman.rotation === 2) { 
        startAngle = Math.PI + dynamicMouthAngle; endAngle = Math.PI - dynamicMouthAngle + Math.PI * 2;
    } else { 
        startAngle = -Math.PI / 2 + dynamicMouthAngle; endAngle = -Math.PI / 2 - dynamicMouthAngle + Math.PI * 2;
    }
    ctx.arc(pacman.x, pacman.y, pacman.radius, startAngle, endAngle);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = pacman.color;
    ctx.fill();
    ctx.closePath();
}