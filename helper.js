function randomGenerateNodes(numOfNodes, nodes, positions){
    for( var i = 0; i < numOfNodes; i++ ){
        var randomNodeGeometry = new THREE.SphereGeometry( 1, 100, 100 );
        var randomNodeMaterial = new THREE.MeshPhongMaterial( {color: Math.random() * 0xffffff} );
        var randomNode = new THREE.Mesh( randomNodeGeometry, randomNodeMaterial );
        var x = Math.floor( Math.random() * 60 - 30 );
        // var y = Math.floor( Math.random() * 60 - 30 );
        var y = 0;
        var z = Math.floor( Math.random() * 60 - 30 );
        var randomNodePosition = new THREE.Vector3( x, y, z )
        randomNode.position.set( x, y, z );
        nodes.push( randomNode );
        positions.push( randomNodePosition );
    }
}

function randomGenerateEdges(numOfNodes){
    var edges;
    var ok;
    while(true){
        edges = randomGenerate(numOfNodes);
        ok = validation(numOfNodes, edges);
        // console.log(ok);
        if(ok) break;
    }

    return edges;
}

function randomGenerate(numOfNodes){
    var edges = []
    for( var i = 0; i < numOfNodes; i++ ){
        for( var j = 0; j < numOfNodes; j++){
            if(i != j){
                var r = Math.random();
                if(r > 0.8){
                    edges.push([i, j]);
                }                
            }
        }
    }
    return edges;
}

function validation(numOfNodes, edges){
    let g = new Graph(numOfNodes);
    g.build(edges);
    let root = g.getKeys()[0];
    let used = new Set();
    return dfs(root, used.add(root), g);
}

function dfs(node, used, graph){
    // console.log(node, used, graph)
    if((used.size == graph.getSize()))
        return true;
    successors = graph.getConnected(node);
    for(let successor of successors){
        // console.log(successors);
        if(!used.has(successor)){
            used.add(successor);
            var ok = dfs(successor, used, graph);
            if(ok) return true;
            used.delete(successor);
        }
    }
    return ok;
}

function addLines(edges, positions, scene){
    // console.log(edges);
    // console.log(positions);
    for(let i = 0; i < edges.length; i++){
        let start = edges[i][0];
        let end = edges[i][1];
        let lineGeometry = new THREE.Geometry();
        let lineMaterial = new THREE.LineBasicMaterial( {color: 0x000000} );
        lineGeometry.vertices.push( positions[start] );
        lineGeometry.vertices.push( positions[end] );
        var line = new THREE.Line( lineGeometry, lineMaterial );
        
        scene.add( line );
    }
}

function addNodes(nodes, scene){
    // console.log(nodes)
    let numOfNodes = nodes.length;
    for( var i = 0; i < numOfNodes; i++ ){
        scene.add(nodes[i]);
    }
}