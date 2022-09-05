import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { WagmiConfig, configureChains, chain, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
  wallet,
  Chain,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
)

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      wallet.rainbow({ chains }),
      wallet.walletConnect({ chains }),
      wallet.metaMask({ chains }),
      wallet.trust({ chains }),
      wallet.argent({ chains }),
      wallet.coinbase({ appName: 'My App', chains }),
      wallet.brave({ chains }),
      wallet.steak({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const Home = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme()}
        coolMode
        showRecentTransactions={true}
      >
        <Header />
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
        <Footer />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Home
