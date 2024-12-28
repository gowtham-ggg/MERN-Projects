import React from 'react';
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center my-20'>
      <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
        <p>AI-Powered Text-to-Image Generator</p>
        <img src={assets.star_icon} alt="star" className='w-5' />
      </div>

      <h1 className='text-4xl max-w-[500px] sm:text-7xl  mx-auto mt-10 text-center'>
        Turn Your Ideas Into <span className='text-blue-600'>Images</span> in Seconds!
      </h1>

      <p className='text-center max-w-xl mx-auto mt-5 text-stone-500'>
        Create stunning visuals with just a description—experience the power of AI that turns your words into art.
      </p>
      <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>
        Generate Images 
        <img src={assets.star_group} alt="star" className='h-6'/>
      </button>

      <div className='flex flex-wrap justify-center mt-16 gap-3'> 
        {Array(6).fill('').map((item, index)=>(
            <img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
             src={index%2 ==0 ? assets.sample_img_1 : assets.sample_img_2}
              alt='images'
              key={index} width={70}/>
        ))}
      </div>

      <p className='mt-2 text-neutral-600'>Genrated Images From Imagify</p>
    </div>
  );
};

export default Header;
