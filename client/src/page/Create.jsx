import React, { useEffect, useState } from 'react'
import BackGround from '../assets/bg2.jpg'
import Navbar from '../components/Navbar'
import FormField from '../components/FormField'
import prompts from '../constant/index'
import { HiOutlinePhoto } from "react-icons/hi2";
import Loader from '../components/Loader'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPhoto } from '../store'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const photoState = useSelector(state => state.image.photo)//photo的状态，我希望在转换路由回来时photo还能保存不用重新生成图片
  const dispatch = useDispatch()

  const [form,setForm] = useState({
    name:'',
    prompt:'',
    photo:''
  })//表单元素

  const [generatingImage,setGeneratingImage] = useState(false)//当按下生成按钮时变成true，展示Loader组件
  
  useEffect(() => {
    const savedPhoto = localStorage.getItem('ai_image_photo')
    const savedName = localStorage.getItem('name')
    const savedPrompt = localStorage.getItem('ai_prompt')
    if (savedPhoto) {
      setForm(f => ({ ...f, photo: savedPhoto, name: savedName, prompt: savedPrompt }))
      dispatch(setPhoto(savedPhoto))
    }
  }, [dispatch])

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleRandom = () => {
    const randomPromt = prompts[Math.floor(Math.random() * prompts.length)]
    setForm({...form,prompt:randomPromt})
  }//在prompts里随机找一条promt

  const generateImage = async () => {
    if(form.prompt){
      try {
        setGeneratingImage(true)

        const response = await axios.post("https://ai-imagegenerate.onrender.com/api/sd",{
          prompt:form.prompt
        })//向后端sd api发送prompt调用dall-e返回Base_64格式的图片

        
        setForm({...form, photo:`data:image/jpeg;base64,${response.data.photo}`})//渲染到表单
        dispatch(setPhoto(`data:image/jpeg;base64,${response.data.photo}`))//保存到状态
        localStorage.setItem('ai_image_photo', `data:image/jpeg;base64,${response.data.photo}`)
        localStorage.setItem('ai_prompt', form.prompt)
        localStorage.setItem('name', form.name)
      } catch (error) {
        console.error('Error generating image:', error)
        
        let errorMessage = 'Failed to generate image'
        
        if (error.response) {
          // Server responded with error status
          const { error: serverError, details } = error.response.data
          errorMessage = serverError || errorMessage
          if (details) {
            errorMessage += `: ${details}`
          }
        } else if (error.request) {
          // Network error
          errorMessage = 'Network error. Please check your connection and try again.'
        } else {
          // Other error
          errorMessage = error.message || errorMessage
        }
        
        alert(errorMessage)
      }finally{
        setGeneratingImage(false)
      }
    } else {
      alert('Please enter a prompt first')
    }
  }

  const showInTheCommunity = async (e) => {
    e.preventDefault()
    if(!form.name){
      alert("You need to give your name")
    }
    if(form.photo){
      setLoading(true)
      try {
        const responce = await axios.post("http://localhost:8080/api/post/",form)
        alert("success")
        navigate("/")
      } catch (error) {
        alert(error)
      } finally{
        setLoading(false)
      }
    }else{
      alert("You must generate the photo before you share it")
    }
  }

  const handleDownload = () => {
    if(!photoState){
      alert('请先生成图片！')
      return
    }
    const link = document.createElement('a')
    link.href = photoState
    link.download =  `ai-image-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className='min-h-screen flex flex-col md:grid md:grid-cols-2'
          style={{backgroundImage:`url(${BackGround})`,
                   width:'100%',
                   height:'100%',
                   backgroundSize:'cover',
                   backgroundPosition:'center',
                   backgroundRepeat:'no-repeat',
                   }}>
      <div className=''>
          <Navbar />
          <div>
            <h1 className='pt-30 ml-8 font-bold text-5xl'>Create</h1>
            <p className='text-sm mt-3 ml-8 text-white/70'>你可以在这个页面创建属于自己的具有想象力的照片并且可以分享到社区或者下载</p>
          </div>
          <FormField labelName="Your Name"
                      type="text"
                      placeholder="黄伟业"
                      name="name"
                      value={form.name}
                      handleChange={handleChange} />
          <FormField labelName="Prompt(需求)"
                      type="text"
                      placeholder="a big dinosaur"
                      name="prompt"
                      value={form.prompt}
                      handleChange={handleChange}
                      isRandom={true}
                      handleRandom={handleRandom} />
          <button className='btn mx-auto mt-8 w-80 ml-15 bg-purple-500 hover:bg-purple-800'
                    onClick={generateImage}>{generatingImage ? "Generating right now..." :"Generate the Image"}</button>
      
      </div>
      <div className='md:absolute md:right-20 md:top-40'>
          <div className='relative rounded-2xl bg-gray-400 aspect-square h-70 flex items-center justify-center'>
                {photoState ? (
                  <img src={photoState}
                        alt={form.prompt}
                        className='h-full w-full' />
                ) : (
                  <HiOutlinePhoto className='absolute text-9xl opacity-50'/>
                )}

                {generatingImage && (
                  <div className='absolute top-32 left-32'>
                    <Loader />
                  </div>
                )}
          </div>
          <div className='flex flex-col items-center justify-center'>
            <button className='btn w-60 mt-8 bg-blue-600 ' 
                    onClick={showInTheCommunity}>
                      {loading ? "Showing right now..." : "Show In The Community"}
                      {loading ? (<div className='ml-2'><Loader /></div>) : (<></>)}
            </button>
            <button className='btn w-60 mt-3 bg-green-600'
                    onClick={handleDownload}>
                      DownLoad
            </button>
          </div>
      </div>
    </div>
  )
}

export default Create
