function crateNode (key) {
    let children = [];
    return {
        key,
        children,
        addChild (cKey) {
            const childNode = crateNode(cKey)
            this.children.push(childNode)
            return childNode;
        }
    }
}

function createTree (rootKey) {
    const root = crateNode(rootKey);

    function print () {
        let result = '';

        function traverse (node, visitFn, depth) {
            visitFn(node, depth);

            if (node.children.length) {
                node.children.forEach(n => traverse(n, visitFn, depth + 1))
            }
        }

        function addKeyToResult(node, depth) {
            result +=
              result.length === 0
                ? node.key
                : `\n${' '.repeat(depth * 2)}${node.key}`
        }

        traverse(root, addKeyToResult, 0)

        return result;
    }
    return {
        root,
        print
    }
}

const dom = createTree('html')
const head = dom.root.addChild('head')
const body = dom.root.addChild('body')
const title = head.addChild('title - egghead Tree Lesson')
const header = body.addChild('header')
const main = body.addChild('main')
const footer = body.addChild('footer')
const h1 = header.addChild('h1 - Tree Lesson')
const p = main.addChild('p - Learn about trees!')
const copyright = footer.addChild(`Copyright ${new Date().getFullYear()}`)

console.log(dom.print())