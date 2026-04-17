class Node {
    constructor(value) {
        this.data = value;
        this.left = null; 
        this.right = null;
    }
}

class Tree {
    constructor (array) {
        array = this.cleanedArray(array);
        this.root = this.buildTree(array);
    }

    cleanedArray(array) {
        array = array.sort((a, b) => a - b);
        for(let i = 0; i < array.length; i++) {
            if(array[i] === array[i+1]){
                array.splice(i, 1);
                i--;
            }
        }
        return array;
    }

    buildTree(array) {
        let n = array.length;
        if(n === 0) return null;

        let mid = Math.floor(n / 2);
        let root = new Node(array[mid]);

        let left = array.slice(0, mid);
        let right = array.slice(mid + 1);

        root.left = this.buildTree(left);
        root.right = this.buildTree(right);

        return root;
    }

    insert(value) {
        let root = this.root;

        while(root !== null) {
            if (value === root.data) {
                return;
            }
            else if(value < root.data) {
                if(root.left === null) {
                    root.left = new Node(value);
                    return;
                }else{
                    root = root.left;
                }
            }
            else if(value > root.data) {
                if(root.right === null) {
                    root.right = new Node(value);
                    return;
                }else{
                    root = root.right;
                }
            }
        }
        if(this.root === null) {
            this.root = new Node(value);
            return;
        }
    }

    deleteItem(value) {
        const deleteNode = (node, value) => {
            if(node === null) return null;

            if(value < node.data) {
                node.left = deleteNode(node.left, value);
                return node;
            }

            if (value > node.data) {
                node.right = deleteNode(node.right, value);
                return node;
            }

            if(value === node.data) {
                if(!node.left && !node.right) return null;

                if(!node.left){
                    return node.right;
                }

                if(!node.right) {
                    return node.left;
                }

                if(node.right && node.left) {
                    let newHead = node.right;
                    while(newHead.left !== null){
                        newHead = newHead.left;
                    }
                    node.data = newHead.data;
                    node.right = deleteNode(node.right, newHead.data);
                    return node;
                }
            }
        }
        this.root = deleteNode(this.root, value);
    }
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9]);

console.log(test.root);
console.log(test.root.data);
console.log(test.root.left.data);
console.log(test.root.right.data);