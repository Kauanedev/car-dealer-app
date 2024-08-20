"use client"

import React from 'react'
import image from 'next/image'
import CustomButton from './CustomButton'

const Hero = () => {

  const handleScroll = () => {

  };

  return (
    <div className='hero'>
        <div className="flex-1 pt-36 padding-x">
            <h1 className='hero__title'>Find, Book, or Own Your Next Car</h1>
            <p className='hero__subtitle'>Discover the best deals and offer your dream car today!</p>

        <CustomButton
        title="Explore Cars"
        containerStyles="bg-primary-blue text-white rounded-full mt-10"
        handleClick={handleScroll}
        />
        </div>
    </div>
  )
}

export default Hero