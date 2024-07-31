import { useEffect } from "react";
import useWeb3Context from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom"


const Wallet = () => {
    const navigateTo = useNavigate()
    const { updateWeb3State, web3State } = useWeb3Context()
    const { selectedAccount } = web3State;
    useEffect(() => {
        if (selectedAccount) {
            navigateTo("/home");
        }
    }, [selectedAccount, navigateTo]);
    const handleWalletConnection = async () => {
        const { contractInstance, selectedAccount } = await connectWallet();
        updateWeb3State({ contractInstance, selectedAccount })
    }
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#767676_1px,transparent_1px),linear-gradient(to_bottom,#767676_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_600px_at_50%_400px,#3838389e,transparent)] flex flex-col justify-center items-center gap-10">
                <h1 className="font-bold text-[42px] gradient-text md:text-[60px]">
                    Crypted Vault
                </h1>
                <p className="text-center text-white font-semibold text-[18px] md:text-[24px] max-w-3xl">
                    Securely store and manage your images on the blockchain. With Crypted Vault, your images are encrypted and stored in a decentralized manner, ensuring maximum privacy and security.
                </p>
                <button
                    className="relative px-12 py-4 text-black bg-white rounded-md hover:bg-gray-200 font-semibold"
                    onClick={handleWalletConnection}
                >
                    Connect Wallet
                </button>
            </div>

        </div>
    );
}

export default Wallet;