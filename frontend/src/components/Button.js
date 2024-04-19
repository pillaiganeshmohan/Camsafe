import React from 'react'
import styles from './LoginSignup.module.css'
import {Link} from 'react-router-dom'

function Button({name, onClick}) {
  return (
    <div className='w-full flex justify-center'>
      <Link onClick={onClick} class="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
      <span class="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 group-hover:from-pink-700 group-hover:via-purple-600 group-hover:to-blue-600  absolute"></span>
      <span class="relative px-7 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
      <span class="relative text-white">{name}</span>
      </span>
      </Link>
      </div>
  )
}

export default Button