const { ethers, upgrades } = require("hardhat")

async function main() {
    const carbonNFT = await ethers.getContractFactory("CarbonNFT")
    let proxy = await upgrades.upgradeProxy("0x5471FF36b9007620505E5f119F022Ca24Abf8e90", carbonNFT)//rinkeby
    console.log("Contract has been successfully upgraded.")
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("This is error")
        console.error(error)
        process.exit(1)
    })
