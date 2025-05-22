import { MAZE_LAYOUT, map, pellets, ghosts, pacman, TILE_SIZE, resetEntities } from './maze.js';
import { drawWall, drawPellet, drawGhost, drawPacman } from './maze.js';
import { updatePacmanPosition } from './pacman.js';
import { checkCollisions } from './sections.js';
import { updateScoreDisplay } from './sections.js';

let gamePaused = false;
let gameStarted = false;

export function setGamePaused(val) { gamePaused = val; }
export function setGameStarted(val) { gameStarted = val; }
export function getGamePaused() { return gamePaused; }
export function getGameStarted() { return gameStarted; }

export function initGame() {
    const canvas = document.getElementById('pacmanCanvas');
    canvas.width = MAZE_LAYOUT[0].length * TILE_SIZE;
    canvas.height = MAZE_LAYOUT.length * TILE_SIZE;
    resetEntities();
    updateScoreDisplay();
}

export function gameLoop() {
    const canvas = document.getElementById('pacmanCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[r].length; c++) {
            if (map[r][c] === 1) drawWall(ctx, c, r);
        }
    }
    pellets.forEach(p => drawPellet(ctx, p));
    ghosts.forEach(g => drawGhost(ctx, g));
    drawPacman(ctx, pacman);
}