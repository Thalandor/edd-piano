import Web3 from "web3";


export const initWeb3 = async () => {
    let ethereum = (window as any).ethereum;
    let windowWeb3 = (window as any).web3;
    // New metamask version
    if (typeof ethereum !== 'undefined') {
        await ethereum.enable();
        return new Web3(ethereum);
    // Else for backwards compatibility			
    } else if (typeof windowWeb3 !== 'undefined') {
        return new Web3(windowWeb3.currentProvider);
    } 
}
