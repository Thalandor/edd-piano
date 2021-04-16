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
- Go to the file PianoNFTServices.tsx
- Complete the 'getAllPieces' method
- If everything went well you should already have some pieces there!

# EXERCICE 2 - WRITE

Store your musical piece on the blockchain to sell it!

- The documentation you need is here: https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html#methods-mymethod-send
- Go to the file PianoNFTServices.tsx
- Complete the 'createPiece' method.
- Try to create your new piece of art!
- Once is finished, do the same with the 'buyPiece' method. The exercice should be extremely similar!
- Try to buy a piece from your mates!

# EXERCICE 3 - SUBSCRIPTIONS

Subscribe to an event to know when there is new information on the blockchain.

- The documentation you specifically need is here: https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html#contract-events
- Go to the file PianoNFTServices.tsx
- Complete the 'subscribeNewPieces' method.
- Create a new piece.
- If everything goes well a notification should be shown on the screen when the creation it's done!
