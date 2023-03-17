const SHA256 = require('crypto-js/sha256');

// Class with a constructor for the block.
class Block {
  constructor(data) {
    this.hash = '';
    this.height = 0;
    this.body = data;
    this.time = 0;
    this.previousBlockHash = '';
  }
}

// Class with a constructor for the Blockchain.
class Blockchain {
  constructor() {
    this.chain = [];
    this.addBlock(new Block('First block in the chain - Genesis block'));
  }

  addBlock(newBlock) {
    newBlock.height = this.chain.length;
    newBlock.time = new Date().getTime().toString().slice(0, -3);
    if (this.chain.length > 0) {
      newBlock.previousBlockHash = this.chain[this.chain.length - 1].hash; // here we find the hash of the previous block in the chain and set it to the previousBlockHash property of newBlock
    }
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    this.chain.push(newBlock);
  }
}
