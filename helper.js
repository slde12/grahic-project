function randomGenerateNodes(numOfNodes, nodes, positions){
    console.log(numOfNodes);
    nodes.length = 0;
    positions.length = 0;

    // fixed postion for random generator
    X = [];
    Z = [];
    for( var i = 0; i <= 20; i++){
        X.push(-30 + 3 * i);
        Z.push(-30 + 3 * i);
    }

    for( var i = 0; i < numOfNodes; i++ ){
        var randomNodeGeometry = new THREE.SphereGeometry( 1, 100, 100 );
        var randomNodeMaterial = new THREE.MeshPhongMaterial( {color: Math.random() * 0xffffff} );
        var randomNode = new THREE.Mesh( randomNodeGeometry, randomNodeMaterial );
        var x = X[Math.floor( Math.random() * 20)];
        // var y = Math.floor( Math.random() * 60 - 30 );
        var y = 0;
        var z = Z[Math.floor( Math.random() * 20)];
        var randomNodePosition = new THREE.Vector3( x, y, z )
        randomNode.position.set( x, y, z );
        nodes.push( randomNode );
        positions.push( randomNodePosition );
    }
}

function randomGenerateEdges(numOfNodes, lines, positions, edges){
    lines.length = 0;
    edges.length = 0;

    // generate a fully connected graph
    var ok;
    while(true){
        randomGenerate(numOfNodes, edges);
        
        ok = validation(numOfNodes, edges);
        // console.log(ok);
        if(ok) break;
    }


    for(let i = 0; i < edges.length; i++){
        let start = edges[i][0];
        let end = edges[i][1];
        let lineGeometry = new THREE.Geometry();
        let lineMaterial = new THREE.LineBasicMaterial( {color: 0x000000} );
        lineGeometry.vertices.push( positions[start] );
        lineGeometry.vertices.push( positions[end] );
        var line = new THREE.Line( lineGeometry, lineMaterial );
        lines.push(line);
    }
}

function randomGenerate(numOfNodes, edges){
    edges.length = 0;
    for( var i = 0; i < numOfNodes; i++ ){
        for( var j = 0; j < numOfNodes; j++){
            if(i != j){
                var r = Math.random();
                if(r > 0.9){
                    edges.push([i, j]);
                }                
            }
        }
    }
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

function addLines(lines, scene){
    // console.log(edges);
    // console.log(positions);
    let numOfLines = lines.length
    for(let i = 0; i < numOfLines; i++){
        scene.add( lines[i] );
    }
}

function addNodes(nodes, scene){
    // console.log(nodes)
    let numOfNodes = nodes.length;
    for( var i = 0; i < numOfNodes; i++ ){
        scene.add(nodes[i]);
    }
}

function clearNodes(nodes, scene){
    for(let node of nodes){
        scene.remove(node);
    }
}

function clearLines(lines, scene){
    for(let line of lines){
        scene.remove(line);
    }
}

function clearRef(nodes, lines, positions, edges){
    nodes.length = 0;
    lines.length = 0;
    positions.length = 0;
    edges.length = 0;
}
