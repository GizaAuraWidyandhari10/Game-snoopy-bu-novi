/* =========================================================
   SNOOPY STAR QUEST
   GAMEPLAY LEVEL LAMA
   BACKGROUND ASSETS SUDAH DISESUAIKAN
========================================================= */


/* =========================================================
   CANVAS
========================================================= */

const canvas =
    document.getElementById("game-canvas");

const ctx =
    canvas.getContext("2d");


const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;


/* =========================================================
   SCREEN
========================================================= */

const mainMenu =
    document.getElementById("screen-main-menu");

const howToScreen =
    document.getElementById("screen-how-to-play");

const stageScreen =
    document.getElementById("screen-select-stage");

const gameScreen =
    document.getElementById("screen-game");


/* =========================================================
   BUTTON
========================================================= */

const btnPlay =
    document.getElementById("btn-play");

const btnHowTo =
    document.getElementById("btn-how-to-play");

const btnHowToBack =
    document.getElementById("btn-howto-back");

const btnSelectStage =
    document.getElementById("btn-select-stage");

const btnStageBack =
    document.getElementById("btn-stage-back");

const btnResetProgress =
    document.getElementById("btn-reset-progress");

const stageList =
    document.getElementById("stage-list");

const startPanel =
    document.getElementById("start-panel");

const btnStartGame =
    document.getElementById("btn-start-game");

const btnPause =
    document.getElementById("btn-pause");

const btnSound =
    document.getElementById("btn-sound");


/* =========================================================
   OVERLAY
========================================================= */

const overlayPause =
    document.getElementById("overlay-pause");

const overlayGameover =
    document.getElementById("overlay-gameover");

const overlayStageComplete =
    document.getElementById(
        "overlay-stagecomplete"
    );

const overlayWin =
    document.getElementById("overlay-win");


const btnResume =
    document.getElementById("btn-resume");

const btnRestart =
    document.getElementById("btn-restart");

const btnMainMenuPause =
    document.getElementById(
        "btn-mainmenu-from-pause"
    );

const btnTryAgain =
    document.getElementById("btn-tryagain");

const btnGameoverMain =
    document.getElementById(
        "btn-gameover-mainmenu"
    );

const btnNextStage =
    document.getElementById("btn-nextstage");

const btnCompleteMain =
    document.getElementById(
        "btn-complete-mainmenu"
    );

const btnPlayAgain =
    document.getElementById("btn-playagain");

const btnWinMain =
    document.getElementById(
        "btn-win-mainmenu"
    );


/* =========================================================
   MOBILE CONTROL
========================================================= */

const btnLeft =
    document.getElementById("btn-left");

const btnRight =
    document.getElementById("btn-right");

const btnJump =
    document.getElementById("btn-jump");


/* =========================================================
   HUD
========================================================= */

const hudLives =
    document.getElementById("hud-lives");

const starCount =
    document.getElementById("star-count");

const scoreCount =
    document.getElementById("score-count");

const hudStageName =
    document.getElementById("hud-stage-name");

const hudLevel =
    document.getElementById("hud-level");

const timeCount =
    document.getElementById("time-count");


/* =========================================================
   RESULT
========================================================= */

const gameoverScore =
    document.getElementById("gameover-score");

const gameoverStar =
    document.getElementById("gameover-star");

const gameoverLevel =
    document.getElementById("gameover-level");

const completeScore =
    document.getElementById("complete-score");

const completeStar =
    document.getElementById("complete-star");

const completeTime =
    document.getElementById("complete-time");

const winScore =
    document.getElementById("win-score");

const winStar =
    document.getElementById("win-star");


/* =========================================================
   IMAGES
========================================================= */

const images = {

    snoopyIdle:
        new Image(),

    snoopyWalk:
        new Image(),

    level1:
        new Image(),

    level2:
        new Image(),

    level3:
        new Image()
};


/*
    FOLDER HARUS:
    Assets
*/

images.snoopyIdle.src =
    "Assets/snoopy-idle.png";

images.snoopyWalk.src =
    "Assets/snoopy-walk.png";

images.level1.src =
    "Assets/level 1.png";

images.level2.src =
    "Assets/level 2.jpg";

images.level3.src =
    "Assets/level 3.png";


/* =========================================================
   LEVEL DATA
========================================================= */

const levels = [

    {
        id: 1,

        name: "GREEN VALLEY",

        background:
            images.level1,

        width: 5200,

        ground: 575,

        speed: 5,

        gravity: 0.62,

        jumpPower: -13,

        finish: 4800
    },


    {
        id: 2,

        name: "FOREST ADVENTURE",

        background:
            images.level2,

        width: 6000,

        ground: 575,

        speed: 5.3,

        gravity: 0.65,

        jumpPower: -13.5,

        finish: 5600
    },


    {
        id: 3,

        name: "DREAMY SUNSET",

        background:
            images.level3,

        width: 6800,

        ground: 575,

        speed: 5.5,

        gravity: 0.68,

        jumpPower: -14,

        finish: 6400
    }

];


/* =========================================================
   GAME STATE
========================================================= */

let currentLevel = 0;

let levelData =
    levels[currentLevel];

let gameRunning = false;

let gamePaused = false;

let gameOver = false;

let levelComplete = false;

let soundOn = true;

let animationId = null;


/* =========================================================
   PLAYER
========================================================= */

const player = {

    x: 120,

    y: 400,

    width: 80,

    height: 105,

    velocityY: 0,

    speed: 5,

    jumpPower: -13,

    gravity: 0.62,

    grounded: false,

    facing: 1,

    moving: false,

    invincible: false,

    invincibleTimer: 0
};


/* =========================================================
   CAMERA
========================================================= */

let cameraX = 0;


/* =========================================================
   SCORE
========================================================= */

let score = 0;

let starsCollected = 0;

let lives = 3;


/* =========================================================
   TIMER
========================================================= */

let startTime = 0;

let elapsedTime = 0;


/* =========================================================
   INPUT
========================================================= */

const keys = {

    left: false,

    right: false,

    jump: false
};


/* =========================================================
   OBJECT
========================================================= */

let stars = [];

let obstacles = [];

let enemies = [];

let particles = [];


/* =========================================================
   UNLOCK LEVEL
========================================================= */

let unlockedLevel =
    Number(
        localStorage.getItem(
            "snoopyUnlockedLevel"
        )
    ) || 1;


/* =========================================================
   MENU STARS
========================================================= */

function createMenuStars() {

    const container =
        document.getElementById(
            "stars-background"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const star =
            document.createElement("span");

        star.className =
            "star-particle";

        star.textContent =
            Math.random() > 0.5
                ? "✦"
                : "•";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.fontSize =
            Math.random() * 10 + 5 + "px";

        star.style.animationDuration =
            Math.random() * 6 + 5 + "s";

        star.style.animationDelay =
            Math.random() * 8 + "s";

        container.appendChild(star);
    }
}

createMenuStars();


/* =========================================================
   SCREEN SWITCH
========================================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });

    screen.classList.add(
        "active"
    );
}


/* =========================================================
   HIDE OVERLAYS
========================================================= */

function hideOverlays() {

    overlayPause.classList.add(
        "hidden"
    );

    overlayGameover.classList.add(
        "hidden"
    );

    overlayStageComplete.classList.add(
        "hidden"
    );

    overlayWin.classList.add(
        "hidden"
    );
}


/* =========================================================
   MAIN MENU
========================================================= */

function openMainMenu() {

    gameRunning = false;

    gamePaused = false;

    gameOver = false;

    levelComplete = false;

    cancelAnimationFrame(
        animationId
    );

    hideOverlays();

    startPanel.style.display =
        "none";

    showScreen(mainMenu);

    updateStageList();
}


/* =========================================================
   PLAY
========================================================= */

btnPlay.addEventListener(
    "click",
    () => {

        currentLevel = 0;

        score = 0;

        starsCollected = 0;

        lives = 3;

        openGame();

    }
);


/* =========================================================
   HOW TO PLAY
========================================================= */

btnHowTo.addEventListener(
    "click",
    () => {

        showScreen(
            howToScreen
        );

    }
);


btnHowToBack.addEventListener(
    "click",
    () => {

        showScreen(
            mainMenu
        );

    }
);


/* =========================================================
   SELECT STAGE
========================================================= */

btnSelectStage.addEventListener(
    "click",
    () => {

        updateStageList();

        showScreen(
            stageScreen
        );

    }
);


btnStageBack.addEventListener(
    "click",
    () => {

        showScreen(
            mainMenu
        );

    }
);


/* =========================================================
   RESET PROGRESS
========================================================= */

btnResetProgress.addEventListener(
    "click",
    () => {

        unlockedLevel = 1;

        localStorage.setItem(
            "snoopyUnlockedLevel",
            "1"
        );

        updateStageList();

    }
);


/* =========================================================
   STAGE LIST
========================================================= */

function updateStageList() {

    stageList.innerHTML = "";

    levels.forEach(
        (level, index) => {

            const card =
                document.createElement(
                    "div"
                );

            const unlocked =
                index + 1 <=
                unlockedLevel;

            card.className =
                "stage-card " +
                (
                    unlocked
                        ? ""
                        : "locked"
                );

            card.innerHTML = `

                <div class="stage-card-title">

                    <span>
                        LEVEL ${level.id}
                    </span>

                    <span>
                        ${
                            unlocked
                                ? "🔓"
                                : "🔒"
                        }
                    </span>

                </div>

                <div class="stage-card-info">

                    ${level.name}

                    ${
                        index === 0
                            ? " • EASY"
                            : index === 1
                                ? " • MEDIUM"
                                : " • HARD"
                    }

                </div>
            `;

            if (unlocked) {

                card.addEventListener(
                    "click",
                    () => {

                        currentLevel =
                            index;

                        openGame();

                    }
                );

            }

            stageList.appendChild(
                card
            );

        }
    );
}


/* =========================================================
   OPEN GAME
========================================================= */

function openGame() {

    levelData =
        levels[currentLevel];

    gameRunning = false;

    gamePaused = false;

    gameOver = false;

    levelComplete = false;

    hideOverlays();

    startPanel.style.display =
        "block";

    showScreen(
        gameScreen
    );

    resetLevel();

    updateHUD();

    draw();
}


/* =========================================================
   RESET LEVEL
========================================================= */

function resetLevel() {

    player.x = 120;

    player.y =
        levelData.ground -
        player.height;

    player.velocityY = 0;

    player.speed =
        levelData.speed;

    player.jumpPower =
        levelData.jumpPower;

    player.gravity =
        levelData.gravity;

    player.grounded = true;

    player.moving = false;

    player.facing = 1;

    player.invincible = false;

    player.invincibleTimer = 0;

    cameraX = 0;

    stars = [];

    obstacles = [];

    enemies = [];

    particles = [];

    elapsedTime = 0;

    createLevelObjects();

    updateHUD();
}


/* =========================================================
   CREATE LEVEL OBJECTS
========================================================= */

function createLevelObjects() {

    const starPositions = [

        [450, 490, 1],

        [720, 430, 1],

        [1000, 490, 2],

        [1300, 450, 1],

        [1600, 390, 2],

        [1950, 480, 1],

        [2250, 430, 1],

        [2600, 350, 2],

        [3000, 470, 1],

        [3350, 420, 1],

        [3700, 350, 2],

        [4100, 460, 1],

        [4450, 400, 2],

        [4700, 480, 1]

    ];


    starPositions.forEach(
        data => {

            if (
                data[0] <
                levelData.finish
            ) {

                stars.push({

                    x: data[0],

                    y: data[1],

                    radius:
                        data[2] === 2
                            ? 24
                            : 17,

                    value:
                        data[2],

                    collected: false,

                    rotation: 0

                });

            }

        }
    );


    obstacles = [

        {
            x: 650,
            y: 500,
            width: 120,
            height: 25
        },

        {
            x: 1150,
            y: 470,
            width: 130,
            height: 25
        },

        {
            x: 1750,
            y: 430,
            width: 140,
            height: 25
        },

        {
            x: 2350,
            y: 390,
            width: 150,
            height: 25
        },

        {
            x: 2900,
            y: 450,
            width: 130,
            height: 25
        },

        {
            x: 3500,
            y: 400,
            width: 150,
            height: 25
        },

        {
            x: 4200,
            y: 440,
            width: 150,
            height: 25
        }

    ];


    enemies = [

        {
            x: 1450,
            y:
                levelData.ground - 50,
            width: 50,
            height: 50,
            direction: 1,
            speed: 1.2,
            alive: true
        },

        {
            x: 2800,
            y:
                levelData.ground - 50,
            width: 50,
            height: 50,
            direction: -1,
            speed: 1.5,
            alive: true
        },

        {
            x: 3900,
            y:
                levelData.ground - 50,
            width: 50,
            height: 50,
            direction: 1,
            speed: 1.7,
            alive: true
        }

    ];
}


/* =========================================================
   START GAME
========================================================= */

btnStartGame.addEventListener(
    "click",
    startGame
);


function startGame() {

    gameRunning = true;

    gamePaused = false;

    gameOver = false;

    levelComplete = false;

    startTime =
        performance.now();

    startPanel.style.display =
        "none";

    hideOverlays();

    cancelAnimationFrame(
        animationId
    );

    gameLoop();
}


/* =========================================================
   UPDATE
========================================================= */

function update() {

    updatePlayer();

    updateStars();

    updateEnemies();

    updateParticles();

    checkStarCollision();

    checkObstacleCollision();

    checkEnemyCollision();

    checkFinish();

    updateCamera();

    updateTimer();

    updateHUD();
}


/* =========================================================
   PLAYER
========================================================= */

function updatePlayer() {

    player.moving = false;


    if (keys.left) {

        player.x -=
            player.speed;

        player.facing = -1;

        player.moving = true;
    }


    if (keys.right) {

        player.x +=
            player.speed;

        player.facing = 1;

        player.moving = true;
    }


    if (
        keys.jump &&
        player.grounded
    ) {

        player.velocityY =
            player.jumpPower;

        player.grounded = false;

        createJumpParticles();

    }


    keys.jump = false;


    player.velocityY +=
        player.gravity;


    if (
        player.velocityY > 14
    ) {

        player.velocityY = 14;
    }


    player.y +=
        player.velocityY;


    if (player.x < 0) {

        player.x = 0;
    }


    if (
        player.x >
        levelData.width -
        player.width
    ) {

        player.x =
            levelData.width -
            player.width;
    }


    const ground =
        groundAt(
            player.x +
            player.width / 2
        );


    if (
        player.y +
        player.height >=
        ground
    ) {

        player.y =
            ground -
            player.height;

        player.velocityY = 0;

        player.grounded = true;

    } else {

        player.grounded = false;

    }


    if (
        player.y >
        GAME_HEIGHT + 200
    ) {

        hitPlayer();

        respawnPlayer();

    }


    if (
        player.invincible
    ) {

        player.invincibleTimer--;

        if (
            player.invincibleTimer <= 0
        ) {

            player.invincible =
                false;
        }
    }
}


/* =========================================================
   GROUND
   TANJAKAN LEVEL 1 HALUS
========================================================= */

function groundAt(x) {

    /*
        LEVEL 1
    */

    if (
        currentLevel === 0
    ) {

        if (x < 1200) {

            return 575;

        }


        if (
            x >= 1200 &&
            x < 1550
        ) {

            const progress =
                (x - 1200) / 350;

            const smooth =
                progress *
                progress *
                (3 - 2 * progress);

            return (
                575 -
                smooth * 45
            );
        }


        if (
            x >= 1550 &&
            x < 1900
        ) {

            const progress =
                (x - 1550) / 350;

            const smooth =
                progress *
                progress *
                (3 - 2 * progress);

            return (
                530 +
                smooth * 45
            );
        }


        return 575;
    }


    /*
        LEVEL 2
    */

    if (
        currentLevel === 1
    ) {

        if (
            x > 1800 &&
            x < 2200
        ) {

            const progress =
                (x - 1800) / 400;

            const smooth =
                progress *
                progress *
                (3 - 2 * progress);

            return (
                575 -
                smooth * 55
            );
        }


        if (
            x >= 2200 &&
            x < 2600
        ) {

            const progress =
                (x - 2200) / 400;

            const smooth =
                progress *
                progress *
                (3 - 2 * progress);

            return (
                520 +
                smooth * 55
            );
        }


        return 575;
    }


    /*
        LEVEL 3
    */

    if (
        x > 2500 &&
        x < 2900
    ) {

        const progress =
            (x - 2500) / 400;

        const smooth =
            progress *
            progress *
            (3 - 2 * progress);

        return (
            575 -
            smooth * 75
        );
    }


    if (
        x >= 2900 &&
        x < 3300
    ) {

        const progress =
            (x - 2900) / 400;

        const smooth =
            progress *
            progress *
            (3 - 2 * progress);

        return (
            500 +
            smooth * 75
        );
    }


    return 575;
}


/* =========================================================
   CAMERA
========================================================= */

function updateCamera() {

    cameraX =
        player.x -
        GAME_WIDTH * 0.35;


    if (cameraX < 0) {

        cameraX = 0;
    }


    const maxCamera =
        levelData.width -
        GAME_WIDTH;


    if (
        cameraX > maxCamera
    ) {

        cameraX =
            Math.max(
                0,
                maxCamera
            );
    }
}


/* =========================================================
   STARS
========================================================= */

function updateStars() {

    stars.forEach(
        star => {

            if (
                !star.collected
            ) {

                star.rotation +=
                    0.03;

            }

        }
    );
}


function checkStarCollision() {

    stars.forEach(
        star => {

            if (
                star.collected
            ) {

                return;

            }


            const distance =
                Math.hypot(

                    (
                        player.x +
                        player.width / 2
                    ) -
                    star.x,

                    (
                        player.y +
                        player.height / 2
                    ) -
                    star.y

                );


            if (
                distance <
                star.radius + 35
            ) {

                star.collected =
                    true;

                starsCollected += 1;

                score +=
                    star.value === 2
                        ? 20
                        : 10;

                createCollectParticles(
                    star.x,
                    star.y
                );

            }

        }
    );
}


/* =========================================================
   ENEMIES
========================================================= */

function updateEnemies() {

    enemies.forEach(
        enemy => {

            if (
                !enemy.alive
            ) {

                return;

            }


            enemy.x +=
                enemy.direction *
                enemy.speed;


            if (
                enemy.x < 100 ||
                enemy.x >
                levelData.width - 100
            ) {

                enemy.direction *= -1;

            }

        }
    );
}


function checkEnemyCollision() {

    enemies.forEach(
        enemy => {

            if (
                !enemy.alive
            ) {

                return;

            }


            if (
                rectCollision(

                    player.x + 12,
                    player.y + 12,
                    player.width - 24,
                    player.height - 15,

                    enemy.x,
                    enemy.y,
                    enemy.width,
                    enemy.height

                )
            ) {

                if (
                    player.velocityY > 0 &&
                    player.y +
                    player.height -
                    20 <
                    enemy.y + 15
                ) {

                    player.velocityY =
                        player.jumpPower * 0.65;

                    score += 30;

                    enemy.alive =
                        false;

                    createCollectParticles(
                        enemy.x +
                        enemy.width / 2,
                        enemy.y
                    );

                } else {

                    hitPlayer();

                }

            }

        }
    );
}


/* =========================================================
   OBSTACLE
========================================================= */

function checkObstacleCollision() {

    obstacles.forEach(
        obstacle => {

            if (
                rectCollision(

                    player.x + 10,
                    player.y + 10,
                    player.width - 20,
                    player.height - 15,

                    obstacle.x,
                    obstacle.y,
                    obstacle.width,
                    obstacle.height

                )
            ) {

                if (
                    player.velocityY >= 0 &&
                    player.y +
                    player.height -
                    10 <
                    obstacle.y + 20
                ) {

                    player.y =
                        obstacle.y -
                        player.height;

                    player.velocityY = 0;

                    player.grounded =
                        true;

                } else {

                    if (
                        player.x <
                        obstacle.x
                    ) {

                        player.x =
                            obstacle.x -
                            player.width;

                    } else {

                        player.x =
                            obstacle.x +
                            obstacle.width;

                    }

                }

            }

        }
    );
}


/* =========================================================
   RECT COLLISION
========================================================= */

function rectCollision(
    ax,
    ay,
    aw,
    ah,
    bx,
    by,
    bw,
    bh
) {

    return (
        ax < bx + bw &&
        ax + aw > bx &&
        ay < by + bh &&
        ay + ah > by
    );
}


/* =========================================================
   HIT PLAYER
========================================================= */

function hitPlayer() {

    if (
        player.invincible
    ) {

        return;
    }


    lives--;


    player.invincible =
        true;

    player.invincibleTimer =
        100;


    player.velocityY =
        -8;


    createHitParticles(
        player.x,
        player.y
    );


    if (
        lives <= 0
    ) {

        endGame();

    }
}


/* =========================================================
   RESPAWN
========================================================= */

function respawnPlayer() {

    player.x -= 100;


    if (
        player.x < 0
    ) {

        player.x = 50;
    }


    player.y =
        groundAt(
            player.x
        ) -
        player.height;


    player.velocityY = 0;
}


/* =========================================================
   FINISH
========================================================= */

function checkFinish() {

    if (
        player.x >=
        levelData.finish
    ) {

        completeLevel();

    }
}


/* =========================================================
   COMPLETE LEVEL
========================================================= */

function completeLevel() {

    if (
        levelComplete
    ) {

        return;
    }


    levelComplete = true;

    gameRunning = false;


    if (
        currentLevel ===
        levels.length - 1
    ) {

        winScore.textContent =
            score;

        winStar.textContent =
            starsCollected;

        overlayWin.classList.remove(
            "hidden"
        );

        return;
    }


    completeScore.textContent =
        score;

    completeStar.textContent =
        starsCollected;

    completeTime.textContent =
        formatTime(
            elapsedTime
        );


    unlockedLevel =
        Math.max(
            unlockedLevel,
            currentLevel + 2
        );


    localStorage.setItem(
        "snoopyUnlockedLevel",
        unlockedLevel
    );


    overlayStageComplete.classList.remove(
        "hidden"
    );
}


/* =========================================================
   NEXT LEVEL
========================================================= */

btnNextStage.addEventListener(
    "click",
    () => {

        if (
            currentLevel < 2
        ) {

            currentLevel++;

            overlayStageComplete.classList.add(
                "hidden"
            );

            openGame();

        }

    }
);


/* =========================================================
   GAME OVER
========================================================= */

function endGame() {

    gameRunning = false;

    gameOver = true;

    gameoverScore.textContent =
        score;

    gameoverStar.textContent =
        starsCollected;

    gameoverLevel.textContent =
        currentLevel + 1;

    overlayGameover.classList.remove(
        "hidden"
    );
}


/* =========================================================
   TRY AGAIN
========================================================= */

btnTryAgain.addEventListener(
    "click",
    () => {

        overlayGameover.classList.add(
            "hidden"
        );

        loadLevel(
            currentLevel
        );

        startGame();

    }
);


/* =========================================================
   PARTICLES
========================================================= */

function createCollectParticles(
    x,
    y
) {

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        particles.push({

            x: x,

            y: y,

            vx:
                (Math.random() - 0.5) * 5,

            vy:
                (Math.random() - 0.5) * 5,

            life: 35,

            type: "star"

        });

    }
}


function createHitParticles(
    x,
    y
) {

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        particles.push({

            x: x,

            y: y,

            vx:
                (Math.random() - 0.5) * 7,

            vy:
                (Math.random() - 0.8) * 7,

            life: 40,

            type: "hit"

        });

    }
}


function createJumpParticles() {

    for (
        let i = 0;
        i < 7;
        i++
    ) {

        particles.push({

            x:
                player.x +
                player.width / 2,

            y:
                player.y +
                player.height,

            vx:
                (Math.random() - 0.5) * 4,

            vy:
                -Math.random() * 2,

            life: 25,

            type: "jump"

        });

    }
}


function updateParticles() {

    particles.forEach(
        particle => {

            particle.x +=
                particle.vx;

            particle.y +=
                particle.vy;

            particle.vy +=
                0.15;

            particle.life--;

        }
    );


    particles =
        particles.filter(
            particle =>
                particle.life > 0
        );
}


/* =========================================================
   DRAW
========================================================= */

function draw() {

    ctx.clearRect(
        0,
        0,
        GAME_WIDTH,
        GAME_HEIGHT
    );

    drawBackground();

    drawGround();

    drawPlatforms();

    drawStars();

    drawEnemies();

    drawFinish();

    drawParticles();

    drawPlayer();
}


/* =========================================================
   BACKGROUND
========================================================= */

function drawBackground() {

    const background =
        levelData.background;


    if (
        background.complete &&
        background.naturalWidth > 0
    ) {

        const scaleX =
            GAME_WIDTH /
            background.naturalWidth;

        const scaleY =
            GAME_HEIGHT /
            background.naturalHeight;

        const scale =
            Math.max(
                scaleX,
                scaleY
            );


        const width =
            background.naturalWidth *
            scale;

        const height =
            background.naturalHeight *
            scale;


        const offsetX =
            (
                GAME_WIDTH -
                width
            ) / 2;


        const offsetY =
            (
                GAME_HEIGHT -
                height
            ) / 2;


        ctx.drawImage(

            background,

            0,
            0,
            background.naturalWidth,
            background.naturalHeight,

            offsetX,
            offsetY,
            width,
            height

        );

    } else {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                GAME_HEIGHT
            );

        gradient.addColorStop(
            0,
            "#65c7f7"
        );

        gradient.addColorStop(
            1,
            "#182848"
        );

        ctx.fillStyle =
            gradient;

        ctx.fillRect(
            0,
            0,
            GAME_WIDTH,
            GAME_HEIGHT
        );
    }


    ctx.fillStyle =
        "rgba(10,20,30,.08)";

    ctx.fillRect(
        0,
        0,
        GAME_WIDTH,
        GAME_HEIGHT
    );
}


/* =========================================================
   DRAW GROUND
   HALUS / TIDAK SEPERTI TANGGA
========================================================= */

function drawGround() {

    const start =
        Math.max(
            0,
            Math.floor(
                cameraX / 20
            ) * 20 - 40
        );


    const end =
        Math.min(
            levelData.width,
            cameraX +
            GAME_WIDTH +
            80
        );


    /*
        TANAH
    */

    ctx.beginPath();

    ctx.moveTo(
        start - cameraX,
        GAME_HEIGHT
    );


    for (
        let x = start;
        x <= end;
        x += 20
    ) {

        ctx.lineTo(
            x - cameraX,
            groundAt(x)
        );

    }


    ctx.lineTo(
        end - cameraX,
        GAME_HEIGHT
    );

    ctx.closePath();

    ctx.fillStyle =
        "#6b432e";

    ctx.fill();


    /*
        RUMPUT
    */

    ctx.beginPath();


    for (
        let x = start;
        x <= end;
        x += 20
    ) {

        if (
            x === start
        ) {

            ctx.moveTo(
                x - cameraX,
                groundAt(x)
            );

        } else {

            ctx.lineTo(
                x - cameraX,
                groundAt(x)
            );

        }

    }


    ctx.lineTo(
        end - cameraX,
        groundAt(end) + 15
    );

    ctx.lineTo(
        start - cameraX,
        groundAt(start) + 15
    );

    ctx.closePath();

    ctx.fillStyle =
        "#79c94b";

    ctx.fill();


    /*
        BATU PIXEL
    */

    ctx.fillStyle =
        "#4d3529";


    for (
        let x = start;
        x < end;
        x += 80
    ) {

        const ground =
            groundAt(x);


        ctx.fillRect(
            x - cameraX + 10,
            ground + 35,
            18,
            12
        );


        ctx.fillRect(
            x - cameraX + 48,
            ground + 55,
            20,
            13
        );

    }
}


/* =========================================================
   PLATFORMS
========================================================= */

function drawPlatforms() {

    obstacles.forEach(
        obstacle => {

            const x =
                obstacle.x -
                cameraX;


            if (
                x < -200 ||
                x >
                GAME_WIDTH + 200
            ) {

                return;
            }


            ctx.fillStyle =
                "#5b3a29";

            ctx.fillRect(
                x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            );


            ctx.fillStyle =
                "#7fd34e";

            ctx.fillRect(
                x,
                obstacle.y,
                obstacle.width,
                8
            );

        }
    );
}


/* =========================================================
   DRAW STARS
========================================================= */

function drawStars() {

    stars.forEach(
        star => {

            if (
                star.collected
            ) {

                return;

            }


            const x =
                star.x -
                cameraX;

            const y =
                star.y;


            if (
                x < -100 ||
                x >
                GAME_WIDTH + 100
            ) {

                return;

            }


            ctx.save();


            ctx.translate(
                x,
                y
            );


            ctx.rotate(
                star.rotation
            );


            ctx.shadowBlur =
                star.radius > 20
                    ? 25
                    : 15;

            ctx.shadowColor =
                "#ffe36e";


            ctx.fillStyle =
                "#ffe36e";


            drawStarShape(
                0,
                0,
                star.radius,
                star.radius * 0.45,
                5
            );


            ctx.fill();


            ctx.shadowBlur = 0;


            ctx.restore();

        }
    );
}


/* =========================================================
   STAR SHAPE
========================================================= */

function drawStarShape(
    cx,
    cy,
    outerRadius,
    innerRadius,
    points
) {

    let angle =
        -Math.PI / 2;


    const step =
        Math.PI / points;


    ctx.beginPath();


    for (
        let i = 0;
        i < points * 2;
        i++
    ) {

        const radius =
            i % 2 === 0
                ? outerRadius
                : innerRadius;


        const x =
            cx +
            Math.cos(angle) *
            radius;


        const y =
            cy +
            Math.sin(angle) *
            radius;


        if (
            i === 0
        ) {

            ctx.moveTo(
                x,
                y
            );

        } else {

            ctx.lineTo(
                x,
                y
            );

        }


        angle += step;
    }


    ctx.closePath();
}


/* =========================================================
   DRAW ENEMIES
========================================================= */

function drawEnemies() {

    enemies.forEach(
        enemy => {

            if (
                !enemy.alive
            ) {

                return;

            }


            const x =
                enemy.x -
                cameraX;


            if (
                x < -100 ||
                x >
                GAME_WIDTH + 100
            ) {

                return;

            }


            ctx.fillStyle =
                "#673b65";

            ctx.fillRect(
                x,
                enemy.y,
                enemy.width,
                enemy.height
            );


            ctx.fillStyle =
                "#f4d35e";

            ctx.fillRect(
                x + 10,
                enemy.y + 12,
                9,
                9
            );

            ctx.fillRect(
                x + 31,
                enemy.y + 12,
                9,
                9
            );


            ctx.fillStyle =
                "#202033";

            ctx.fillRect(
                x + 13,
                enemy.y + 15,
                4,
                4
            );

            ctx.fillRect(
                x + 34,
                enemy.y + 15,
                4,
                4
            );

        }
    );
}


/* =========================================================
   DRAW PLAYER
========================================================= */

function drawPlayer() {

    if (
        player.invincible &&
        Math.floor(
            player.invincibleTimer / 6
        ) % 2 === 0
    ) {

        return;

    }


    const image =
        player.moving
            ? images.snoopyWalk
            : images.snoopyIdle;


    const x =
        player.x -
        cameraX;


    const y =
        player.y;


    ctx.save();


    if (
        player.facing === -1
    ) {

        ctx.translate(
            x + player.width,
            y
        );

        ctx.scale(
            -1,
            1
        );


        drawSnoopyImage(
            image,
            0,
            0
        );

    } else {

        drawSnoopyImage(
            image,
            x,
            y
        );

    }


    ctx.restore();
}


/* =========================================================
   SNOOPY IMAGE
========================================================= */

function drawSnoopyImage(
    image,
    x,
    y
) {

    if (
        image.complete &&
        image.naturalWidth > 0
    ) {

        ctx.imageSmoothingEnabled =
            false;


        ctx.drawImage(
            image,
            x,
            y,
            player.width,
            player.height
        );

    } else {

        ctx.fillStyle =
            "#ffffff";

        ctx.fillRect(
            x + 15,
            y + 20,
            50,
            55
        );


        ctx.fillStyle =
            "#111827";

        ctx.fillRect(
            x + 55,
            y + 10,
            25,
            25
        );
    }
}


/* =========================================================
   DRAW PARTICLES
========================================================= */

function drawParticles() {

    particles.forEach(
        particle => {

            const x =
                particle.x -
                cameraX;

            const y =
                particle.y;


            ctx.save();

            ctx.globalAlpha =
                particle.life / 40;


            if (
                particle.type === "star"
            ) {

                ctx.fillStyle =
                    "#ffe36e";


                drawStarShape(
                    x,
                    y,
                    7,
                    3,
                    5
                );


                ctx.fill();

            } else if (
                particle.type === "hit"
            ) {

                ctx.fillStyle =
                    "#ff7182";


                ctx.fillRect(
                    x,
                    y,
                    6,
                    6
                );

            } else {

                ctx.fillStyle =
                    "#d8c2a5";


                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    4,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }


            ctx.restore();

        }
    );
}


/* =========================================================
   FINISH
========================================================= */

function drawFinish() {

    const x =
        levelData.finish -
        cameraX;


    if (
        x < -100 ||
        x > GAME_WIDTH + 100
    ) {

        return;

    }


    ctx.fillStyle =
        "#eeeeee";

    ctx.fillRect(
        x,
        groundAt(
            levelData.finish
        ) - 110,
        8,
        110
    );


    ctx.fillStyle =
        "#ff5c7a";

    ctx.fillRect(
        x + 8,
        groundAt(
            levelData.finish
        ) - 105,
        55,
        35
    );


    ctx.fillStyle =
        "#ffffff";

    ctx.fillRect(
        x + 8,
        groundAt(
            levelData.finish
        ) - 70,
        55,
        35
    );
}


/* =========================================================
   TIMER
========================================================= */

function updateTimer() {

    if (
        !gameRunning ||
        gamePaused
    ) {

        return;
    }


    elapsedTime =
        performance.now() -
        startTime;
}


/* =========================================================
   HUD
========================================================= */

function updateHUD() {

    hudLives.textContent =
        lives;

    starCount.textContent =
        starsCollected;

    scoreCount.textContent =
        score;

    hudStageName.textContent =
        levelData.name;

    hudLevel.textContent =
        currentLevel + 1;

    timeCount.textContent =
        formatTime(
            elapsedTime
        );
}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(
    milliseconds
) {

    const totalSeconds =
        Math.floor(
            milliseconds / 1000
        );


    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const seconds =
        totalSeconds % 60;


    return (
        String(minutes)
            .padStart(2, "0")
        +
        ":" +
        String(seconds)
            .padStart(2, "0")
    );
}


/* =========================================================
   LOAD LEVEL
========================================================= */

function loadLevel(index) {

    currentLevel =
        index;

    levelData =
        levels[currentLevel];

    gameRunning = false;

    gamePaused = false;

    gameOver = false;

    levelComplete = false;

    resetLevel();

    hideOverlays();

    updateHUD();

    draw();
}


/* =========================================================
   PAUSE
========================================================= */

btnPause.addEventListener(
    "click",
    () => {

        if (
            !gameRunning ||
            gameOver ||
            levelComplete
        ) {

            return;
        }


        gamePaused = true;

        overlayPause.classList.remove(
            "hidden"
        );

    }
);


/* =========================================================
   RESUME
========================================================= */

btnResume.addEventListener(
    "click",
    () => {

        gamePaused = false;

        overlayPause.classList.add(
            "hidden"
        );


        startTime =
            performance.now() -
            elapsedTime;


        gameLoop();
    }
);


/* =========================================================
   RESTART
========================================================= */

btnRestart.addEventListener(
    "click",
    () => {

        overlayPause.classList.add(
            "hidden"
        );

        loadLevel(
            currentLevel
        );

        startGame();

    }
);


/* =========================================================
   MAIN MENU BUTTONS
========================================================= */

btnMainMenuPause.addEventListener(
    "click",
    openMainMenu
);

btnGameoverMain.addEventListener(
    "click",
    openMainMenu
);

btnCompleteMain.addEventListener(
    "click",
    openMainMenu
);

btnWinMain.addEventListener(
    "click",
    openMainMenu
);


/* =========================================================
   PLAY AGAIN
========================================================= */

btnPlayAgain.addEventListener(
    "click",
    () => {

        currentLevel = 0;

        score = 0;

        starsCollected = 0;

        lives = 3;

        overlayWin.classList.add(
            "hidden"
        );

        loadLevel(0);

        startGame();

    }
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();


        if (
            key === "arrowleft" ||
            key === "a"
        ) {

            keys.left = true;
        }


        if (
            key === "arrowright" ||
            key === "d"
        ) {

            keys.right = true;
        }


        if (
            key === " " ||
            key === "arrowup" ||
            key === "w"
        ) {

            keys.jump = true;

            event.preventDefault();
        }


        if (
            key === "p" ||
            key === "escape"
        ) {

            if (
                gameRunning &&
                !gamePaused
            ) {

                btnPause.click();

            } else if (
                gamePaused
            ) {

                btnResume.click();
            }
        }

    }
);


document.addEventListener(
    "keyup",
    event => {

        const key =
            event.key.toLowerCase();


        if (
            key === "arrowleft" ||
            key === "a"
        ) {

            keys.left = false;
        }


        if (
            key === "arrowright" ||
            key === "d"
        ) {

            keys.right = false;
        }

    }
);


/* =========================================================
   MOBILE BUTTON
========================================================= */

function setupHoldButton(
    button,
    keyName
) {

    const start = event => {

        event.preventDefault();

        keys[keyName] = true;

        button.classList.add(
            "pressed"
        );

    };


    const end = event => {

        event.preventDefault();

        keys[keyName] = false;

        button.classList.remove(
            "pressed"
        );

    };


    button.addEventListener(
        "pointerdown",
        start
    );

    button.addEventListener(
        "pointerup",
        end
    );

    button.addEventListener(
        "pointercancel",
        end
    );

    button.addEventListener(
        "pointerleave",
        end
    );
}


setupHoldButton(
    btnLeft,
    "left"
);

setupHoldButton(
    btnRight,
    "right"
);


/* =========================================================
   JUMP BUTTON
========================================================= */

btnJump.addEventListener(
    "pointerdown",
    event => {

        event.preventDefault();

        keys.jump = true;

        btnJump.classList.add(
            "pressed"
        );

    }
);


btnJump.addEventListener(
    "pointerup",
    event => {

        event.preventDefault();

        btnJump.classList.remove(
            "pressed"
        );

    }
);


btnJump.addEventListener(
    "pointercancel",
    () => {

        btnJump.classList.remove(
            "pressed"
        );

    }
);


/* =========================================================
   SOUND
========================================================= */

btnSound.addEventListener(
    "click",
    () => {

        soundOn =
            !soundOn;

        btnSound.textContent =
            soundOn
                ? "🔊"
                : "🔇";

    }
);


/* =========================================================
   GAME LOOP
========================================================= */

function gameLoop() {

    if (
        !gameRunning ||
        gamePaused ||
        gameOver ||
        levelComplete
    ) {

        return;
    }


    update();

    draw();

    animationId =
        requestAnimationFrame(
            gameLoop
        );
}


/* =========================================================
   INITIAL
========================================================= */

loadLevel(0);

updateStageList();

showScreen(
    mainMenu
);