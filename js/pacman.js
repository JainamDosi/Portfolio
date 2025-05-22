import { pacman, map, TILE_SIZE, MAZE_LAYOUT } from './maze.js';

function isWall(x, y) {
    const canvas = document.getElementById('pacmanCanvas');
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
        const gridY = Math.floor(pacman.y / TILE_SIZE); 
        const gridX = Math.floor(pacman.x / TILE_SIZE); 
        if (x < 0 && MAZE_LAYOUT[gridY] && MAZE_LAYOUT[gridY][MAZE_LAYOUT[gridY].length-1] === '0') return false; 
        if (x >= canvas.width && MAZE_LAYOUT[gridY] && MAZE_LAYOUT[gridY][0] === '0') return false; 
        if (y < 0 && MAZE_LAYOUT[MAZE_LAYOUT.length-1] && MAZE_LAYOUT[MAZE_LAYOUT.length-1][gridX] === '0') return false; 
        if (y >= canvas.height && MAZE_LAYOUT[0] && MAZE_LAYOUT[0][gridX] === '0') return false; 
        return true; 
    }
    const gridX = Math.floor(x / TILE_SIZE);
    const gridY = Math.floor(y / TILE_SIZE);
    if (gridY < 0 || gridY >= map.length || gridX < 0 || gridX >= map[gridY].length) {
        return true; 
    }
    return map[gridY][gridX] === 1;
}

export function updatePacmanPosition() {
    const currentGridX = Math.floor(pacman.x / TILE_SIZE);
    const currentGridY = Math.floor(pacman.y / TILE_SIZE);
    const tileCenterX =  currentGridX * TILE_SIZE + TILE_SIZE / 2;
    const tileCenterY =  currentGridY * TILE_SIZE + TILE_SIZE / 2;
    const alignmentTolerance = pacman.speed; 
    const onGridCenterX = Math.abs(pacman.x - tileCenterX) < alignmentTolerance; 
    const onGridCenterY = Math.abs(pacman.y - tileCenterY) < alignmentTolerance;

    if (pacman.desiredDx !== pacman.dx || pacman.desiredDy !== pacman.dy || (pacman.dx === 0 && pacman.dy === 0) ) {
        if (pacman.desiredDx !== 0 && onGridCenterY) { 
            let testNextTileCenterX = tileCenterX + (pacman.desiredDx > 0 ? TILE_SIZE : -TILE_SIZE);
            if (!isWall(testNextTileCenterX, tileCenterY)) {
                pacman.dx = pacman.desiredDx; pacman.dy = 0; pacman.y = tileCenterY; 
                if (pacman.dx > 0) pacman.rotation = 0; else pacman.rotation = 2;
            }
        } else if (pacman.desiredDy !== 0 && onGridCenterX) { 
            let testNextTileCenterY = tileCenterY + (pacman.desiredDy > 0 ? TILE_SIZE : -TILE_SIZE);
            if (!isWall(tileCenterX, testNextTileCenterY)) {
                pacman.dy = pacman.desiredDy; pacman.dx = 0; pacman.x = tileCenterX; 
                if (pacman.dy > 0) pacman.rotation = 1; else pacman.rotation = 3;
            }
        }
    }
    
    if (pacman.dx > 0) pacman.rotation = 0;
    else if (pacman.dx < 0) pacman.rotation = 2;
    else if (pacman.dy > 0) pacman.rotation = 1;
    else if (pacman.dy < 0) pacman.rotation = 3;

    let nextX = pacman.x + pacman.dx;
    let nextY = pacman.y + pacman.dy;
    let collisionCheckX = nextX; 
    let collisionCheckY = nextY; 

    if (pacman.dx > 0) collisionCheckX = nextX + pacman.radius; 
    else if (pacman.dx < 0) collisionCheckX = nextX - pacman.radius; 
    if (pacman.dy > 0) collisionCheckY = nextY + pacman.radius; 
    else if (pacman.dy < 0) collisionCheckY = nextY - pacman.radius; 
    if (pacman.dx !== 0 && pacman.dy === 0) collisionCheckY = pacman.y; 
    if (pacman.dy !== 0 && pacman.dx === 0) collisionCheckX = pacman.x; 

    if (pacman.dx !== 0 || pacman.dy !== 0) { 
        if (!isWall(collisionCheckX, collisionCheckY)) {
            pacman.x = nextX; pacman.y = nextY;
        } else {
            pacman.x = tileCenterX; pacman.y = tileCenterY;
            pacman.dx = 0; pacman.dy = 0;
        }
    }

    const canvas = document.getElementById('pacmanCanvas');
    const rightBoundary = canvas.width - pacman.radius;
    const leftBoundary = pacman.radius;
    const bottomBoundary = canvas.height - pacman.radius;
    const topBoundary = pacman.radius;

    if (pacman.x < leftBoundary && pacman.dx < 0) { 
         if (MAZE_LAYOUT[currentGridY][MAZE_LAYOUT[0].length-1] !== '1') { 
            pacman.x = (MAZE_LAYOUT[0].length -1) * TILE_SIZE + TILE_SIZE/2; 
            pacman.y = currentGridY * TILE_SIZE + TILE_SIZE/2; 
         }
    } else if (pacman.x > rightBoundary && pacman.dx > 0) { 
        if (MAZE_LAYOUT[currentGridY][0] !== '1') {
            pacman.x = 0 * TILE_SIZE + TILE_SIZE/2; 
            pacman.y = currentGridY * TILE_SIZE + TILE_SIZE/2; 
        }
    }
    if (pacman.y < topBoundary && pacman.dy < 0) { 
         if (MAZE_LAYOUT[MAZE_LAYOUT.length-1][currentGridX] !== '1') {
            pacman.y = (MAZE_LAYOUT.length-1) * TILE_SIZE + TILE_SIZE/2; 
            pacman.x = currentGridX * TILE_SIZE + TILE_SIZE/2; 
         }
    } else if (pacman.y > bottomBoundary && pacman.dy > 0) { 
        if (MAZE_LAYOUT[0][currentGridX] !== '1') {
            pacman.y = 0 * TILE_SIZE + TILE_SIZE/2; 
            pacman.x = currentGridX * TILE_SIZE + TILE_SIZE/2; 
        }
    }
}