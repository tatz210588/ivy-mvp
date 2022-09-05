import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Image from 'next/image'
import logo from '../assets/ivy.png'
import toast, { Toaster } from 'react-hot-toast'
// import PhoneInput from 'react-phone-number-input'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FcSettings } from 'react-icons/fc'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineQrcode } from 'react-icons/ai'
import { BsCashCoin } from 'react-icons/bs'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { FaRegAddressCard } from 'react-icons/fa'
import { chain } from 'wagmi'
import { useAccount, useNetwork } from 'wagmi'
import { getConfigByChain } from '../config'
import CarbonNFT from '../artifacts/contracts/CarbonNFT.sol/CarbonNFT.json'
import { ellipseAddress } from './utils'

const style = {
  wrapper: `flex flex-wrap items-end content-around bg-[#ffffff] px-[1.2rem] p-1 `,
  logoContainer: `flex items-center lg:py-4 flex-shrink-0 text-[#ffffff] mr-6 cursor-pointer`,
  logoText: ` ml-[0.8rem] font-semibold text-2xl tracking-tight text-[#000000]`,
  headerItemsTab: `w-full  block flex-grow lg:flex lg:items-center lg:w-auto`,
  headerItems: `text-md lg:flex items-center font-bold lg:flex-grow mt-2`,
  headerItem: `block mt-4 lg:inline-block lg:text-right lg:mt-0 lg:mb-2 py-2 text-[#000000] hover:text-[#81817C] mr-6 cursor-pointer`,
  headerIcon: `block lg:inline-block lg:mt-0 text-[#ffffff]  text-3xl hover:text-[#81817C] mr-4 cursor-pointer focus:outline-none`,
  img: `fill-current h-8 w-8 mr-2`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  infoRight: `flex-0.4 text-right`,
}

const Header = () => {
  const { data } = useAccount()
  const { activeChain } = useNetwork()
  const [admin, setAdmin] = useState<any>()
  const [openMenu, setOpenMenu] = React.useState(true)

  const handleBtnClick = () => {
    setOpenMenu(!openMenu)
  }

  useEffect(() => {
    if (!window.ethereum) {
      toast.error(
        'Install a crypto wallet(ex: Metamask, Coinbase, etc..) to proceed'
      )
    } else if (!activeChain) {
      toast.error('Connect Your Wallet.')
    } else {
      toast.success(`Welcome ${ellipseAddress(data?.address)} !!`)
      getAdmin()
    }
  }, [data?.address, activeChain])

  async function getAdmin() {
    await (window as any).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
    const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
    const signer = provider.getSigner()
    const network = await provider.getNetwork()

    const contractTx = new ethers.Contract(
      getConfigByChain(network.chainId)[0].contractProxyAddress,
      CarbonNFT.abi,
      signer
    )
    const tx = await contractTx.owner()
    setAdmin(tx) //comment this line to withdraw admin restrictions
    //setAdmin(tx) //comment this line to restrict admin access
  }

  return (
    <nav className="flex flex-wrap items-center justify-between bg-[#fafaf9] px-2">
      <Toaster position="top-center" reverseOrder={false} />
      <Link href="/">
        <div className="mr-6 ml-5 flex flex-shrink-0 cursor-pointer items-center text-white">
          <Image className={style.img} src={logo} height={50} width={100} />
        </div>
      </Link>

      <div className="">
        {openMenu && (
          <div className={style.headerItemsTab}>
            {data?.address === admin && data ? (
              <Link href="/admin">
                <div className={style.headerItem}>Control Panel</div>
              </Link>
            ) : (
              <div className={style.headerItem}></div>
            )}
            <div className={`justify-end text-sm `}>
              <ConnectButton chainStatus="icon" />
            </div>
          </div>
        )}
      </div>
      {/* <div className="block lg:hidden">
        <button onClick={handleBtnClick} className="flex items-center px-3 py-2 border rounded text-[#ffffff] border-[#ffffff] hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div> */}
    </nav>
  )
}

export default Header
