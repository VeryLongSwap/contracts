import bn from 'bignumber.js'
import { ContractFactory, utils, BigNumber } from 'ethers'
import { ethers, upgrades, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  PancakeInterfaceMulticallV2: require('../artifacts/contracts/lens/PancakeInterfaceMulticallV2.sol/PancakeInterfaceMulticallV2.json'),
}

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  const config_wnative = "0x22f92e5a6219bEf9Aa445EBAfBeB498d2EAdBF01"

  if (!config_wnative) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const PancakeInterfaceMulticallV2 = new ContractFactory(
    artifacts.PancakeInterfaceMulticallV2.abi,
    artifacts.PancakeInterfaceMulticallV2.bytecode,
    owner
  )

  const pancakeInterfaceMulticallV2 = await PancakeInterfaceMulticallV2.deploy()
  console.log('PancakeInterfaceMulticallV2', pancakeInterfaceMulticallV2.address)

  const contracts = {
    PancakeInterfaceMulticallV2: pancakeInterfaceMulticallV2.address,
  }

  fs.writeFileSync(`./deployments/${networkName}.multicallV2.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
