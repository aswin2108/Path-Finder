import React, {useState,useEffect} from "react";

import Node from "../Node/node";

import "./pathFind.css";

const columns=5;
const rows=5

const PathFind=()=>{
    const[Grid,setGrid]=useState([]);
    useEffect(()=>{
        initializeGrid();
    },[]);

//creates grid
    const initializeGrid=()=>{
        const grid=new Array(columns);
        for(let i=0;i<columns;i++){
            grid[i]=new Array(rows);
        }
        createSpot(grid);
        setGrid(grid);
    };
    //creates spot
    const createSpot=(grid)=>{
        for(let i=0;i<columns;i++){
            for(let j=0;j<rows;j++){
                grid[i][j]=new Spot(i,j);
            }
        }
    };

    //Spot Constructor
    function Spot(i,j){
        this.x=i;
        this.y=j;
        this.p=0;
        this.q=0;
        this.r=0;
    }
    
    const gridWithNode=(
        <div>
          {Grid.map((row,rowIndex)=>{
            return(
                <div key={rowIndex} className="rowWrapper">
                {row.map((col,colIndex)=>{
                    return(
                        <Node key={colIndex}/>
                    )
                })}
                </div>
            );
          })}
        </div>
    ); 
    return(
    <div className="wrapper">
     <h1 className="header">PathFind component</h1>
     {gridWithNode}
    </div>
    );
}
export default PathFind;