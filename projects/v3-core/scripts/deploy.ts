import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  VeryLongPoolDeployer: require('../artifacts/contracts/VeryLongPoolDeployer.sol/VeryLongPoolDeployer.json'),
  // eslint-disable-next-line global-require
  VeryLongFactory: require('../artifacts/contracts/VeryLongFactory.sol/VeryLongFactory.json'),
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  let pancakeV3PoolDeployer_address = ''
  let pancakeV3PoolDeployer
  const VeryLongPoolDeployer = new ContractFactory(
    artifacts.VeryLongPoolDeployer.abi,
    artifacts.VeryLongPoolDeployer.bytecode,
    owner
  )
  if (!pancakeV3PoolDeployer_address) {
    pancakeV3PoolDeployer = await VeryLongPoolDeployer.deploy()

    pancakeV3PoolDeployer_address = pancakeV3PoolDeployer.address
    console.log('pancakeV3PoolDeployer', pancakeV3PoolDeployer_address)
  } else {
    pancakeV3PoolDeployer = new ethers.Contract(
      pancakeV3PoolDeployer_address,
      artifacts.VeryLongPoolDeployer.abi,
      owner
    )
  }

  let pancakeV3Factory_address = ''
  let pancakeV3Factory
  if (!pancakeV3Factory_address) {
    const VeryLongFactory = new ContractFactory(
      artifacts.VeryLongFactory.abi,
      artifacts.VeryLongFactory.bytecode,
      owner
    )
    pancakeV3Factory = await VeryLongFactory.deploy(pancakeV3PoolDeployer_address)

    pancakeV3Factory_address = pancakeV3Factory.address
    console.log('pancakeV3Factory', pancakeV3Factory_address)
  } else {
    pancakeV3Factory = new ethers.Contract(pancakeV3Factory_address, artifacts.VeryLongFactory.abi, owner)
  }

  // Set FactoryAddress for pancakeV3PoolDeployer.
  await pancakeV3PoolDeployer.setFactoryAddress(pancakeV3Factory_address);

  const OutputCodeHash = await ethers.getContractFactory("OutputCodeHash");
  const outputCodeHash = await OutputCodeHash.deploy();
  console.log("OutputCodeHash", outputCodeHash.address);

  const hash = await outputCodeHash.getInitCodeHash();
  console.log("hash: ", hash);

  const contracts = {
    VeryLongFactory: pancakeV3Factory_address,
    VeryLongPoolDeployer: pancakeV3PoolDeployer_address,
    InitCodeHashAddress: outputCodeHash.address,
    InitCodeHash: hash,
  }

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
