import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()
  console.log('owner', owner.address)

  const NonfungibleTokenPositionDescriptor = await ethers.getContractFactory("NonfungibleTokenPositionDescriptorOffChainVLS")
  const nonfungibleTokenPositionDescriptor = await NonfungibleTokenPositionDescriptor.deploy()
  await nonfungibleTokenPositionDescriptor.deployed()
  console.log('NonfungibleTokenPositionDescriptor deployed at', nonfungibleTokenPositionDescriptor.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
