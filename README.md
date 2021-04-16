# PREREQUIREMENTS

To be able to make the application works properly you need:

- node
- yarn
- Metamask installed with some ETH on Ropsten network
- Have this link on your side, it will help you through the exercices https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html

# INSTALL

To make the application work write the next commands:
1 - yarn
2 - yarn start
3 - play the piano!

# EXERCICE 1 - READ

Read all the pieces on the market to know which one interests you.

- The documentation you need is here: https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html#methods-mymethod-call
- Have the smartcontract in front. Is inside /contracts/PianoNFT.sol
- Go to the file PianoNFTServices.tsx
- Complete the 'getAllPieces' method
- You will also need to fill the 'getOwnedPieces'!
- If everything went well you should already have some pieces there!

- Hints:
- The functions you need to call from the smart contract is getAllPieces and getOwnedPieces. They have no parameters! So relax, just call them
- They are promises! So make sure to put an await

# EXERCICE 2 - WRITE

Store your musical piece on the blockchain to sell it!

- The documentation you need is here: https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html#methods-mymethod-send
- Have the smartcontract in front. Is inside /contracts/PianoNFT.sol
- Go to the file PianoNFTServices.tsx
- Complete the 'createPiece' method.
- Complete the 'buyPiece' method.
- Try to create your new piece of art
- Or try to buy something!
- Once is finished, do the same with the 'buyPiece' method. The exercice should be extremely similar!
- Try to buy a piece from your mates!

- Hints:
- The functions you need to call from the smart contract are buyPiece and createPiece. This time they have parameters check the contract to know where to put them! (separate them by commas and follow the order, you have all the information on the function already!).
- As a configuration parameters you can use this for createPiece:
- { from: currentAccount, gasPrice: gasPrice, gas: gasEstimate }
- And this for buyPiece
- {
  from: currentAccount,
  gasPrice: gasPrice,
  gas: gasEstimate,
  value: price,
  }
- They are promises! So make sure to put an await

# EXERCICE 3 - SUBSCRIPTIONS

Subscribe to an event to know when there is new information on the blockchain.

- The documentation you specifically need is here: https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html#contract-events
- Go to the file PianoNFTServices.tsx
- Complete the 'subscribeNewPieces' method.
- Complete the 'subscribeBoughtPieces' method.
- Now ensure to reload completely the application.
- Everytime anyone creates a new notification it will appear on the screen.
- And if you buy something, a notification will appear for you and only for you.

- Hints:
- Use this parameters on the call for subscribeNewPieces!
- { fromBlock: "latest" },
  (t: any, events: any) => {
  let piece: Piece = {
  ...events.returnValues,
  ethPrice: web3.utils.fromWei(events.returnValues.price, "ether"),
  };
  handler(piece);
  }
- Use this parameters on the call for subscribeBoughtPieces:
  { fromBlock: "latest", filter: { newOwner: [currentAccount] } },
  (t: any, events: any) => {
  handler();
  }
