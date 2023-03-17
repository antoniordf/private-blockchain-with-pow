const SHA256 = require("crypto-js/sha256");

// Class with a constructor for the block.
class Block {
  constructor(data) {
    this.hash = "";
    this.height = 0;
    this.body = data;
    this.time = 0;
    this.previousBlockHash = "";
    this.nonce = 0; // Add a nonce property for the PoW
  }

  // Add the mineBlock method to perform Proof of Work
  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join(0) // A) See explanation below.
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined", this.hash);
  }

  // Calculate the hash of the block
  calculateHash() {
    return SHA256(
      this.height +
        this.previousBlockHash +
        this.time +
        JSON.stringify(this.body) +
        this.nonce
    ).toString();
  }
}

// Class with a constructor for the Blockchain.
class Blockchain {
  constructor() {
    this.chain = [];
    this.difficulty = 1; // Set difficulty for mining
    this.addBlock(new Block("First block in the chain - Genesis block"));
  }

  addBlock(newBlock) {
    newBlock.height = this.chain.length;
    newBlock.time = new Date().getTime().toString().slice(0, -3);
    if (this.chain.length > 0) {
      newBlock.previousBlockHash = this.chain[this.chain.length - 1].hash; // here we find the hash of the previous block in the chain and set it to the previousBlockHash property of newBlock
    }
    newBlock.mineBlock(this.difficulty); // Call the mineBlock method before adding to the chain
    this.chain.push(newBlock);
  }
}

// A) this.hash.substring(0, difficulty):
// This extracts a substring of the current block's hash, starting at index 0 and ending just before the index specified by difficulty.
// This essentially takes the first difficulty number of characters from the hash.

// Array(difficulty + 1).join('0'):
// This creates an array of size difficulty + 1, and then joins its elements using the character '0' as the separator.
// Since the elements in the array are empty (undefined), the resulting string will consist of difficulty number of 0 characters.

// this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0'):
// This checks if the substring of the hash mentioned in step 1 is NOT equal to the string of zeros mentioned in step 2.
// If they are not equal, the mining process continues, incrementing the nonce and computing a new hash. If they are equal,
// it means the block's hash meets the difficulty requirement, and the mining process stops.
