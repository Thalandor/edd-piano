import { SongContractABI, SongContractAddress } from "../config/contractInfo";
import { initWeb3 } from "../utils/web3Utils";

export interface Piece {
  piece: string;
  price: string;
  ethPrice: string;
  tokenId: number;
  title: string;
  author: string;
}

export const getOwnedPieces = async () => {
  const web3 = await initWeb3();
  if (web3) {
    const nftContract = new web3.eth.Contract(
      SongContractABI,
      SongContractAddress
    );
    const accounts = await web3.eth.getAccounts();

    let pieces: Piece[] = await nftContract.methods
      .getOwnedPieces()
      .call({ from: accounts[0] });
    pieces = pieces.map((p) => {
      return { ...p, ethPrice: web3.utils.fromWei(p.price, "ether") };
    });
    return pieces;
  }
  return [];
};

export const getAllPieces = async () => {
  const web3 = await initWeb3();
  if (web3) {
    const nftContract = new web3.eth.Contract(
      SongContractABI,
      SongContractAddress
    );
    let pieces: Piece[] = await nftContract.methods.getAllPieces().call();
    const ownedPieces = await getOwnedPieces();
    pieces = pieces.map((p) => {
      return { ...p, ethPrice: web3.utils.fromWei(p.price, "ether") };
    });
    pieces = pieces.filter(
      (p) => !ownedPieces.some((ow) => ow.tokenId === p.tokenId)
    );
    return pieces;
  }
  return [];
};

export const getCurrentAddress = async () => {
  const web3 = await initWeb3();
  if (web3) {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  }
  return "";
};

export const buyPiece = async (tokenId: string, price: number) => {
  const web3 = await initWeb3();
  if (web3) {
    const nftContract = new web3.eth.Contract(
      SongContractABI,
      SongContractAddress
    );
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];
    const gasPrice = await web3.eth.getGasPrice();
    const gasEstimate = await nftContract.methods
      .buyPiece(tokenId)
      .estimateGas({ from: currentAccount, value: price });
    await nftContract.methods.buyPiece(tokenId).send({
      from: currentAccount,
      gasPrice: gasPrice,
      gas: gasEstimate,
      value: price,
    });
  }
};

export const createPiece = async (
  title: string,
  piece: string,
  value: number
) => {
  const web3 = await initWeb3();
  if (web3) {
    const nftContract = new web3.eth.Contract(
      SongContractABI,
      SongContractAddress
    );
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];
    const gasPrice = await web3.eth.getGasPrice();
    const price = web3.utils.toWei(value.toString(), "ether");

    const gasEstimate = await nftContract.methods
      .createPiece(title, piece, price)
      .estimateGas({ from: currentAccount });
    await nftContract.methods
      .createPiece(title, piece, price)
      .send({ from: currentAccount, gasPrice: gasPrice, gas: gasEstimate });
  }
};

export const subscribeNewPieces = async (handler: Function) => {
  const web3 = await initWeb3();
  if (web3) {
    const nftContract = new web3.eth.Contract(
      SongContractABI,
      SongContractAddress
    );
    let subscription = await nftContract.events.PieceCreated(
      { fromBlock: "latest" },
      (t: any, events: any) => {
        let piece: Piece = {
          ...events.returnValues,
          ethPrice: web3.utils.fromWei(events.returnValues.price, "ether"),
        };
        handler(piece);
      }
    );
    return subscription;
  }
};

export const subscribeBoughtPieces = async (handler: Function) => {
  const web3 = await initWeb3();
  if (web3) {
    const nftContract = new web3.eth.Contract(
      SongContractABI,
      SongContractAddress
    );
    const accounts = await web3.eth.getAccounts();
    const currentAccount = accounts[0];
    let subscription = await nftContract.events.PieceBought(
      { fromBlock: "latest", filter: { newOwner: [currentAccount] } },
      (t: any, events: any) => {
        handler();
      }
    );
    return subscription;
  }
};
