import { verifyContract } from '@pancakeswap/common/verify'
import { sleep } from '@pancakeswap/common/sleep'

async function main() {

  await verifyContract("0x44bCb48636022453B67295ABafA7Fe6EBf0e2c36")
  await sleep(10000)

  // Verify swapRouter
  console.log('Verify swapRouter')
  await verifyContract("0x03efF0c7d42d691991F7EFa7A8F5480622395dEb", [
    "0x0000000000000000000000000000000000000000",
    "0xe6106137F52D93C5eAa00d9D89dC7DDFBEAd6Cc1",
    "0x287fAE8c400603029c27Af0451126b9581B6fcD4",
    "0xAAE22359B6596208baF67867B46685fcf595EB8e",
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000",
    "0x22f92e5a6219bEf9Aa445EBAfBeB498d2EAdBF01",
  ])
  await sleep(10000)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
