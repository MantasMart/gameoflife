let mapWidth = 20, mapHeight = 12;

let map = create2DArray(mapHeight, mapWidth);

function create2DArray(rows, columns){
    newArray = new Array(rows);

    for(let i=0; i<rows; i++){
        newArray[i] = new Array(columns).fill(0);
    }
    return newArray
}
     

$(document).ready(function(){
    render();
    $(document).on("click",".cell", function(){
    //$(".cell").click(function(){
        let row = $(this).parent().data("row");
        let column = $(this).data("column");
        //if(!running){
            if($(this).attr("class")=="cell dead"){
                (this).setAttribute("class", "cell alive");
                map[row][column] = 1;
            }else{
                (this).setAttribute("class", "cell dead");
                map[row][column] = 0;
            }
       // }
    });
    
    $("#start-button").click(function(){
            map = getNextGeneration();
            clear()
            render();
       // }
    });

    $("#reset-button").click(function(){
        map = create2DArray(mapHeight, mapWidth);
        clear();
        render();
    });

    function getNextGeneration(){

        let nextGen = create2DArray(mapHeight, mapWidth);
        let neighbourMap = create2DArray(mapHeight, mapWidth);
        for(let i=0; i<mapHeight; i++){
            for(let j=0; j<mapWidth; j++){
                if(map[i][j]==1 && countNeighbours(i,j)< 2){}
                    nextGen[i][j] = 0;

                if(map[i][j]==1 && (countNeighbours(i,j) == 2 || countNeighbours(i,j) == 3))
                    nextGen[i][j] = 1;

                if(map[i][j]==1 && countNeighbours(i,j)> 3)
                    nextGen[i][j] = 0;

                if(map[i][j]==0 && countNeighbours(i,j) == 3)
                    nextGen[i][j] = 1;

                neighbourMap[i][j] = countNeighbours(i,j);
            }
        }
        return nextGen;
    }

    function render(){
        for(let i=0; i<mapHeight; i++){

            let row = document.createElement("tr");   
            $("#grid").append(row);
            $(row).data("row", i);
            for(let j=0; j<mapWidth; j++){
                let cell = document.createElement("td");
                if(map[i][j]==0) cell.setAttribute("class", "cell dead");
                else cell.setAttribute("class", "cell alive");

                $(cell).data("column", j);
                  
                row.append(cell);
                console.log($(cell).parent().data("row")+" "+$(cell).data("column")); 
            }
       }
    }

    function clear(){
        const grid = $("#grid")[0];
        while(grid.firstChild){
            grid.firstChild.remove();
        }
    }

    function countNeighbours(row, column){
        let count = 0;

        if(row+1<mapHeight)
            count += map[row+1][column];

        if(row-1>0)
            count += map[row-1][column];

        if(column+1<mapWidth)
            count += map[row][column+1];

        if(column-1>0)
            count += map[row][column-1];

        if(row+1<mapHeight && column+1<mapWidth)
            count += map[row+1][column+1];

        if(row+1<mapHeight && column-1>0)
            count += map[row+1][column-1];

        if(row-1>0 && column+1<mapWidth)
            count += map[row-1][column+1];

        if(row-1>0 && column-1>0)
            count += map[row-1][column-1];

        return count;
    }


})
