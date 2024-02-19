import { ethers } from 'hardhat'
import PancakeV3PoolArtifact from '../artifacts/contracts/VeryLongPool.sol/VeryLongPool.json'

const hash = ethers.utils.keccak256(PancakeV3PoolArtifact.bytecode)
console.log(hash)
