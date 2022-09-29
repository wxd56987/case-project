import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';

const Web3: NextPage= () => {
  const router = useRouter()
  const { add, id } = router.query
  const handleOpenPlokadot = async () => {
    if (add) {
      axios.post(`https://api.admeta.network/admeta/recordAdCompleted`, {
        walletAddress: add,
        advertisementId: id
      }).then(() => {
        router.push('https://app.admeta.network/ad-display?rd=23nqw343')
      })
    } else {
      router.push('https://app.admeta.network/ad-display?rd=23nqw343')
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Web3</title>
        <meta name="description" content="web3 ecology" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="web3">
        <div className="brand">
          <div className="title">Trustworthy</div>
          <div className="title">Innovative</div>
          <div className="title">Humanistic</div>
          <div
            className="btn"
            onClick={handleOpenPlokadot}
          >
            <p>Ad completed</p>
          </div>
        </div>
        <div className="circle"></div>
      </div>

      <div className="footer">
        Powered by Web3 Ecology
      </div>
    </div>
  )
}
export default Web3