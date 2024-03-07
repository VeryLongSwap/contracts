import { verifyContract } from '@pancakeswap/common/verify'

async function main() {

  await verifyContract("0xB155589b8685cf8Ea198821559208cEa78FeF3fD")

  // Verify swapRouter
  console.log('Verify Descriptor')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
