function rotate_right(matrix) {
    const transposedMatrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    const rotatedMatrix = transposedMatrix.map(row => row.reverse());
    return rotatedMatrix;
}
function rotate_left(matrix) {
    const transposedMatrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    const rotatedMatrix = transposedMatrix.reverse();
    return rotatedMatrix;
}
function making_grid_line(){
    context.strokeStyle = "black"
    for(let i = 0;i < width_length;i++){
        context.beginPath()
        context.moveTo(i*block_width,0)
        context.lineTo(i*block_width,height)
        context.stroke()
    }
    for(let i = 0;i < height_lenght;i++){
        context.beginPath()
        context.moveTo(0,i*block_width)
        context.lineTo(width,i*block_width)
        context.stroke()
    }
}
function empty_array(){
    let array = []
    for(let i = 0;i < width_length;i++){
        let row = []
        for(let j = 0;j < height_lenght;j++){
            row.push(0)
        }
        array.push(row)
    }
    return array
}
function draw(matrix){
    context.clearRect(0,0,width,height)
    let x = 0
    
    let y = 0
    for(let i = 0;i < width_length;i++){
        x = 0
        for(let j = 0;j < height_lenght;j++){
            if(matrix[i][j] != 0){
                context.fillStyle = Intity_type_colors(matrix[i][j])
                context.fillRect(y,x,block_width,block_width)
            }else if (j==14){
                context.fillStyle = "black"
                context.fillRect(y,x,block_width,block_width)
            }
            x += block_width
        }
        y += block_width
    }
    

}
function bind_intity_and_array(I){
    temp_grid = bind_main_grid_and_temp_grid()
    const pos = block_finder_for_normal_collition()
    for(let i = 0;i < width_length;i++){
        for(let j = 0;j < height_lenght;j++){
            if(i==I.x && j == I.y){
                for(let x = 0;x < I.type.length;x++){
                    for(let y = 0;y < I.type[0].length;y++){
                        if(I.type[x][y] != 0){
                            if(pos.includes(`${i+x}${j+y}`)){
                                collition = true
                                for(let x = 0;x < I.type.length;x++){
                                    for(let y = 0;y < I.type[0].length;y++){
                                        if(I.type[x][y] != 0){
                                            // console.log(main_grid,I.type[x][y])
                                            temp_grid[i+x][j+y-1] = I.type[x][y]
                                            if(pos.includes(`${i+x}${j+y}`)){
                                                collition = true
                                            }
                                        }
                                    }
                                }
                                return
                            }
                        }
                    }
                }
                for(let x = 0;x < I.type.length;x++){
                    for(let y = 0;y < I.type[0].length;y++){
                        if(I.type[x][y] != 0){
                            // console.log(main_grid,I.type[x][y])
                            temp_grid[i+x][j+y] = I.type[x][y]
                            if(pos.includes(`${i+x}${j+y}`)){
                                collition = true
                            }
                        }
                    }
                }
                return
            }
        }
    }
}
function bind_main_grid_and_temp_grid(){
    ans = empty_array()
    for(let i = 0;i < width_length;i++){
        for(let j = 0;j < height_lenght;j++){
            ans[i][j] = main_grid[i][j]
        }
    }
    return ans
}
function block_finder_for_normal_collition(){
    pos = []
    for(let i = 0;i < width_length;i++){
        pos.push(`${i}14`)
    }
    for(let i = 0;i < width_length;i++){
        for(let j = 0;j < height_lenght;j++){
            if(main_grid[i][j] != 0){
                pos.push(`${i}${j}`)
            }
        }
    }
    return pos
}
function find_blocks_to_delete(){

    for(let j = 0;j < height_lenght;j++){
        let row = 0
        for(let i = 0;i < width_length;i++){
            if(main_grid[i][j]!= 0){
                row++
            }
        }
        if (row == width_length){
            return j
        }
    }
}
function block_deleter(){
    if(find_blocks_to_delete()){
        const indx = find_blocks_to_delete()
        for(let i = 0;i < width_length;i++){
            main_grid[i][indx] = 0
            score+= 5
            document.getElementById("delete").play()

            score_lable.innerText = "score: "+score
        }
        for(let i = 0;i < width_length;i++){
            for(let j = indx;j > 1;j--){
            main_grid[i][j] = main_grid[i][j-1]
            }
        }

    }
}
function able_to_move(I,sin){
    let block_pos = I.block_positions(sin)
    let pos = block_finder_for_normal_collition()
    for(let position of block_pos){
        if(pos.includes(position) || [
            "-11", "-12", "-13", "-14", "-15", 
            "-16", "-17", "-18", "-19", "-110", 
            "-111", "-112", "-113", "-114", "-115"
          ].includes(position) || [
            "101", "102", "103", "104", "105", 
            "106", "107", "108", "109", "1010", 
            "1011", "1012", "1013", "1014", "1015"
          ].includes(position)){
            return false
        }
        
    }
    return true
}