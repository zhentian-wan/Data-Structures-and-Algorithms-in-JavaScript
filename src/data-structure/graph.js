const {createQueue} = require('./queue');

function createNode(key, rest) {
    let children = [];
    return {
        key,
        children,
        ...rest,
        addChild(child) {
            children.push(child)
        }
    }
}

function createVistedMap (nodes) {
    return nodes.reduce((acc, curr) => {
        acc[curr.key] = false;
        return acc;
    }, {});
}

function createGraph(directed = false) {
    const nodes = [];
    const edges = [];

    return {
        nodes,
        edges,
        directed,

        addNode(key, rest) {
            nodes.push(createNode(key, rest))
        },

        getNode (key) {
            return nodes.find(n => n.key === key)
        },

        addEdge (node1Key, node2Key) {
            const node1 = this.getNode(node1Key);
            const node2 = this.getNode(node2Key);

            node1.addChild(node2);

            if (!directed) {
                node2.addChild(node1);
            }

            edges.push(`${node1Key}${node2Key}`)
        },

        print() {
            return nodes.map(({children, key}) => {
                let result = `${key}`;

                if (children.length) {
                    result += ` => ${children.map(n => n.key).join(' ')}`
                }

                return result;
            }).join('\n')
        },
        /**
         * Breadth First Search
         */
        bfs (startNodeKey = "", visitFn = () => {}) {
            /**
             * Keytake away:
             * 1. Using Queue to get next visit node
             * 2. Enqueue the node's children for next run
             * 3. Hashed visited map for keep tracking visited node
             */
            const startNode =  this.getNode(startNodeKey);
           // create a hashed map to check whether one node has been visited
           const visited = this.nodes.reduce((acc, curr) => {
               acc[curr.key] = false;
               return acc;
           }, {});  
        
           // Create a queue to put all the nodes to be visited
           const queue = createQueue();
           queue.enqueue(startNode);
        
           // start process
           while (!queue.isEmpty()) {
              const current = queue.dequeue();
        
              // check wheather the node exists in hashed map
              if (!visited[current.key]) {
                  visitFn(current);
                  visited[current.key] = true;
        
                  // process the node's children
                  current.children.map(n => {
                    if (!visited[n.key]) {
                        queue.enqueue(n);
                    }
                  });
              }
           }
        },

        bfs2 (startNodeKey, predFn = () => {}, cb = () => {}) {
            const startNode = this.getNode(startNodeKey);
            const visited = createVistedMap(this.nodes);
            const queue = createQueue();
            startNode.children.forEach((n) => {
                queue.enqueue(n);
            });
            while (!queue.isEmpty()) {
                const current = queue.dequeue();
                if (!visited[current.key]) {
                    if (predFn(current)) return cb(current);
                    else {
                        visited[current.key] = true;
                    }
                }
            }
            cb(null)
        },

        /**
         * Depth First Search
         */
        dfs (startNodeKey = "", visitFn = () => {}) {
            // get starting node
            const startNode = this.getNode(startNodeKey);
            // create hashed map
            const visited = this.nodes.reduce((acc, curr) => {
                acc[curr] = false;
                return acc;
            }, {});
            function explore(node) {
                // if already visited node, return
                if (visited[node.key]) {
                    return;
                }
                // otherwise call the callback function
                visitFn(node);
                // Set nodekey to be visited
                visited[node.key] = true;
                // Continue to explore its children
                node.children.forEach(n => {
                    explore(n);
                });
            }
            // start exploring
            explore(startNode);
        }
    }
}

const graph = createGraph(true)

graph.addNode('Kyle')
graph.addNode('Anna')
graph.addNode('Krios')
graph.addNode('Tali')

graph.addEdge('Kyle', 'Anna')
graph.addEdge('Anna', 'Kyle')
graph.addEdge('Kyle', 'Krios')
graph.addEdge('Kyle', 'Tali')
graph.addEdge('Anna', 'Krios')
graph.addEdge('Anna', 'Tali')
graph.addEdge('Krios', 'Anna')
graph.addEdge('Tali', 'Kyle')

console.log(graph.print())



const nodes = ['a', 'b', 'c', 'd', 'e', 'f']
const edges = [
  ['a', 'b'],
  ['a', 'e'],
  ['a', 'f'],
  ['b', 'd'],
  ['b', 'e'],
  ['c', 'b'],
  ['d', 'c'],
  ['d', 'e']
]

const graph2 = createGraph(true)
nodes.forEach(node => {
    graph2.addNode(node)
  })
  
  edges.forEach(nodes => {
    graph2.addEdge(...nodes)
  })

  console.log('***Breadth first graph***')
  graph2.bfs('a', node => {
    console.log(node.key)
  })

  console.log('***Depth first graph***')
  graph2.dfs('a', node => {
    console.log(node.key)
  })

let graph3 = createGraph(true)
const tyler = {key: 'tyler', dog: false};
const henry = {key: 'henry', dog: false};
const john = {key: 'john', dog: false};
const aimee = {key: 'aimee', dog: true};
const peggy = {key: 'peggy', dog: false};
const keli = {key: 'keli', dog: false};
const claire = {key: 'claire', dog: false};

graph3.addNode('tyler', tyler);
graph3.addNode('henry', henry);
graph3.addNode('john', john);
graph3.addNode('claire', claire);
graph3.addNode('aimee', aimee);
graph3.addNode('peggy', peggy)
graph3.addNode('keli', keli);

graph3.addEdge('tyler', 'henry')
graph3.addEdge('tyler', 'john')
graph3.addEdge('tyler', 'aimee')
graph3.addEdge('henry', 'keli')
graph3.addEdge('henry', 'peggy')
graph3.addEdge('john', 'john')
graph3.addEdge('keli', 'claire')


graph3.bfs2('tyler', (node) => {
    return node.dog;
}, (node) => {
    if (node) console.log(`${node.key} has a dog`)
    else console.log('Tyler friends has no dog')
})