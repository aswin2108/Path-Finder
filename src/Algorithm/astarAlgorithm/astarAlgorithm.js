function Astar(startNode,endNode){
    let openSet=[];
    let closedSet=[];
    let resultingPath=[];
    let visitedNodes=[];

    openSet.push(startNode);
    while(openSet.length>0){
        //Here we have to get the lowest F-Score index
        let leastIndex=0;
        for(let i=0;i<openSet.length;i++){
            if(openSet[i].f<openSet[leastIndex].f){
                leastIndex=i;
            }
        }
        let current=openSet[leastIndex];
        visitedNodes.push(current);
        //Constructing our final resulting solution
        if(current===endNode){
            let temp=current;
            resultingPath.push(temp);
            while(temp.previous){
                resultingPath.push(temp.previous);
                temp=temp.previous;
            }
            return {resultingPath, visitedNodes};
        }
        openSet=openSet.filter(element => element!== current);
        closedSet.push(current);

        let neighbours=current.neighbours;
        for(let i=0;i<neighbours.length;i++){
            let neighbour=neighbours[i];
            if(!closedSet.includes(neighbour) && !neighbour.isWall){
                let tempG=current.g+1;
                let newPath=false;
                if(openSet.includes(neighbour)){
                    if(tempG<neighbour.g){
                        neighbour.g = tempG;
                        newPath=true; 
                    }
                }else{
                    neighbour.g=tempG;
                    newPath=true;
                    openSet.push(neighbour);
                }
                if(newPath){
                    neighbour.h=heruistic(neighbour,endNode);
                    neighbour.f=neighbour.g+neighbour.f;
                    neighbour.previous=current;
                }
            }
        }
    }
    return{resultingPath, visitedNodes, error:"No path found"};
}
function heruistic(a,b){
    let d=Math.abs(a.x-a.y)+Math.abs(b.x-b.y);
    return d;
}
export default Astar;