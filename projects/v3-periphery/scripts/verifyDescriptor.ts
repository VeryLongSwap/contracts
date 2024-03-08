import { verifyContract } from '@pancakeswap/common/verify'

async function main() {

  await verifyContract("0xef48c809a3a7c4f1d6c21841c1fdbad1ac35270b")

  // Verify swapRouter
  console.log('Verify Descriptor')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
