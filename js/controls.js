import { pacman, map, TILE_SIZE } from './maze.js';
import { getGameStarted, getGamePaused } from './game.js';
import { checkCollisions } from './sections.js';

function isWall(x, y) {
    const gridX = Math.floor(x / TILE_SIZE);
    const gridY = Math.floor(y / TILE_SIZE);
    if (gridY < 0 || gridY >= map.length || gridX < 0 || gridX >= map[0].length) return true;
    return map[gridY][gridX] === 1;
}

export function setupControls() {
    document.addEventListener('keydown', (e) => {
        if (!getGameStarted() || getGamePaused()) return;

        let dx = 0, dy = 0, rotation = pacman.rotation;
        if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
            dx = TILE_SIZE; rotation = 0;
        } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
            dx = -TILE_SIZE; rotation = 2;
        } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
            dy = TILE_SIZE; rotation = 1;
        } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
            dy = -TILE_SIZE; rotation = 3;
        } else return;

        const newX = pacman.x + dx;
        const newY = pacman.y + dy;

        if (!isWall(newX, newY)) {
            pacman.x = newX;
            pacman.y = newY;
            pacman.rotation = rotation; // Set rotation based on direction
        }

        checkCollisions();

        import('./game.js').then(({ gameLoop }) => gameLoop());
    });
}