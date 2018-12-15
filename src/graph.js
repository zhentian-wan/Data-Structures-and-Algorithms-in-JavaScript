const {createQueue} = require('./queue');

function createNode(key) {
    let children = [];
    return {
        key,
        children,
        addChild(child) {
            children.push(child)
        }
    }
}

function createGraph(directed = false) {
    const nodes = [];
    const edges = [];

    return {
        nodes,
        edges,
        directed,

        addNode(key) {
            nodes.push(createNode(key))
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

  graph2.bfs('a', node => {
    console.log(node.key)
  })