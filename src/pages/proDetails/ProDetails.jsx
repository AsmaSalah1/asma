import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Style from "./proDetails.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {  Bounce, toast } from 'react-toastify';

import "swiper/css/navigation";
import "./proDetails.module.css";
import { Pagination, Navigation } from "swiper/modules";
import Loader from "../../component/loader/Loader";
//import './style.css'
import { UserContext } from '../../contex/User';


function ProDetails() {
  const {userName}=useContext(UserContext);

  const [details, setDetails] = useState([]);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [loader,setLoader] = useState(false);
  const getDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search); //بترجعلي الراميترز الموجودة بالرابط
    const id = urlParams.get("id"); //بتجيب الاي دي
    // console.log("id=",id);
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    );
    // console.log("data",data.product.subImages  );
    await setDetails(data.product);//عشان بوخد وقت تا يجيب الداتا 
    // console.log("rev",data.product.reviews);
    setReviews(data.product.reviews);
    setImages(data.product.subImages);
    setLoader(true);
  };
  const addToCart =async(productId)=>{
    try{
    const token=localStorage.getItem('userToken');
        const {data}= await axios.post( `${import.meta.env.VITE_API_URL}/cart`,{
      productId },{
        headers: {
          Authorization:`Tariq__${token}`        }
      })
      console.log(data);
      toast.success('The product has been added successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    catch(err){
     if(err.response.data.message=='product already exists'){
      toast.error('product already exists in your cart', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        // theme: "dark",

      });
    }

}
      
     }
    
 
  useEffect(() => {
    getDetails();
  }, []);
  if(!loader){
    return <Loader/>
    
  }
  return (
    <>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        effect={"coverflow"}
        grabCursor={true}
        navigation={true}
        slidesPerView={1}
        modules={[Pagination, Navigation]}
        className={`mySwiper ${Style.mySwiper} `}
      >
        {images.map((img) => (
          <SwiperSlide className={Style.swiperslide} key="public_id">
            <img className={Style.img2} src={img.secure_url} alt="..." />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className= {`btn btn-outline-secondary
       ${Style.addCart}`} onClick={()=>addToCart(details._id)}  disabled={userName?'':'disabled'} >
        {userName? 'Add to Cart' :'You must log in to add to the cart '}
        </button>

      <div className={Style.boddy}>
        {/* <div className={Style.img}>
  {images.map((img)=>(
    <img  className={Style.img2} key="1"src={img.secure_url}  alt="..." />
  ))}
 
  </div> */}

        {/* <img src={details.mainImage.secure_url}/> */}
        <div className={` ${Style.descrip} `}>
          <h4>{details.name}</h4>
          <p className="card-body">{details.description}</p>
        </div>

        <div className="d-flex justify-content-center pt-3 pb-2">
          {" "}
          <input
            type="text"
            name="text"
            placeholder="+ Add a note"
            className="form-control addtxt"
          />{" "}
        </div>
        {/* card */}
        <div className="d-flex flex-wrap   border-left border-right">
          {reviews.map((rev) => (
            <div className={`d-flex py-2   ${Style.k}`} key={rev._id}>
              <div className={`second py-2 px-2 ${Style.k2}`}>
                {" "}
                <span className="text1">Customer opinion : {rev.comment}</span>
                <div className="d-flex ">
                  <img src="https://i.imgur.com/AgAC1Is.jpg" width={18} />
                  <span className="text2"> Martha</span>
                </div>
                <div>
                  <span className="text3">Customer rating : {rev.rating}</span>
                </div>
              </div>
            </div>
            // <div className='reviews btn bg-sucsess' key={rev._id}>
            // <p>Customer opinion:{rev.comment}</p>
            // <p>Customer rating:{rev.rating}</p>
            //   </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProDetails;
