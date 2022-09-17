import React, {useState,useEffect} from "react";

import Astar from "../../Algorithm/astarAlgorithm/astarAlgorithm";
import Node from "../Node/node";

import "./pathFind.css";

const columns=50;
const rows=22;

const NODE_START_ROW=10;
const NODE_START_COLUMN=5;
const NODE_END_ROW=10;
const NODE_END_COLUMMN=44;

const PathFind=()=>{
    const[Grid,setGrid]=useState([]);
    useEffect(()=>{
        initializeGrid();
    },[]);

//creates grid
    const initializeGrid=()=>{
        const grid=new Array(rows);
        for(let i=0;i<rows;i++){
            grid[i]=new Array(columns);
        }
        createSpot(grid);
        setGrid(grid);
        addNeighbours(grid); 

        const startNode=grid[NODE_START_ROW][NODE_START_COLUMN]
        const endNode=grid[NODE_END_ROW][NODE_END_COLUMMN]
        Astar(startNode,endNode);
    };
    //creates spot
    const createSpot=(grid)=>{
        for(let i=0;i<rows;i++){
            for(let j=0;j<columns;j++){
                grid[i][j]=new Spot(i,j);
            }
        }
    };

    //Add neighbours
    const addNeighbours=(grid)=>{
        for(let i=0;i<rows;i++){
            for(let j=0;j<columns;j++){
                grid[i][j].addneighbours(grid);
            }
        }
    };

    //Spot Constructor
    function Spot(i,j){
        this.x=i;
        this.y=j;
        this.isStart=this.x===NODE_START_ROW && this.y===NODE_START_COLUMN;
        this.isEnd=this.x===NODE_END_ROW && this.y===NODE_END_COLUMMN
        this.g=0;
        this.f=0;
        this.h=0;
        //Neighbouring boints of that spot
        this.neighbours=[];
        //Used to recreate the path. The optimum points are stored here
        this.previous=undefined;

        this.addneighbours=function(grid){
            i=this.x;
            j=this.y;
            //Adding neighbour into the array
            if(i>0) this.neighbours.push(grid[i-1][j]); 
            //Horizontal neighbours which are one step away from current spot
            if(i<rows-1 ) this.neighbours.push(grid[i+1][j])
            //vertical
            if(j>0) this.neighbours.push(grid[i][j-1]);
            if(j<columns-1) this.neighbours.push(grid[i][j+1]);
        };
    }
    
    const gridWithNode=(
        <div>
          {Grid.map((row,rowIndex)=>{
            return(
                <div key={rowIndex} className="rowWrapper">
                {row.map((columns,colIndex)=>{
                    const{isStart,isEnd}=columns
                    return(
                        <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex}/>
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