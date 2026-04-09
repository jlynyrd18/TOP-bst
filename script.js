class Node {
    constructor() {
        this.node = node;
        this.left = left; 
        this.right = right;
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
        

        
    }
}