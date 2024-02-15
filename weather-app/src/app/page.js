'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import Image from 'next/image';
import Weather from './components/Weather';
import ClipLoader from "react-spinners/ClipLoader";

const Page = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/35 z-[1]' />

      {/* Background-image */}
      <Image src='https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' layout='fill' className='object-cover' />

      {/* Search */}
      <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10'>
        <form className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl' onSubmit={(e) => { e.preventDefault(); fetchWeather(); }}>
          <div>
            <input className='bg-transparent text-white border-none focus:outline-none  placeholder:text-white' type='text' placeholder='Search city' onChange={(e) => setCity(e.target.value)} value={city} />
          </div>
          <button type="submit"><BsSearch size={20} /></button>
        </form>
      </div>

      {/* Weather */}
      {loading ? (
        <div className="flex justify-center mt-4">
          <ClipLoader color="#ffffff" loading={loading} size={35} />
        </div>
      ) : (
        weather.main && <Weather data={weather} />
      )}
    </>
  );
};

export default Page;
