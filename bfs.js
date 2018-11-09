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

    // return a iterator
    getConnected(node){
        return this.data.get(node).values();
    }

    getKeys(){
        return this.data.keys();
    }
}

function bfsSearch(start, graph){
    // create a log file
    let logs = [];
    let expanded = new Set();
    let queue = new buckets.Queue();
    
    logs.push({type:0, note:"Initialize an empty expanded nodes set and an empty queue"});
    
    queue.enqueue(start);
    
    logs.push({type:1, note:"Push start node to the end of queue", item:start});
    
    logs.push({type:2, note:"Is the queue empty or not?", item:queue.toArray()});
    while(!isEmpty(queue)){
        logs.push({type:3, note:"Queue is not empty"});

        logs.push({type:4, note:"Pop the first node of queue as current node", item:queue.peek()});
        var current = queue.dequeue();

        logs.push({type:5, note:"Has current node been expanded or not?"});
        if(expanded.has(current)){
            logs.push({type:6, note:"Current node has been expanded, continue"});
            continue;
        }
        logs.push({type:6, note:"Current node hasn't been expanded"})

        successors = findSuccessors(current, graph);
        logs.push({type:7, note:"Expand current node, find the nodes directly connect to current node", item:successors});

        logs.push({type:8, note:"for each connected node", item:successors});
        for(let successor of successors){
            logs.push({type:9, note:"Has successor been expanded or not", item:successor});
            if(!contains(expanded, successor)){
                queue.enqueue(successor);
                logs.push({type:10, note:"Successor hasn't been expanded, push it to the queue, check next successor", item:queue.toArray()});
            }else{
                logs.push({type:11, note:"Successor has been expanded, check next successor"});
            }
        }

        expanded.add(current);
        logs.push({type:12, note:"No more successors, add current node to expanded set", item:[...expanded]});
        logs.push({type:2, note:"Is the queue empty or not?", item:queue});
    }

    logs.push({type:13, note:"Queue is empty, bfs is finished"});
    // return a log fire
    return logs;
}


function bfsTest(start, graph, nodes, render){
    for(let node of nodes){
        node.material.color.setHex(0xffffff);
    }

    let expanded = new Set();
    let queue = new buckets.Queue();
    sleep(1000);
    console.log("initialzie an empty expanded set and an empty queue");
    //draw a queue and a set on screen
    sleep(1000);
    queue.enqueue(start);
    console.log("Add start node ioto the queue");
    nodes[start].material.color.setHex(0x808080);
    //update the queue
    sleep(1000);
    console.log("Start loop:");
    sleep(1000);
    console.log("Is the queue empty?");
    //highlight the queue
    while(!isEmpty(queue)){
        sleep(1000);
        console.log("Queue is not empty");
        var current = queue.dequeue();
        nodes[current].material.color.setHex(0xff0000);
        render;
        console.log("Pop the first node of queue as current node", current);
        sleep(1000);
        console.log("Is current node expanded?");
        if(expanded.has(current)){
            // go through expanded set and compare with current node, stop at the matching node.
            console.log("Yes, it is expanded, next loop");
            nodes[current].material.color.setHex(0x000000);
            continue;
        }
        sleep(1000);
        console.log("No, it isn't expanded");
        sleep(1000);

        console.log("Find all the nodes connected directly to the current node");
        successors = findSuccessors(current, graph);
        // highlight every successor node
        sleep(1000);

        console.log("For each of successors");
        for(let successor of successors){
            sleep(1000);

            console.log("Is this successor expanded?");
            if(!contains(expanded, successor)){
                nodes[successor].material.color.setHex(0x808080);
                // go through expanded set and compare with successor node, stop at the matching node.
                sleep(1000);
                console.log("No, it is not expanded");
                queue.enqueue(successor);
                console.log("Add successor into the queue", successor);
                // update and highlight the queue,
                sleep(1000);
            }else{
                console.log("Yes, it is expanded");
                sleep(1000);
            }
            console.log("Go to next successor");
        }

        sleep(1000);

        console.log("Add current node into the expanded set");
        //update expanded set;
        expanded.add(current);
        nodes[current].material.color.setHex(0x000000);
        sleep(1000);
        console.log("Is the queue empty?");
    }
    console.log("BFS Finished");
}

function findSuccessors(node, graph){
    return graph.getConnected(node);
}

function isEmpty(queue){
    return queue.isEmpty();
}

function contains(expanded, successor){
    return expanded.has(successor)
}

function sleep(time){
    for(let i = 0; i < time*time*time; i++){

    }
}