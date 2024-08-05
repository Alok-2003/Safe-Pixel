import axios from "axios";
import { useState } from "react";
import useWeb3Context from "../contexts/useWeb3Context";
import toast from "react-hot-toast";
import { ImageUp } from "lucide-react";
const UploadImage = () => {
    const [file, setFile] = useState(null);
    const { web3State } = useWeb3Context();
    const { selectedAccount, contractInstance } = web3State;
    const [loading, setLoading] = useState(false);

    const uploadImageHash = async (ipfsHash) => {
        const tx = await contractInstance.uploadFile(selectedAccount, ipfsHash)
        console.log(tx)
        await toast.promise(tx.wait(), {
            loading: "Transaction is pending",
            success: "Transaction is successful",
            error: "Transaction failed"
        })
    }

    const handleImageUpload = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("file", file);
            const url = `http://localhost:3000/api/uploadImage`
            const token = localStorage.getItem("token")

            const config = {
                headers: {
                    "x-access-token": token
                }
            }
            const res = await axios.post(url, formData, config);
            toast.success("Image Uploaded")
            await uploadImageHash(res.data.ipfsHash);
            setLoading(false)
            // console.log(res.data.ipfsHash)
        } catch (error) {
            console.log(error)
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }
    console.log(file)
    return (
        <>
            <div className="h-[70%] w-screen flex flex-col justify-center items-center gap-6 bg-black text-white">
                <p className="font-bold md:text-3xl text-center">
                    Upload file with Web3's Security
                </p>
                <div className="w-full flex justify-center items-center">
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-[200px] md:w-[230px] bg-gray-800 text-white border border-gray-700 rounded p-2"
                    />
                </div>
                {file ? (
                    <button
                        onClick={handleImageUpload}
                        disabled={loading}
                        className="border-sky-400 border-dotted p-3 px-4 border-2 rounded-md flex  justify-center items-center hover:bg-sky-700 hover:text-white disabled:opacity-50 text-2xl"
                    >
                        <ImageUp className="mb mr-2 " />
                        {loading ? "Uploading..." : "Upload"  }
                    </button>
                ) : (
                    <p className="text-[20px] font-semibold text-gray-400">
                        *Choose a File To Upload
                    </p>
                )}

                <br />
            </div>


        </>
    );
}

export default UploadImage;