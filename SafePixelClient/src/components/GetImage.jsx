import axios from "axios";
import  useWeb3Context  from "../contexts/useWeb3Context";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast"
import { CircleArrowLeft,CircleArrowRight } from "lucide-react";
const GetImage = ({reload}) => {
    const [currentPage,setCurrentPage]=useState(1)
    const [imagePerPage,setImagePerPage]=useState(2);
    const [images,setImages]=useState([])
    const [loading,setLoading]=useState(false)
    const {web3State}=useWeb3Context()
    const {selectedAccount,contractInstance}=web3State;
    
    useEffect(()=>{
        try {
            const getImageHashes=async()=>{
               const ipfsHashes = await contractInstance.viewFiles(selectedAccount)
               return ipfsHashes;
            }
            const getImage=async()=>{
              setLoading(true)
              const ipfsHashes = await getImageHashes()
              const ipfsHashArray = Object.values(ipfsHashes)
        console.log(ipfsHashArray)
              const url=`http://localhost:3000/api/getImage?page=${currentPage}&limit=${imagePerPage}`
              const token = localStorage.getItem("token")
              const config={
                headers:{
                    "x-access-token":token
                }
              }
              const res = await axios.post(url,ipfsHashArray,config)
              const imagesData = res.data.depcryptedImageArr;
              console.log(imagesData)
              setImages(imagesData)
              setLoading(false)
            }
            contractInstance && getImage()
        } catch (error) {
            toast.error("Error Fetching Images")
        }finally{
            setLoading(false)
        }
       
    },[contractInstance,currentPage, imagePerPage,selectedAccount,reload])

    const paginate = (pageNumber)=>setCurrentPage(pageNumber)
    return (<>
    {  !loading?(
        images.length>0?
        (
         <div className="flex justify-start md:justify-center bg-black items-center w-full h-full  overflow-x-auto">
            {images.map((imgData, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${imgData}`}
                alt={`Image ${index + 1}`}
                className="w-[500px] h-[340px]  mx-4 border-2 border-white/20 object-cover"
              />
            ))}
          </div>
        )
        :(
        <div className='h-full flex justify-center items-center' >
            <p className='text-5xl font-bold text-white text-center' >No images found</p>
        </div>
        )):<p>Loading...</p>
     }
    <div className="w-full h-20 flex justify-center bg-black  items-center gap-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          <CircleArrowLeft className="w-8 h-8 opacity-80 text-white" />
        </button>
        <span className="font-bold text-[24px] text-white">{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={loading}>
          <CircleArrowRight className="w-8 h-8 opacity-80 text-white" />
        </button>
      </div>
   
    </>);
}
 
export default GetImage;