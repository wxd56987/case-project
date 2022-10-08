import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';
import { Steps, message } from 'antd';
import { useState } from 'react';

const { Step } = Steps;

const Web3: NextPage = () => {

  const [connect, setConnect] = useState(false)
  const [step, setStep] = useState(0)
  const [address, setAddress] = useState('')

  const router = useRouter()
  const { add, id } = router.query
  const handleToClaim = async () => {
    if (add) {
      axios.post(`https://api.admeta.network/admeta/recordAdCompleted`, {
        walletAddress: add,
        advertisementId: id
      }).then(() => {
        window.open('https://app.admeta.network/ad-display?rd=23nqw343', '_blank')
      })
    } else {
      window.open('https://app.admeta.network/ad-display?rd=23nqw343', '_blank')
    }
  }

  const stepDom = () => (
    <Steps current={step} labelPlacement="vertical">
      <Step title="Connect Wallet" description="First connect wallet." />
      <Step title="Go Telegram" description="Go telegram and browse Admeta." />
      <Step title="Claim rewards" description="Go Admeta claim rewards." />
    </Steps>
  )

  const handleConnectMetamask = () => {
    const w = window as any
    if (typeof w.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      w.ethereum.request({ method: 'eth_requestAccounts' }).then((a: any) => {
        setAddress(a[0])
        setConnect(true)
        setStep(1)
      });
    } else {
      message.error('Please first install metamask extenison on your pc')
    }
  }

  const formatAddress = (address: string): string => {
    const str_1 = address.substring(0, 5)
    const str_2 = address.substring(address.length - 4)
    return `${str_1}......${str_2}`
  }

  return (
    <div className="container">
      <Head>
        <title>Web3</title>
        <meta name="description" content="web3 ecology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="web3">
        <div className='w-screen flex fiexd top-0 left-0 right-0 h-20 pl-8 pr-8 justify-between items-center'>
          <div className='text-3xl italic font-bold text-white'>Admeta Web3 Case</div>
          {
            connect
              ?
              <div className='pl-4 pr-4 pt-2 pb-2 rounded-full border-blue-600 border-2'>
                <div className='text-base text-white font-bold'>{formatAddress(address)}</div>
              </div>
              :
              <div
                onClick={handleConnectMetamask}
                className='bg-blue-600 pl-4 pr-4 pt-2 pb-2 rounded-full cursor-pointer hover:bg-blue-700 font-bold'>
                <div className='text-white'>Connect wallet</div>
              </div>
          }
        </div>
        <div className='w-full pt-8 pb-8 main-title text-center text-5xl font-bold mb-20 mt-20'>
          Complete the following tasks to get rewards
        </div>
        <div className='pl-20 pr-20 mb-20'>
          {stepDom()}
        </div>

        <div className='w-full flex justify-center items-center'>
          {
            step === 0
            &&
            <div
              onClick={handleConnectMetamask}
              className='text pl-8 pr-8 hover:bg-blue-700 bg-blue-600 pt-4 pb-4 rounded-full cursor-pointer text-white font-bold'>
              Connect Wallet
            </div>
          }

          {
            step === 1
            &&
            <div
              onClick={() => {
                window.open('https://t.me/admetanetwork', '_blank')
                setStep(2)
              }}
              className='text pl-8 pr-8 hover:bg-blue-700 bg-blue-600 pt-4 pb-4 rounded-full cursor-pointer text-white font-bold'>
              Go telegram
            </div>
          }

          {
            step === 2
            &&
            <div
              onClick={() => {
                handleToClaim()
                setStep(3)
              }}
              className='text pl-8 pr-8 hover:bg-blue-700 bg-blue-600 pt-4 pb-4 rounded-full cursor-pointer text-white font-bold'>
              Claim rewards
            </div>
          }
        </div>
      </div>

      <div className="footer">
        Powered by Web3 Ecology
      </div>
    </div>
  )
}
export default Web3