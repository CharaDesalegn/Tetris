class Intity{
    constructor(x,y,type){
        this.w = block_width
        this.x = x
        this.y = y
        this.type = Intity_type_generetor(type)
        this.pos = []
    }
    
    rotate(dir){
        if(dir == "left"){
            this.type = rotate_left(this.type)
            if(!able_to_move(this,0)){
                for(let i = 0;i<3;i++){
                    this.x--
                    if(able_to_move(this,0)){
                        return
                    }
                }
            }
        }
    }
    block_positions(sin){
        this.pos = []
        for(let i = 0;i < this.type.length;i++){
            for(let j = 0;j < this.type[0].length;j++){
                if(this.type[i][j] != 0){
                    this.pos.push(`${this.x+i+sin}${this.y+j}`)
                }
            }
        }
        // console.log(this.pos)
        return this.pos
    }
    move_down(){
        document.getElementById("move_down").pause()

        document.getElementById("move_down").play()

        while(able_to_move(this,0)){
            this.y++
        }
    }

}

function Intity_type_generetor(t){
    if(t==1){// T block
        return [[0,1,0],[1,1,1]]
    }else if(t == 2){// Z block
        return [[2,2,0],[0,2,2]]
    }else if(t == 3){// S block
        return [[0,3,3],[3,3,0]]
    }else if(t==4){// L block
        return [[4,4,4],[0,0,4]]
    }else if(t==5){// J block
        return [[0,0,5],[5,5,5],]
    }else if(t == 6){// O block
        return [[6,6],[6,6]]
    }else if(t==7){// I block
        return [[7,7,7,7]]
    }
}
function Intity_type_colors(t){
    if(t==1){// T block
        return "#A020F0"
    }else if(t == 2){// Z block
        return "#FF0000"
    }else if(t == 3){// S block
        return "#00FF00"
    }else if(t==4){// L block
        return "#FFA500"
    }else if(t==5){// J block
        return "#0000FF"
    }else if(t == 6){// O block
        return "#FFFF00"
    }else if(t==7){// I block
        return "#00FFFF"
    }
}
