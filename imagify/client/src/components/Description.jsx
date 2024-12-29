import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';


const Description = () => {
  return (
    <motion.div 
    initial={{ opacity: 0.2, y:100 }}
    transition={{duration:1}}
    whileInView={{opacity :1, y:0}}
    viewport={{once : true}}
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn Your Imagination Into Visuals</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt="sample" className='w-80 xl:w-96 rounded-lg' />
        <div>
          <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI Text to Image Generator</h2>
          <p className='text-gray-600 mb-4'>
            Our tool is the ultimate solution for turning your ideas into incredible visuals. With just a few words, you can 
            generate stunning, high-quality images that truly capture your imagination. It's fast, easy to use, and delivers 
            amazing results every time. Whether you're looking to create art, enhance your projects, or simply explore your 
            creativity, our AI generator is here to help. Experience the perfect combination of technology and creativity 
            with our best-in-class tool. Start creating visuals that stand out and leave a lasting impression!
          </p>
          <p className='text-gray-600 '>
            Simply type in a text prompt, and our AI will do the rest. From product visuals to high-quality images, 
            everything is powered by advanced AI technology to ensure exceptional results tailored to your needs.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
