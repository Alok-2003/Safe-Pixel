import useWeb3Context from "../contexts/useWeb3Context";

const ConnectedAccount = () => {
    const { web3State } = useWeb3Context();
    const { selectedAccount } = web3State;

    return (
        <div className="flex items-center justify-center w-full md:w-auto text-2xl">
            <p className="font-bold text-white">Connected Account:</p>
            <p className="ml-2 text-gray-200">{selectedAccount}</p>
        </div>
    );
}

export default ConnectedAccount;
