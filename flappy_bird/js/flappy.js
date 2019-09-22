// Change this value in order to slow down or speed up the game
const speedMultiplier = 1

function newgame() {
    // Main elements
    const playArea = document.querySelector('[wm-flappy]')
    const bird = document.querySelector('[bird]')
    const pipeTemplate = document.querySelector('#father-pipe')
    const points = document.querySelector('#points')
    const newGameTab = document.querySelector('.newgame')
    const finalPoints = document.querySelector('#final-points')
    const retry = document.querySelector('#retry')

    // Event functions
    retry.onclick = () => {
        newGameTab.style.display = 'none'
        newgame()
    }
    document.onkeydown = () => { birdFlying = true }
    document.onkeyup = () => { birdFlying = false }
    
    // starting info
    let birdFlying = false
    let pipeId = 0
    let frame = 0
    let curPipeId = 0
    
    // Set the game
    removeAllPipes()
    setBird()
    const gameId = setInterval(() => nextFrame( 4,  3, 3, gameId, frame), 1/speedMultiplier * 1000/60)

    // Functions section bellow:
    function setBird() {
        bird.style.position = 'absolute'
        bird.style.left = `${playArea.clientWidth/2 - bird.clientWidth/2}px`
        bird.style.top = `${playArea.clientHeight/2 - bird.clientHeight/2}px`
    }
    
    function generatePipe () {
        const pipe = pipeTemplate.cloneNode(true)
        pipe.gameId = `pipe-${pipeId}`
        pipeId++
        pipe.classList.add('clone-pipe')
        pipe.style.position = 'absolute'
        pipe.style.left = `${playArea.clientWidth}px`
        pipe.style.top = '0'
        setPipeGap()   
        playArea.appendChild(pipe)
    
        function setPipeGap() {
            const bodyUp = pipe.children[0]
            const bodyDown = pipe.children[4]
            let x = Math.random()
            if (x < 0.1)
                x = 0.1
            else if (x > 0.9)
                x = 0.9
            bodyUp.style.flexGrow = `${x}`
            bodyDown.style.flexGrow = `${1 - x}`
        }
    }
    
    function movePipes(speed) {
        const pipes = document.querySelectorAll('.clone-pipe')
        if (pipes) {
            pipes.forEach(pipe => {
                curPos = eval(pipe.style.left.replace('px', '')) - speed
                if (curPos > -pipe.clientWidth) {
                    pipe.style.left = `${curPos}px`
                } else {
                    playArea.removeChild(pipe)
                }
            })
        }
    }
    
    function birdMovement(down, up) {
        let curHeight = eval(bird.style.top.replace('px', ''))
        if (birdFlying) {
            curHeight -= up
            bird.style.top = curHeight <= 0 ? '0px' : `${curHeight}px`
        } else {
            curHeight += down
            bird.style.top = curHeight >= (playArea.clientHeight - bird.clientHeight) ? `${playArea.clientHeight - bird.clientHeight}px` : `${curHeight}px`
        }
    }
    
    function removeAllPipes() {
        const pipes = document.querySelectorAll('.clone-pipe')
        pipes.forEach(pipe => {
            playArea.removeChild(pipe)
        })
    }

    // Move the bird and pipes accordingly, and generate new pipes if necessary
    function nextFrame(downSpeed, upSpeed, leftSpeed, gameId) {
        if (frame % 100 === 0)
            generatePipe()
        birdMovement(downSpeed,upSpeed)
        movePipes(leftSpeed)
        const curPipe = document.getElementById(`pipe-${curPipeId}`)
        if (curPipe) {
            const curGap = curPipe.children[2]
            const birdRightBorder = bird.offsetLeft + bird.clientWidth
            if (birdRightBorder > curPipe.offsetLeft && bird.offsetLeft < curPipe.offsetLeft + curGap.clientWidth) {
                const birdBottomBorder = bird.offsetTop + bird.clientHeight
                if (bird.offsetTop < curGap.offsetTop || birdBottomBorder > curGap.offsetTop + curGap.clientHeight) {
                    clearInterval(gameId)
                    newGameTab.style.display = 'flex'
                    finalPoints.innerHTML = `Points:<br>${curPipeId}`
                    document.onkeydown = () => {
                        newGameTab.style.display = 'none'
                        newgame()
                    }
                }  
            }   else if (bird.offsetLeft >= curPipe.offsetLeft + curGap.clientWidth) {
                curPipeId++
            }
        }
        points.innerHTML = curPipeId
        frame++
    }
}

newgame()