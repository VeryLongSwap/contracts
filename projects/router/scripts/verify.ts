import { verifyContract } from '@pancakeswap/common/verify'
import { sleep } from '@pancakeswap/common/sleep'

async function main() {

  // Verify SmartRouterHelper
  await verifyContract("0x567E44D715eaF393D6787C4E5B7c8DA004Fe5a7B")
  await sleep(10000)

  // Verify swapRouter
  console.log('Verify swapRouter')
  await verifyContract("0x506a777a65730D483f07089d1ecdFE947a8c3fEa", [
    "0x0000000000000000000000000000000000000000",
    "0xe6106137F52D93C5eAa00d9D89dC7DDFBEAd6Cc1",
    "0x287fAE8c400603029c27Af0451126b9581B6fcD4",
    "0x6Ceec9fA9269F0807797A9f05522fe70DB8d4f90",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0xE9CC37904875B459Fa5D0FE37680d36F1ED55e38",
  ])
  await sleep(10000)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
