let bucket = require('buckets-js');

class Graph{
    constructor(){
        this.data = new bucket.Dictionary()
    }
    
    addEdge(node1, node2){
        if(!this.data.contains(node1)){
            this.data.set(node1, new bucket.Set())
        }
        if(!this.data.contains(node2)){
            this.data.set(node2, new bucket.Set())
        }
        this.data.set(node1, this.data.get(node1).add(node2))
        this.data.set(node2, this.data.get(node2).add(node1))
    }

    // return a connected edge array
    getConnected(node){
        return this.data.get(node).toArray()
    }
}


