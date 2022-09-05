export const networkConfig = {

    "4": [
        {
            contractProxyAddress: "0x5471FF36b9007620505E5f119F022Ca24Abf8e90", //proxy deployment
            nftImage: "https://postimg.cc/SXyPqDJd",
            tokenContract: "0x91146FE7Ed2167f5aD69914655585B45A41d2873",
            tokenSymbol: 'IVY',
            decimal: 18,
            networkName: "Rinkeby Testnet"
        },
    ],
}

export const getConfigByChain = (chain) => networkConfig[chain]