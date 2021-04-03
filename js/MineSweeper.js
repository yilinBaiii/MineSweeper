default_row_number=5;
default_col_number=5;
default_landmine_number=5;
var cell="";
$(function(){
    generate_table();
})

var tableInfo = Array.prototype.map.call(document.querySelectorAll('#tableId tr'),function(tr){
    return Array.prototype.map.call(tr.querySelectorAll('td'), function(td){
      return td.innerHTML;
      });
    });



// function gennerator_landmines(){
//     for(var i=0;i<landmine_number;i++){
//         var landmine_x=Math.random()*landmine_number;
//         var landmine_y=Math.random()*landmine_number;
//         if( landmines.includes([landmine_x,landmine_y])==false){
//             landmines[landmines.length]=[landmine_x,landmine_y]
//         }else{
//             i--;
//         }
//     }  
//     document.getElementById()

// }
var landmines=[];
// var landmines_position=[];

function generator_landmines(){
    var constants = get_constant();
    var row_number = constants[0];
    var col_number = constants[1];
    var landmine_number = constants[2];

    for(var i=0;i<row_number;i++){
        landmines[i]=[];
        for(var j=0;j<col_number;j++){

            landmines[i][j]=0;
        }
    }

    for(var k=0;k<landmine_number;k++){
        var landmine_x=(parseInt(Math.random()*row_number));
        var landmine_y=(parseInt(Math.random()*col_number));
        if(landmines[landmine_x][landmine_y]==0){
            // landmines_position[landmines_position.length]=[landmine_x,landmine_y];
            landmines[landmine_x][landmine_y]=1;
        }
        else{
            k--;
        }    
    }
}

var number_of_mines=[];

function calculate_mines_of_cells(){
    
    for(var i=0;i<landmines.length;i++){
        number_of_mines[i]=[];
        for(var j=0;j<landmines[i].length;j++){
    
            number_of_mines[i][j]=0;
        }
    }

    // var number_in_each_cell=0;
    for(var i=0;i<number_of_mines.length;i++)
        {for(var j =0;j <number_of_mines[i].length;j++){

            if(landmines[i][j]==0){
                // number_of_mines[i][j]
                if(typeof landmines[i-1]!="undefined" && typeof landmines[i-1][j-1]!="undefined"  && landmines[i-1][j-1]==1){
                    number_of_mines[i][j]+=1;
                }
                if(typeof landmines[i-1]!="undefined" && typeof landmines[i-1][j]!="undefined" && landmines[i-1][j]==1){
                    number_of_mines[i][j]+=1;
                }
                if(typeof landmines[i-1]!="undefined" && typeof landmines[i-1][j+1]!="undefined" && landmines[i-1][j+1]==1){
                    number_of_mines[i][j]+=1;
                }
                if(typeof landmines[i]!="undefined" && typeof landmines[i][j-1]!="undefined" && landmines[i][j-1]==1){
                    number_of_mines[i][j]+=1;
                }
                if(typeof landmines[i]!="undefined" && typeof landmines[i][j+1]!="undefined" && landmines[i][j+1]==1){
                    number_of_mines[i][j]+=1;
                }
                if(typeof landmines[i+1]!="undefined" && typeof landmines[i+1][j-1]!="undefined" && landmines[i+1][j-1]==1){
                    number_of_mines[i][j]+=1;
                }
                if(typeof landmines[i+1]!="undefined" && typeof landmines[i+1][j]!="undefined" && landmines[i+1][j]==1){
                    number_of_mines[i][j]+=1;
                }
                if(typeof landmines[i+1]!="undefined" && typeof landmines[i+1][j+1]!="undefined" && landmines[i+1][j+1]==1){
                    number_of_mines[i][j]+=1;
                }
            }
            if(landmines[i][j]==1){
                number_of_mines[i][j]="*";
            }
               
        }

    }

}


function uncover_cells(){
    generator_landmines();
    calculate_mines_of_cells();
    // for(var i=0;i<number_of_mines.length;i++){
    //     for(var j=0;j<number_of_mines[i].length;j++){
    //         cell="btn_"+i+"_"+j;
    //         document.getElementById(cell).onclick=cell_id(cell);
    //     }
    // }

    // document.getElementById().addEventListener("click",set_cells_bg);
}



function change_cells_bg(cell){
    
    for(var i=0;i<number_of_mines.length;i++){
        for(var j=0;j<number_of_mines[i].length;j++){

            if( number_of_mines[i][j]==0){
                
                cell.backgroundImage="url('Minesweeper_0.png')";
                break;
            }
            if(number_of_mines[i][j]==1){
                cell.backgroundImage="url('Minesweeper_1.png')";
                break;
            }
            if(number_of_mines[i][j]==2){
                cell.backgroundImage="url('Minesweeper_2.png')";
                break;
            }
            if(number_of_mines[i][j]==3){
                cell.backgroundImage="url('Minesweeper_3.png')";
                break;
            }
            if(number_of_mines[i][j]==4){
                cell.backgroundImage="url('Minesweeper_4.png')";
                break;
            }
            if(number_of_mines[i][j]==5){
                cell.backgroundImage="url('Minesweeper_5.png')";
                break;
            }
            if(number_of_mines[i][j]==6){
                cell.backgroundImage="url('Minesweeper_6.png')";
                break;
            }
            if(number_of_mines[i][j]==7){
                cell.backgroundImage="url('Minesweeper_7.png')";
                break;
            }
            if(number_of_mines[i][j]==8){
                cell.backgroundImage="url('Minesweeper_8.png')";
                break;
            }
            if(number_of_mines[i][j]=="*"){
                cell.backgroundImage="url('Minesweeper_mineSelected.png')";
                break;
            }
        }
    }
    
}
function get_constant(){

    // var row_number =.value;
    // var col_number = .value;
    // var landmine_number = ).value;

    if (document.getElementById("input_row").value == "" || document.getElementById("input_col").value == "" || document.getElementById("input_landmine".value) == "" ){
        var row_number = default_row_number;
        var col_number = default_col_number;
        var landmine_number = default_landmine_number;
    }
    else{
        var row_number =document.getElementById("input_row").value;
        var col_number = document.getElementById("input_col").value;
        var landmine_number = document.getElementById("input_landmine").value;
    }
    row_number=Number(row_number);
    col_number=Number(col_number);
    landmine_number=Number(landmine_number);

    return [row_number,col_number,landmine_number]
}

function generate_table() {
    document.getElementById("mines_table").innerHTML="";
    var constants = get_constant();
    var row_number = constants[0];
    var col_number = constants[1];
    var landmine_number = constants[2];
    var row_index=0;
    var col_index=0;
    for (var row_index = 0; row_index < row_number; row_index++) {
        var new_row = document.createElement("tr");

        for (var col_index = 0; col_index < col_number; col_index++) {
            var new_col = document.createElement("td");
            var new_button=document.createElement("button");
            
            new_col.appendChild(new_button);
            new_row.appendChild(new_col);    
            new_button.setAttribute("id","btn_"+row_index+"_"+col_index);
            // new_button.addEventListener("click",alert("hello"));
            // console.log()
            // new_button.onclick=alert("hello");
            new_button.onclick=change_cells_bg(this);

           
        }
        
        // $("#mines_table").appendChild(new_row);
        document.getElementById("mines_table").appendChild(new_row);

    }



}

// generate_table()