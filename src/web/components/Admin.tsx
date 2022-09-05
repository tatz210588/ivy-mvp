import React, { useEffect } from 'react'
import Image from 'next/image'
import Router from 'next/router'
import { ethers } from 'ethers'
import { getConfigByChain } from '../config'
import CarbonNFT from '../artifacts/contracts/CarbonNFT.sol/CarbonNFT.json'
import toast, { Toaster } from 'react-hot-toast'
import BigNumber from 'bignumber.js'

const style = {
  wrapper: `relative`,
  searchBar: `flex flex-1 mx-[0.8rem] w-[100%] items-center bg-transparent rounded-[0.8rem] hover:bg-transparent mt-2 p-1 pay-search`,
  container: `flex flex-wrap before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#040f13] before:bg-cover before:bg-center before:bg-fixed before:opacity-100`,
  contentWrapper: `w-[95%] lg:w-full m-4 relative justify-center flex flex-wrap items-center block flex-grow lg:flex lg:items-center lg:w-auto`,
  copyContainer: `w-[95%] lg:w-full lg:flex md:flex items-center`,
  boxWrapper: `w-full relative border m-4 shadow-20xl before:blur bg-[#ffffff] shadow-inner border-[#414663] rounded bg-[#ffffff]] overflow-hidden justify-center `,
  infoLeft: `flex-0.2 flex-wrap`,
  txt: `text-[#ffffff] bg-[#000000] text-opacity-100 text-9xl font-black before:content-[] before:absolute before:mix-blend-difference before:blur-[5px]`,
  neonWrapper: `inline-flex brightness-200`,
  gradient: `absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-purple-600 blur opacity-100 mix-blend-multiply top-3 left-2.5 right-2.5 bottom-2.5 `,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  assetName: `font-sans text-md lg:text-xl mt-2 text-[#ffffff]`,
  winDetails: `font-sans text-sm lg:text-xl mt-2 text-[#ffffff]`,
  timeStyle: `font-sans text-4xl mt-2 text-[#ffffff]`,
  timeData: `font-sans text-xs text-[#ffffff]`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  infoRight: `flex-0.4 text-right`,
  infoCenter: `flex-0.4 text-center`,
  currentAPY: `font-sans text-md lg:text-xl mt-2 text-[#00ff00]`,
  glowDivBox: `relative group w-full lg:w-[95%]  `,
  glowDiv: ` flex w-[95%] lg:w-full  absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`,
  glowDivSmall: ` flex w-[95%] lg:w-[40rem]  absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`,
  searchInput: `form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,
  logoText: ` ml-[0.8rem] font-semibold text-2xl tracking-tight text-[#ffffff]`,
  img: `fill-current h-8 w-8 mr-2`,
}

const Admin = () => {
  const [contractBalance, setContractBalance] = React.useState(0)
  const [formInput, updateFormInput] = React.useState({
    rate: 0,
    supply: 0,
  })

  useEffect(() => {
    //getContractBalance()
  }, [])

  function formatBigNumber(bn) {
    const divideBy = new BigNumber('10').pow(new BigNumber(18))
    const converted = new BigNumber(bn.toString())
    const divided = converted.div(divideBy)
    return divided.toFixed(0, BigNumber.ROUND_DOWN)
  }

  async function saveData() {
    await (window as any).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
    const network = await provider.getNetwork()
    const signer = provider.getSigner()
    const contractTx = new ethers.Contract(
      getConfigByChain(network.chainId)[0].contractProxyAddress,
      CarbonNFT.abi,
      signer
    )
    const etherAmount = ethers.utils.parseUnits(
      formInput.supply.toString(),
      'ether'
    )
    const tx = await contractTx.setRatePerNFTAndTotalSupply(
      formInput.rate,
      18,
      etherAmount
    )
    toast('Saving data to Blockchain... Please Wait', { icon: '👏' })
    const receipt = await provider
      .waitForTransaction(tx.hash, 1, 150000)
      .then(() => {
        toast.success(`Data Saved Successfully !!!`)
        Router.push({
          pathname: '/',
        })
      })
  }

  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className="w-[95%] py-16 lg:ml-8 lg:w-full ">
            <div className="grid gap-8">
              <div className={style.glowDivBox}>
                <div className={style.glowDiv}></div>
                <div className="relative h-full w-[95%] items-center rounded-lg bg-[#040f13] px-7 py-4 leading-none  lg:w-full">
                  <span className="flex items-center space-x-5">
                    <span className="pr-6 text-xl text-gray-100 lg:text-3xl">
                      Control Panel
                    </span>
                  </span>
                  <div className="mt-4 text-[#ffffff]">Price per NFT</div>
                  <input
                    id="setRatePerNFT"
                    className="z-0 mt-1 h-10 w-[40%] rounded-lg p-1 text-[#000000] focus:shadow focus:outline-none lg:w-[60rem]"
                    placeholder="Set per NFT Pricing:"
                    value={formInput.rate}
                    onChange={(e) =>
                      updateFormInput((formInput) => ({
                        ...formInput,
                        rate: Number(e.target.value),
                      }))
                    }
                  />
                  <div className="mt-4 text-[#ffffff]">Total Supply</div>
                  <input
                    type="number"
                    id="setTotalSupply"
                    className="z-0 mt-1 h-10 w-[40%] rounded-lg p-1 text-[#000000] focus:shadow focus:outline-none lg:w-[60rem]"
                    placeholder="Fix the Total Supply:"
                    value={formInput.supply}
                    onChange={(e) =>
                      updateFormInput((formInput) => ({
                        ...formInput,
                        supply: Number(e.target.value),
                      }))
                    }
                  />
                  <button
                    onClick={() => saveData()}
                    className="hover: ml-5 h-12 w-[6rem] rounded-xl bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 text-white lg:w-[10rem]"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
