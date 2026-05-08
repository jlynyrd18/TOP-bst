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

    levelOrderForEach(callback) {
        if(this.root === null) return;
        let arr = [];

        arr.push(this.root);

        while(arr.length !== 0){
            let node = arr.shift();
            callback(node.data);
            if(node.left) {
                arr.push(node.left);
            }
            if(node.right) {
                arr.push(node.right);
            }
        }
    }

    //inorder is left, root, right; preoder is root, left, right; postorder is left, right, root
    inOrderForEach(callback) {
        if(!callback){ 
            throw new Error;
        }
        const traverse = (root) => {
            if(root === null) return;
            traverse(root.left);
            callback(root.data);
            traverse(root.right);
        }
        traverse(this.root);
    }

    preOrderForEach(callback) {
        if(!callback){
            throw new Error;
        }
        const traverse = (root) => {
            if(root === null) return;
            callback(root.data);
            traverse(root.left);
            traverse(root.right);
        }
        traverse(this.root);
    }

    postOrderForEach(callback) {
        if(!callback) {
            throw new Error;
        }
        const traverse = (root) => {
            if(root === null) return;
            traverse(root.left);
            traverse(root.right);
            callback(root.data);
        }
        traverse(this.root);
    }

    height(value) {
        const path = (root) => {
            if(root === null) return -1;
            let left = path(root.left);
            let right = path(root.right);
            if(left > right){
                left++;
                return left;
            }else{
                right++;
                return right;
            }
        }

        const traverse = (value,root) => {
            if(root === null) return undefined;
            if(value > root.data) {
                return traverse(value, root.right);
            }
            if(value < root.data) {
                return traverse(value, root.left);
            }
            if(value === root.data) {
                //call function to find longest path to leaf
                return path(root);
            }
        }
        return traverse(value, this.root);
    }

    depth(value) {
        const traverse = (value, root, depth) => {
            if(root === null) return undefined;
            if(value > root.data) {
                return traverse(value, root.right, depth +1);
            }
            if(value < root.data) {
                return traverse(value, root.left, depth + 1);
            }
            if(value === root.data) {
                return depth;
            }
        }
        return traverse(value, this.root);
    }

    isBalanced() {
        const traverse = (root) => {
            if(root === null) return 0;

            let left = traverse(root.left);
            if(left === -1) return -1;

            let right = traverse(root.right);
            if(right === -1) return -1;

            if(Math.abs(left - right) > 1) return -1;

            return 1 + Math.max(left, right);

        }
        return traverse(this.root) !== -1;
    }

    rebalance() {
        let arr = [];
        const inOrderArr = (root) => {
            if(root === null) return;
            inOrderArr(root.left);
            arr.push(root.data);
            inOrderArr(root.right);
        }
        inOrderArr(this.root); 
        let newRoot = this.buildTree(arr);
        this.root = newRoot;
        return this.root;
    }
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9]);

//console.log(test.isBalanced());
//console.log(test.preOrderForEach(value => console.log(value)));
//console.log(test.postOrderForEach(value => console.log(value)));
//console.log(test.inOrderForEach(value => console.log(value)));
console.log(test.insert([100]));
console.log(test.insert([101]));
console.log(test.insert([102]));
console.log(test.insert([103]));
console.log(test.insert([104]));
console.log(test.isBalanced());
console.log(test.rebalance());
console.log(test.isBalanced());
console.log(test.preOrderForEach(value => console.log(value)));
console.log(test.postOrderForEach(value => console.log(value)));
console.log(test.inOrderForEach(value => console.log(value)));