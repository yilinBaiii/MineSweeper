//constants
var default_row_number = 5;
var default_col_number = 5;
var default_landmine_number = 5;
var path = "./icons/";
var uncovered =[];
//global variables
var landmines = [];
var number_of_mines = [];

$(document).bind("contextmenu", function(e) {
    return false;
});

//main
$(function () {
    generate_table();  
})

function set_right_click(cell){
    if(document.getElementById(cell).style.backgroundImage== 'url("' + path + 'Minesweeper_flag.png")'){
        // document.getElementById(cell).style.backgroundImage="";
        document.getElementById(cell).style.backgroundImage= 'url("' + path + 'Minesweeper_unopened_square.png")';
    }
    else{
        document.getElementById(cell).style.backgroundImage= 'url("' + path + 'Minesweeper_flag.png")';
    }
    
    
}

function generate_table() {
    landmines = [];
    number_of_mines = [];
    document.getElementById("mines_table").innerHTML = "";
    var constants = get_constant();
    var row_number = constants[0];
    var col_number = constants[1];
    var row_index = 0;
    var col_index = 0;
    for (var row_index = 0; row_index < row_number; row_index++) {
        var new_row = document.createElement("tr");

        for (var col_index = 0; col_index < col_number; col_index++) {
            var new_col = document.createElement("td");
            var new_button = document.createElement("button");

            new_col.appendChild(new_button);
            new_row.appendChild(new_col);
            new_button.style.backgroundImage = "url('" + path + "Minesweeper_unopened_square.png')";
            new_button.setAttribute("id", "btn_" + row_index + "_" + col_index);
            new_button.onclick = function () {
                change_cells_bg(this.id);
            }
            new_button.oncontextmenu=function(){
                set_right_click(this.id);
            }
        }
        document.getElementById("mines_table").appendChild(new_row);
    }
    generator_landmines();
    calculate_mines_of_cells();


}




function generator_landmines() {
    var constants = get_constant();
    var row_number = constants[0];
    var col_number = constants[1];
    var landmine_number = constants[2];

    for (var i = 0; i < row_number; i++) {
        landmines[i] = [];
        for (var j = 0; j < col_number; j++) {
            landmines[i][j] = 0;
        }
    }

    for (var k = 0; k < landmine_number; k++) {
        var landmine_x = (parseInt(Math.random() * row_number));
        var landmine_y = (parseInt(Math.random() * col_number));
        if (landmines[landmine_x][landmine_y] == 0) {
            landmines[landmine_x][landmine_y] = 1;
        } else {
            k--;
        }

    }
}



function calculate_mines_of_cells() {

    for (var i = 0; i < landmines.length; i++) {
        number_of_mines[i] = [];
        uncovered[i]=[];
        for (var j = 0; j < landmines[i].length; j++) {

            number_of_mines[i][j] = 0;
            uncovered[i][j] = 0;
        }
    }

    for (var i = 0; i < number_of_mines.length; i++) {
        for (var j = 0; j < number_of_mines[i].length; j++) {

            if (landmines[i][j] == 0) {
                
                if (typeof landmines[i - 1] != "undefined" && typeof landmines[i - 1][j - 1] != "undefined" && landmines[i - 1][j - 1] == 1) {
                    number_of_mines[i][j] += 1;
                }
                if (typeof landmines[i - 1] != "undefined" && typeof landmines[i - 1][j] != "undefined" && landmines[i - 1][j] == 1) {
                    number_of_mines[i][j] += 1;
                }
                if (typeof landmines[i - 1] != "undefined" && typeof landmines[i - 1][j + 1] != "undefined" && landmines[i - 1][j + 1] == 1) {
                    number_of_mines[i][j] += 1;
                }
                if (typeof landmines[i] != "undefined" && typeof landmines[i][j - 1] != "undefined" && landmines[i][j - 1] == 1) {
                    number_of_mines[i][j] += 1;
                }
                if (typeof landmines[i] != "undefined" && typeof landmines[i][j + 1] != "undefined" && landmines[i][j + 1] == 1) {
                    number_of_mines[i][j] += 1;
                }
                if (typeof landmines[i + 1] != "undefined" && typeof landmines[i + 1][j - 1] != "undefined" && landmines[i + 1][j - 1] == 1) {
                    number_of_mines[i][j] += 1;
                }
                if (typeof landmines[i + 1] != "undefined" && typeof landmines[i + 1][j] != "undefined" && landmines[i + 1][j] == 1) {
                    number_of_mines[i][j] += 1;
                }
                if (typeof landmines[i + 1] != "undefined" && typeof landmines[i + 1][j + 1] != "undefined" && landmines[i + 1][j + 1] == 1) {
                    number_of_mines[i][j] += 1;
                }
            }
            if (landmines[i][j] == 1) {
                number_of_mines[i][j] = "*";
            }

        }

    }

}


function uncover_all_safe_cells(cell){
    var cellID = cell.substr(4, cell.size).split("_");
    
    var row = cellID[0];
    var col = cellID[1];
    row=Number(row);
    col=Number(col);
    // var cell="btn_"+row+"_"+col;
    var row_last=row-1;
    var row_next=row+1;
    var col_last=col-1;
    var col_next=col+1;
    
    document.getElementById(cell).style.backgroundImage ="url('" + path + "Minesweeper_0.png')";
    uncovered[row][col]=1;

    if(typeof number_of_mines[row - 1] != "undefined" && typeof number_of_mines[row - 1][col - 1] != "undefined" && number_of_mines[row_last][col_last]==0  && uncovered[row_last][col_last]==0){
        uncover_all_safe_cells("btn_"+row_last+"_"+col_last);
    }
    if(typeof number_of_mines[row - 1] != "undefined" && typeof number_of_mines[row - 1][col] != "undefined" && number_of_mines[row_last][col]==0 && uncovered[row_last][col]==0){
        uncover_all_safe_cells("btn_"+row_last+"_"+col);
    }
    if(typeof number_of_mines[row - 1] != "undefined" && typeof number_of_mines[row - 1][col + 1] != "undefined" && number_of_mines[row_last][col_next]==0 && uncovered[row_last][col_next]==0){
        uncover_all_safe_cells("btn_"+row_last+"_"+col_next);
    }
    if(typeof number_of_mines[row] != "undefined" && typeof number_of_mines[row][col - 1] != "undefined" && number_of_mines[row][col_last]==0 && uncovered[row][col_last]==0){
        uncover_all_safe_cells("btn_"+row+"_"+col_last);
    }
    if(typeof number_of_mines[row] != "undefined" && typeof number_of_mines[row][col + 1] != "undefined" && number_of_mines[row][col_next]==0 && uncovered[row][col_next]==0){
        uncover_all_safe_cells("btn_"+row+"_"+col_next);
    }
    if(typeof number_of_mines[row + 1] != "undefined" && typeof number_of_mines[row + 1][col - 1] != "undefined" && number_of_mines[row_next][col_last]==0 && uncovered[row_next][col_last]==0){
        uncover_all_safe_cells("btn_"+row_next+"_"+col_last);
    }
    if(typeof number_of_mines[row + 1] != "undefined" && typeof number_of_mines[row + 1][col] != "undefined" && number_of_mines[row_next][col]==0 && uncovered[row_next][col]==0){
        uncover_all_safe_cells("btn_"+row_next+"_"+col);
    }
    if(typeof number_of_mines[row + 1] != "undefined" && typeof number_of_mines[row + 1][col + 1] != "undefined" && number_of_mines[row_next][col_next]==0 && uncovered[row_next][col_next]==0){
        uncover_all_safe_cells("btn_"+row_next+"_"+col_next);
    }
    
    
}

function change_cells_bg(cell) {

    var m = {
        0: "url('" + path + "Minesweeper_0.png')",
        1: "url('" + path + "Minesweeper_1.png')",
        2: "url('" + path + "Minesweeper_2.png')",
        3: "url('" + path + "Minesweeper_3.png')",
        4: "url('" + path + "Minesweeper_4.png')",
        5: "url('" + path + "Minesweeper_5.png')",
        6: "url('" + path + "Minesweeper_6.png')",
        7: "url('" + path + "Minesweeper_7.png')",
        8: "url('" + path + "Minesweeper_8.png')",
        "*": "url('" + path + "Minesweeper_mineSelected.png')"
    }

    var cellID = cell.substr(4, cell.size).split("_");
    var row = cellID[0];
    var col = cellID[1];
    if(number_of_mines[row][col]==0){
        uncover_all_safe_cells(cell);
    }
    else{
        
        document.getElementById(cell).style.backgroundImage = m[number_of_mines[row][col]];
        uncovered[row][col]=1;
        if(number_of_mines[row][col]=="*"){

            click_mines(cellID);
        }
        
            // alert("Game over!")
            // document.getElementById(cell).style.backgroundImage = m["*"];
 
    }
}

function click_mines(cellID){
    var row = cellID[0];
    var col = cellID[1];
    for(var i=0;i<number_of_mines.length;i++){
        for(var j=0;j<number_of_mines[i].length;j++){
            // if(i==row && j==col){}
            // else{
              
                if(number_of_mines[i][j]=="*"  && (i!=row || j!=col)){
                    document.getElementById("btn_"+i+"_"+j).style.backgroundImage = "url('" + path + "Minesweeper_mine.png')";
                }
            // }
                
               
        }
    }
    document.getElementById("game_over_box").className="visible";
}
function get_constant() {

    if (document.getElementById("input_row").value == "" || document.getElementById("input_col").value == "" || document.getElementById("input_landmine".value) == "") {
        var row_number = default_row_number;
        var col_number = default_col_number;
        var landmine_number = default_landmine_number;
    } else {
        var row_number = document.getElementById("input_row").value;
        var col_number = document.getElementById("input_col").value;
        var landmine_number = document.getElementById("input_landmine").value;
    }
    row_number = Number(row_number);
    col_number = Number(col_number);
    landmine_number = Number(landmine_number);

    return [row_number, col_number, landmine_number]
}


// generate_table()