import { ethers, network } from 'hardhat'
import { writeFileSync } from 'fs'

async function main() {
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  const config = {
    v2Factory: '0x0000000000000000000000000000000000000000',
    stableFactory: '0x0000000000000000000000000000000000000000',
    stableInfo: '0x0000000000000000000000000000000000000000',
    WNATIVE: '0x22f92e5a6219bEf9Aa445EBAfBeB498d2EAdBF01',
  }
  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const v3DeployedContracts = await import(`@verylongswap/core/deployments/${networkName}.json`)
  console.log('v3DeployedContracts', v3DeployedContracts, networkName)

  const pancakeV3PoolDeployer_address = v3DeployedContracts.VeryLongPoolDeployer
  const pancakeV3Factory_address = v3DeployedContracts.VeryLongFactory
  const positionManager_address = "0xc076DED86B7Cb89f4830Ce98543769c47B4290c5"

  /** SmartRouterHelper */
  console.log('Deploying SmartRouterHelper...')
  const SmartRouterHelper = await ethers.getContractFactory('SmartRouterHelper')
  const smartRouterHelper = await SmartRouterHelper.deploy()
  console.log('SmartRouterHelper deployed to:', smartRouterHelper.address)

  /** SmartRouter */
  console.log('Deploying SmartRouter...')
  const SmartRouter = await ethers.getContractFactory('SmartRouter', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const smartRouter = await SmartRouter.deploy(
    config.v2Factory,
    pancakeV3PoolDeployer_address,
    pancakeV3Factory_address,
    positionManager_address,
    config.stableFactory,
    config.stableInfo,
    config.WNATIVE
  )
  console.log('SmartRouter deployed to:', smartRouter.address)


  /** MixedRouteQuoterV1 */
  const MixedRouteQuoterV1 = await ethers.getContractFactory('MixedRouteQuoterV1', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const mixedRouteQuoterV1 = await MixedRouteQuoterV1.deploy(
    pancakeV3PoolDeployer_address,
    pancakeV3Factory_address,
    config.v2Factory,
    config.stableFactory,
    config.WNATIVE
  )
  console.log('MixedRouteQuoterV1 deployed to:', mixedRouteQuoterV1.address)

  /** QuoterV2 */
  const QuoterV2 = await ethers.getContractFactory('QuoterV2', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const quoterV2 = await QuoterV2.deploy(pancakeV3PoolDeployer_address, pancakeV3Factory_address, config.WNATIVE)
  console.log('QuoterV2 deployed to:', quoterV2.address)

  /** TokenValidator */
  const TokenValidator = await ethers.getContractFactory('TokenValidator', {
    libraries: {
      SmartRouterHelper: smartRouterHelper.address,
    },
  })
  const tokenValidator = await TokenValidator.deploy(config.v2Factory, positionManager_address)
  console.log('TokenValidator deployed to:', tokenValidator.address)

  const contracts = {
    SmartRouter: smartRouter.address,
    SmartRouterHelper: smartRouterHelper.address,
    MixedRouteQuoterV1: mixedRouteQuoterV1.address,
    QuoterV2: quoterV2.address,
    TokenValidator: tokenValidator.address,
  }

  writeFileSync(`./deployments/${network.name}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
