const hre = require("hardhat")


async function main() {

    const IVYCoin = await hre.ethers.getContractFactory("IVYCoin")
    const ivycoin = await IVYCoin.deploy()
    await ivycoin.deployed()
    console.log("IVYCoin deployed to:", ivycoin.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("This is error")
        console.error(error)
        process.exit(1)
    })
