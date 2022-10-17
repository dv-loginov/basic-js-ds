const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.head = null;
  }

  root() {
    return this.head;
  }

  add(data) {
    const newNode = new Node(data);
    (this.head === null)
      ? this.head = newNode
      : this.addNode(this.head, newNode);
  }

  addNode(node, newNode) {
    if (newNode.data < node.data) {
      (node.left === null)
        ? node.left = newNode
        : this.addNode(node.left, newNode);
    } else {
      (node.right === null)
        ? node.right = newNode
        : this.addNode(node.right, newNode);
    }
  }

  has(data, node = this.head) {
    if (node === null) return false;

    if (node.data === data) return true;
    return data > node.data
      ? this.has(data, node.right)
      : this.has(data, node.left);
  }

  find(data, node = this.head) {
    if (node === null) return null;

    if (data < node.data) { return this.find(data, node.left) };
    if (data > node.data) { return this.find(data, node.right) };
    return node;
  }

  remove(data, node = this.head) {
    if (node === null) return null;

    if (data < node.data) {
      node.left = this.remove(data, node.left);
      return node;
    }

    if (data > node.data) {
      node.right = this.remove(data, node.right);
      return node;
    }

    if (node.right === null && node.left === null) {
      node = null;
      return node;
    }

    if (node.left === null) {
      node = node.right;
      return node;
    }

    if (node.right === null) {
      node = node.left;
      return node;
    }

    let dataNew = this.min(node.right);
    node.data = dataNew;
    node.right = this.remove(dataNew, node.right);

    return node;
  }

  min(node = this.head) {
    if (node === null) return null;

    if (node.left) return this.min(node.left);
    return node.data;
  }

  max(node = this.head) {
    if (node === null) return null;

    if (node.right) return this.max(node.right);
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};