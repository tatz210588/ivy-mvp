const { ethers, upgrades } = require("hardhat")


async function main() {

  const carbonNFT = await ethers.getContractFactory("CarbonNFT")
  const proxy = await upgrades.deployProxy(carbonNFT)
  console.log("CarbonNFT deployed to:", proxy.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("This is error")
    console.error(error)
    process.exit(1)
  })
