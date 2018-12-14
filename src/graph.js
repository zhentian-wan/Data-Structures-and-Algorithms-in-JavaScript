

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

/**
 * Breadth First Search
 */
function bfs () {
}

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