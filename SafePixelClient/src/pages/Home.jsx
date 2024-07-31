import React, { useState } from 'react'
import useWeb3Context from '../contexts/useWeb3Context'
import UploadImage from '../components/UploadImage';
import GetImage from '../components/GetImage';

const Home = () => {
  const { web3State } = useWeb3Context()
  const { selectedAccount } = web3State;
  // console.log(selectedAccount)
  const [reload,setReload]=useState(false)
    const reloadEffect=()=>{
      setReload(!reload)
    }
  return (
    <div className=" h-full w-screen flex bg-black flex-col justify-center items-center   ">
      <UploadImage reloadEffect={reloadEffect}/>
      <GetImage reload={reload} />
    </div>
  )
}

export default Home