import express, { raw } from 'express'
import * as dotenv from 'dotenv'
import axios from 'axios'
import OpenAI from 'openai'

dotenv.config()

const router = express.Router()

// 工具函数：下载图片并转为base64
async function imageUrlToBase64(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  return Buffer.from(response.data, 'binary').toString('base64')
}

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }
    
    const openai = new OpenAI({
      apiKey: process.env.LAOZHANG_API_KEY,
      baseURL: "https://api.laozhang.ai/v1"
    });
    
    const response = await openai.images.generate({
      prompt: prompt,
      model:"dall-e-3",
      n: 1,
      size: "1024x1024",
    })
    console.log("response:",response.data)
    // 优先用base64
    const result = response.data?.[0]
    if(result?.b64_json){
      res.status(200).json({photo : result.b64_json})
    }else if(result?.url){
      const base64Image = await imageUrlToBase64(result.url)
      res.status(200).json({ photo: base64Image })
    }else{
      res.status(500).json({error:'API 未返回图片数据',raw:response.data})
    }
  } catch (error) {
    console.error('图片生成失败:', error.message)
    if (error.response) {
      console.error('老张AI响应:', error.response.data)
      res.status(500).json({
        error: '图片生成失败',
        details: error.message,
        laozhang: error.response.data
      })
    } else {
      res.status(500).json({
        error: '图片生成失败',
        details: error.message
      })
    }
  }
})

export default router
