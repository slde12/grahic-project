class Graph{
    constructor(numOfNodes){
        this.data = new buckets.Dictionary()
        for(let i = 0; i < numOfNodes; i++){
            this.data.set(i, new Set());
        }
    }
    
    build(edges){
        for(let i = 0; i < edges.length; i++){
            let e1 = edges[i][0];
            let e2 = edges[i][1];
            this.addEdge(e1, e2);
        }
    }

    addEdge(node1, node2){
        this.data.set(node1, this.data.get(node1).add(node2));            
        this.data.set(node2, this.data.get(node2).add(node1));
    }

    getSize(){
        return this.data.size();
    }

    // return a connected edge array
    getConnected(node){
        return this.data.get(node).values();
    }

    getKeys(){
        return this.data.keys();
    }
}

function bfsSearch(start, graph){
    // create a log file
    let expanded = new Set();
    var queue = new buckets.Queue();
    
    console.log("Initialize an empty expanded nodes set and queue");
    
    queue.enqueue(start);
    
    console.log("push start node to the end of queue");
    
    while(!isEmpty(queue)){
        
        console.log("queue is not empty");
        console.log(queue.toArray());

        console.log("pop the first node of queue", queue.peek());
        var current = queue.dequeue();

        if(expanded.has(current))
            continue;
        // do something here
        console.log("expand this node")
        successors = findSuccessors(current, graph);

        console.log("for each connected node")
        for(let successor of successors){

            if(!contains(expanded, successor)){
                console.log(successor, "hasn't been expanded");
                queue.enqueue(successor);
            }else{
                console.log(successor, "has been expanded");
            }
        }

        console.log("Tada!!! Add current node ", current, " into expanded nodes set");
        expanded.add(current);
    }

    console.log("queue is empty, bfs finished");
    // return a log fire
}

function findSuccessors(node, graph){
    console.log("find the nodes connected to the current node");
    successors = graph.getConnected(node);
    console.log("node connected", successors);
    return successors;
}

function isEmpty(queue){
    console.log("Check queue is empty or not");
    return queue.isEmpty();
}

function contains(expanded, successor){
    console.log("Is the node expanded or not?");
    return expanded.has(successor)
}