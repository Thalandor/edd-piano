// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract PianoNFT is ERC721Enumerable {
    
    struct Piece{
        string title;
        string piece;
        uint price;
        uint tokenId;
        address author;
    }
    
    mapping(uint => Piece) tokenPiece;
    
    Piece[] public pieces ;

    event PieceCreated(string title, address indexed composer, string piece, uint256 price, uint tokenId, address author);
    
    constructor ()  ERC721("PianoNFT", "PNFT")   
    {
    }
    

    function createPiece(string memory title, string memory piece,  uint256 price) public 
    {
        uint supply = totalSupply();
        super._mint(msg.sender, supply);
        approve(address(this), supply);
        tokenPiece[supply] = Piece(title, piece, price, supply, msg.sender);
        pieces.push(tokenPiece[supply]);
        emit PieceCreated(title, msg.sender,piece, price, supply, msg.sender);
    }
    
    function buyPiece(uint tokenId) public payable{
        require(tokenPiece[tokenId].price != 0, "Token does not exist");
        require(tokenPiece[tokenId].price == msg.value, "Value sent and price are not the same");
        address owner = ownerOf(tokenId);
        super._transfer(owner, msg.sender, tokenId);
        bool sent = payable(owner).send(msg.value);
        require(sent, "Failed to send Ether");
    }
    
    function getOwnedPieces() public view returns(Piece[] memory) {
       uint tokens = balanceOf(msg.sender);
       Piece[] memory ownedPieces = new Piece[](tokens);
       for(uint i = 0; i < tokens; ++i){
           uint tokenId = tokenOfOwnerByIndex(msg.sender, i);
           Piece memory piece = tokenPiece[tokenId];
           ownedPieces[i] = piece;
       }
       return ownedPieces;
    }
    
    function getAllPieces() public view returns(Piece[] memory){
        return pieces;
    }
}