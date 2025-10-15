import React from 'react'

const FormField = ({labelName,type,name,placeholder,value,handleChange,isRandom,handleRandom}) => {
  return (
    <div className='mt-8 ml-8'>
      <div className='flex'>
          <h1 className='font-bold text-white/60 dark:text-gray-100'>{labelName}</h1>
          {isRandom && (
            <button className='btn ml-4 h-8 mb-1'
                    onClick={handleRandom}>
                随机生成
            </button>
          )}
      </div>
      <input className='input mt-1 bg-white/80 dark:bg-white/10 text-xs w-100 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-300' 
                type={type} 
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange} ></input>
    </div>
  )
}

export default FormField