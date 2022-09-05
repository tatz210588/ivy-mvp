import React, { useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { ethers } from 'ethers'
import CarbonNFT from '../artifacts/contracts/CarbonNFT.sol/CarbonNFT.json'
import TokenContact from '../artifacts/contracts/IVYCoin.sol/IVYCoin.json'
import { getConfigByChain } from '../config'
import BigNumber from 'bignumber.js'
import Image from 'next/image'
import logo from '../assets/green.jpeg'
import token from '../assets/token.png'
import logoSoon from '../assets/coral.jpeg'
import toast, { Toaster } from 'react-hot-toast'
import { BsArrowRight } from 'react-icons/bs'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const style = {
  wrapper: `relative`,
  wrappers: `w-full relative mt-4 border border-[#151b22] rounded-xl bg-[#ffffff]] overflow-hidden justify-center `,
  searchBar: `flex flex-1 mx-[0.8rem] w-[100%] items-center bg-transparent rounded-[0.8rem] hover:bg-transparent mt-2 p-1 pay-search`,
  container: `flex flex-wrap before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#fafaf9] before:bg-cover before:bg-center before:bg-fixed before:opacity-100`,
  contentWrapper: `w-[95%] lg:w-full m-4 relative justify-center flex flex-wrap items-center block flex-grow lg:flex lg:items-center lg:w-auto`,
  copyContainer: `w-[95%] lg:w-full lg:flex md:flex items-center`,
  boxWrapper: `w-full relative border m-4 shadow-20xl before:blur bg-[#ffffff] shadow-inner border-[#414663] rounded bg-[#ffffff]] overflow-hidden justify-center `,
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

  infoRight: `flex-0.4 text-right font-normal text-xs text-black m-5`,
  infoCenter: `flex-0.4 text-center`,
  infoLeft: `flex-0.2 flex-wrap m-5`,

  currentAPY: `font-sans text-md lg:text-xl mt-2 text-[#00ff00]`,
  glowDivBox: `relative group w-full lg:w-[95%]  `,
  titleLeft: `flex-1 flex items-center text-xl font-bold justify-center text-black cursor-pointer`,
  titlle: `bg-[#ffffff] px-6 py-4 flex iems-center`,
  titleIcon: `text-3xl`,
  glowDiv: ` flex w-[95%] lg:w-full  absolute -inset-0.5 bg-["../assets/EvoFinance_white.svg"] rounded-lg blur opacity-75 group-hover:opacity-0 transition duration-1000 group-hover:duration-200 animate-tilt`,
  glowDivSmall: ` flex w-[95%] lg:w-[40rem]  absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt`,
  searchInput: `form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,
  logoText: ` ml-[0.8rem] font-semibold text-2xl tracking-tight text-[#ffffff]`,
  img: `fill-current h-8 w-8 mr-2 rounded-2xl`,
  fundButton: ` rounded-3xl bg-[#501cc9] text-white p-3 rounded hover:bg-[#6e3ede] mt-6`,
  floatButton: `absolute rounded-3xl bottom-5 right-10 bg-[#fafaf9] text-black p-3 rounded hover:bg-[#c0ccc3] m-6`,
  ghanaButton: `absolute rounded-3xl bottom-15 left-5 bg-[#fafaf9] text-black p-1 rounded m-6`,
}

const Hero = () => {
  const [totalSupply, setTotalSupply] = useState<any>(0)
  const [totalProjectValue, setTotalProjectValue] = React.useState<any>(0)
  const { data, isError, isLoading } = useAccount()
  const [ratePerNft, setRatePerNft] = useState<any>(0)
  const [allowed, setAllowed] = useState<any>(false)
  const [currentValue, setCurrentValue] = useState<any>(0)
  const [backers, setBackers] = useState<any>(0)
  const [noOfTokens, setNoOfTokens] = useState<any>(1)
  const [winnerCount, setWinnerCount] = useState<any>(0)
  const [toggle, setToggle] = useState<Boolean>(false)

  useEffect(() => {
    checkAllowance()
    showScreenDetailsOnLoad()
  }, [data?.address])

  async function checkAllowance() {
    await (window as any).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
    const network = await provider.getNetwork()
    const signer = provider.getSigner()
    const tokenContract = new ethers.Contract(
      getConfigByChain(network.chainId)[0].tokenContract,
      TokenContact.abi,
      signer
    )
    if (data) {
      const tx = await tokenContract.allowance(
        data?.address,
        getConfigByChain(network.chainId)[0].contractProxyAddress
      )
      formatBigNumber(tx) != '0' ? setAllowed(true) : setAllowed(false)
    }
  }

  async function showScreenDetailsOnLoad() {
    await (window as any).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
    const network = await provider.getNetwork()
    const signer = provider.getSigner()
    const contractTx = new ethers.Contract(
      getConfigByChain(network.chainId)[0].contractProxyAddress,
      CarbonNFT.abi,
      signer
    )
    const totalSupply = await contractTx.getTotalSupply()
    setTotalSupply(formatBigNumber(totalSupply))

    const totalProjectValue = await contractTx.getTotalProjectValue()
    setTotalProjectValue(formatBigNumber(totalProjectValue / 1e18))

    const rate = await contractTx.getRatePerNFT()
    setRatePerNft(formatBigNumber(rate))

    const collected = await contractTx.getAccmulatedProjectValue()
    setCurrentValue(formatBigNumber(collected))

    const backer = await contractTx.getBackers()
    setBackers(formatBigNumber(backer))
  }

  async function approve() {
    await (window as any).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
    const network = await provider.getNetwork()
    const signer = provider.getSigner()
    const tokenContract = new ethers.Contract(
      getConfigByChain(network.chainId)[0].tokenContract,
      TokenContact.abi,
      signer
    )
    const tx = await tokenContract.approve(
      getConfigByChain(network.chainId)[0].contractProxyAddress,
      '115792089237316195423570985008687907853269984665640564039457584007913129639935'
    )
    toast('Approval in process... Please Wait', { icon: '👏' })
    const receipt = await provider
      .waitForTransaction(tx.hash, 1, 150000)
      .then(() => {
        toast.success(`You are successfully Approved `)
        setAllowed(true)
      })
  }

  async function buyNFT() {
    await (window as any).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
    const network = await provider.getNetwork()
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(
      getConfigByChain(network.chainId)[0].contractProxyAddress,
      CarbonNFT.abi,
      signer
    )

    const tx = await nftContract.mintNFTs(
      getConfigByChain(network.chainId)[0].tokenContract,
      noOfTokens
    )

    toast('Minting NFT... Please Wait... Do not refresh !!', { icon: '👏' })
    const receipt = await provider
      .waitForTransaction(tx.hash, 1, 150000)
      .then(() => {
        toast.success(`NFT has been minted to your wallet`)
        showScreenDetailsOnLoad()
      })
  }
  function formatBigNumber(bn) {
    const divideBy = new BigNumber('10').pow(new BigNumber(18))
    const converted = new BigNumber(bn.toString())
    const divided = converted.div(divideBy)
    return divided.toFixed(0, BigNumber.ROUND_DOWN)
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
                <div className="relative h-[full] w-[95%] items-center justify-center  divide-x divide-gray-600 rounded-lg bg-[#fafaf9] px-7  py-9 leading-none lg:w-full">
                  <div className={style.details}>
                    <span className="relative flex items-center rounded-xl">
                      <Image className={style.img} src={logo} height={800} />
                      <button
                        className={style.floatButton}
                        onClick={() => setToggle(!toggle)}
                      >
                        <div className="flex">
                          Fund This Project &nbsp;&nbsp;
                          <BsArrowRight size={20} />
                        </div>
                      </button>
                      <div>
                        <div className={style.ghanaButton}>
                          Ghana, West Africa
                        </div>
                        <div className="absolute bottom-14 left-5 mt-10 text-lg font-bold text-[#fafaf9] lg:text-5xl">
                          Reforestation In Ghana
                        </div>
                      </div>
                    </span>
                    {toggle && (
                      <div className={style.infoLeft}>
                        <div className={style.wrappers}>
                          <div className={style.info}>
                            <div className={style.infoLeft}>
                              <div className="text-xs font-normal text-black">
                                FUNDING PROGRESS
                              </div>
                              <div className="mt-5 flex text-2xl font-bold text-black">
                                <div className="text-[#502fbd]">
                                  IVY {currentValue}
                                </div>
                                <div>&nbsp;/&nbsp;IVY {totalProjectValue}</div>
                              </div>
                              <div className="mt-8 text-xl font-semibold text-black">
                                IVY {ratePerNft}
                              </div>
                              <div className="mt-1 text-xs font-normal text-black">
                                PRICE PER TOKEN
                              </div>
                              <div className="mt-8 text-xl font-semibold text-black">
                                {currentValue / ratePerNft}/{totalSupply}
                              </div>
                              <div className="mt-1 flex text-xs font-normal text-black">
                                <div>TOKEN SUPPLY</div>
                                <div className=" ml-3 rounded-3xl bg-[#fac8cc]  px-2 font-thin text-[#000000]">
                                  {totalSupply - currentValue / ratePerNft} left
                                </div>
                              </div>
                              <div className="mt-8 text-xl font-semibold text-black">
                                {backers}
                              </div>
                              <div className="mt-1 text-xs font-normal text-black">
                                BACKERS
                              </div>
                              <div className="mt-8 text-xl font-semibold text-black">
                                <select
                                  onChange={(e) =>
                                    setNoOfTokens(e.target.value)
                                  }
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                </select>
                              </div>
                              <div className="mt-1 text-xs font-normal text-black">
                                NO OF TOKENS
                              </div>
                              {data ? (
                                allowed === true ? (
                                  <button
                                    className={style.fundButton}
                                    onClick={() => buyNFT()}
                                  >
                                    <div className="flex">
                                      Fund This Project &nbsp;&nbsp;
                                      <BsArrowRight size={20} />
                                    </div>
                                  </button>
                                ) : (
                                  <button
                                    className={style.fundButton}
                                    onClick={() => approve()}
                                  >
                                    <div className="flex">
                                      Approve &nbsp;&nbsp;
                                      <BsArrowRight size={20} />
                                    </div>
                                  </button>
                                )
                              ) : (
                                <div className="mt-6 rounded-3xl">
                                  <ConnectButton label="Connect Wallet" />
                                </div>
                              )}
                            </div>
                            <div className={style.infoRight}>
                              <div className="text-xs font-normal text-black">
                                TOKEN
                              </div>
                              <div className="relative w-[20rem]">
                                <Image className={style.img} src={token} />
                                <div className="absolute bottom-3 left-1 text-xs font-thin text-[#fafaf9]">
                                  ID :#21 *{' '}
                                  {(100 / totalSupply).toString().slice(0, 3)}%
                                  share * 10,000 estimated credits
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={style.glowDivBox}>
                <div className={style.glowDiv}></div>
                <div className="relative h-[full] w-[95%] items-center justify-center  divide-x divide-gray-600 rounded-lg bg-[#fafaf9] px-7  py-9 leading-none lg:w-full">
                  <div className={style.details}>
                    <span className="relative flex items-center rounded-xl">
                      <Image
                        className={style.img}
                        src={logoSoon}
                        height={1200}
                      />
                      <button className={style.floatButton}>
                        <div className="flex">
                          SignUp For WaitList &nbsp;&nbsp;
                          <BsArrowRight size={20} />
                        </div>
                      </button>
                      <div>
                        <div className={style.ghanaButton}>
                          Madagascar, East Africa
                        </div>
                        <div className="absolute bottom-14 left-5 mt-10 text-lg font-bold text-[#fafaf9] lg:text-5xl">
                          Coming Soon...
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
function wait(tx: any) {
  throw new Error('Function not implemented.')
}
