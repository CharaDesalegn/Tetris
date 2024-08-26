const canvas = document.getElementById("canvas")
const width = 400
const music = document.getElementById("play")
const height = 600
let score = 0
music.volume = 0.2
document.addEventListener('keydown', function() {
    music.play();
}, { once: true });
const score_lable = document.getElementById("score")

const block_width = 40
const width_length = width/block_width
const height_lenght = height/block_width
const fps = 1.5
canvas.width = width
canvas.height = height
canvas.style.backgroundColor = "gray"
const context = canvas.getContext("2d")
let collition = false
let i = new Intity(5,1,7)
let temp_grid = empty_array()
let main_grid = empty_array()

// draw()
making_grid_line()



document.onkeydown = function (e) {

    switch (e.keyCode) {
        case 32:
            i.move_down()
            break;
        case 37:
            if(able_to_move(i,-1)){
                i.x -= 1
            };
            break;
        case 39:
            if(able_to_move(i,1)){
                i.x += 1
            };
            break;
        case 40:
            i.rotate("left");
            break;
    }
}

function update(){
    i.y+=1
    // able_to_move(i)
    

    setTimeout(() => {
        requestAnimationFrame(update);
      }, 1000 / fps)
}
function update_draw(){

    collition = false
    block_deleter()
    bind_intity_and_array(i)
    if(!collition){
        draw(temp_grid)
    }else{
        main_grid = temp_grid
        i = new Intity(5,0,Math.floor(Math.random()*7)+1)
        draw(main_grid)
        if(!able_to_move(i,0)){
            score_lable.innerText = "Game Over :( your score: " + score
            music.pause()
            document.getElementById("over").play()

            return
        }
    }
    making_grid_line()
    setTimeout(() => {
        requestAnimationFrame(update_draw);
      }, 10)
}
update()
update_draw()