function mainFunction(){
    let renderer = new THREE.WebGLRenderer( {antialis: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.deceivePixelRatio );

    renderer.setClearColor( 0x888888, 1 );
    document.body.appendChild( renderer.domElement );

    let scene = new THREE.Scene();
    let aspect = window.innerWidth/window.innerHeight;
    let camera = new THREE.PerspectiveCamera( 100, aspect, 0.1, 1000 );

    let numOfNodes = 10;

    let render = function () {
        requestAnimationFrame(render);
        renderer.render( scene, camera );
    };


    camera.position.z = 30;
    camera.position.y = 30;
    scene.add(camera);
    scene.add(new THREE.AxesHelper(50));
    // scene.add( new THREE.GridHelper( 100, 25 , 0x0F0F0F, 0xFFFFFF));

    // let originalGeometry = new THREE.SphereGeometry( 1, 100, 100 );
    // let original = new THREE.Mesh( originalGeometry, new THREE.MeshPhongMaterial( {color: 0xffffff} ) );
    // scene.add( original );

    // randomly generate nodes
    // nodes: ref of node obj
    let nodes = [];
    let lines = [];
    let positions = [];
    let edges = [];
    // randomGenerateNodes(numOfNodes, nodes, positions);
    
    // // randomly generate edges
    // randomGenerateEdges(numOfNodes, lines, positions, edges);
    // //let edges = randomGenerate(nodes.length);

    // // console.log("check1");
    // // add nodes to scene
    // addNodes(nodes, scene);

    // // build add edge lines to scene
    // addLines(lines, scene);

    let ambientLight = new THREE.AmbientLight(0x888888, 0.25);
    scene.add(ambientLight);

    let pointLight = new THREE.PointLight( 0xffffff, 1 );
    pointLight.position.set( 100, 100, 100 );
    scene.add(pointLight);

    // var cx = 0, cy = 0, cz = 0;
    // for( var i = 0; i < numOfNodes; i++ ){
    //     cx += positions[i].x;
    //     cy += positions[i].y;
    //     cz += positions[i].z;
    // }


    let cameraControls = new THREE.OrbitControls( camera, renderer.doElement );
    cameraControls.addEventListener( "change", render, false );

    render();

    // let graph = new Graph(numOfNodes);

    // console.log(edges);
    // graph.build(edges)

    // bfsSearch(0, graph);

    let custom = {
        x: 0,
        y: 0,
        z: 0,
        color: 0x000000,
        add: function () {
            var customNodeGeometry = new THREE.SphereGeometry( 1, 100, 100 );
            var customNodeMaterial = new THREE.MeshPhongMaterial( {color: this.color} );
            var node = new THREE.Mesh( customNodeGeometry, customNodeMaterial );
            node.position.set( this.x, this.y, this.z );
            nodes.push( node );
            positions.push( new THREE.Vector3( this.x, this.y, this.z ) );
            scene.add( node );
            render();
        }
    }

    let random = {
        numOfNodes: 10,
        generateNodes: function () {
            clearNodes(nodes, scene);
            clearLines(lines, scene);
            randomGenerateNodes(this.numOfNodes, nodes, positions);
            addNodes(nodes, scene); 
            render();
        },
        generateEdges: function () {
            if(positions.length != 0){
                clearLines(lines, scene);
                randomGenerateEdges(nodes.length, lines, positions, edges);
                addLines(lines, scene);    
                render();
            }
        },
        clearGraph: function () {
            clearNodes(nodes, scene);
            clearLines(lines, scene);
            clearRef(nodes, lines, positions, edges)
            render();
        }
    }

    let anime = {
        run: function () {
            let graph = new Graph(nodes.length);
            graph.build(edges);
            // let logs = bfsSearch(0, graph);

            // for(let log of logs){
            //     console.log(log.type, log.note, log.item);
            // }
            bfsTest(0, graph, nodes, render());
        }
    }

    let gui = new dat.GUI();

    let randomBuildGraph = gui.addFolder( 'Build Graph' );
    let customBuildGraph = gui.addFolder( 'Custom Graph' );
    let animation = gui.addFolder( 'Animation' );

    randomBuildGraph.add( random, 'numOfNodes' ).min(1).max(30).step(1).name( 'Node Size' );
    randomBuildGraph.add( random, 'generateNodes' ).name( 'Generate Nodes' );
    randomBuildGraph.add( random, 'generateEdges' ).name( 'Generate Edges' );
    randomBuildGraph.add( random, 'clearGraph').name( 'Clear Graph' );

    customBuildGraph.addColor( custom, 'color' );
    customBuildGraph.add( custom, 'x' , -30, 30 ).name( 'X' );
    // customBuildGraph.add( customNode, 'y' , -30, 30 ).name( 'Y' );
    customBuildGraph.add( custom, 'z' , -30, 30 ).name( 'Z' );
    customBuildGraph.add( custom, 'add').name( 'Add' );

    animation.add( anime, 'run')

}