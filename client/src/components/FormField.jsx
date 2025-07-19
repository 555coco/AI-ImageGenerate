import React from 'react'

const FormField = ({labelName,type,name,placeholder,value,handleChange,isRandom,handleRandom}) => {
  return (
    <div className='mt-8 ml-8'>
      <div className='flex'>
          <h1 className='font-bold'>{labelName}</h1>
          {isRandom && (
            <button className='btn ml-4 h-8 mb-1'
                    onClick={handleRandom}>
                随机生成
            </button>
          )}
      </div>
      <input className='input mt-1 bg-white/40 text-xs w-100' 
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