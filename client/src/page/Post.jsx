import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import BackGround from '../assets/bg2.jpg'
import Loader from '../components/Loader';
import Card from '../components/Card';
import axios, { all } from 'axios';
import Masonry from 'react-masonry-css';

const RenderCards = ({data,title}) => {
  if(data?.length>0){
    return(
      data.map((post) => <Card key={post._id} {...post} />)
    )
  }
  return (
    <h2 className='font-bold'>{title}</h2>
  )
}

const Post = () => {

  useEffect(() => {
    const fetchPosts = async() => {
      setLoading(true)
      try {
        const response = await axios.get("https://ai-imagegenerate.onrender.com/api/post/")

          setAllPosts(response.data.data.reverse())
          console.log("AllPost:",allPosts)

      } catch (error) {
        console.log("error:",error)
        alert(error)
      } finally{
        setLoading(false)
      }
    }

    fetchPosts()
  },[])

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const handleSearchChange = (e) => {
    setLoading(true)
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
        setLoading(false)
      }, 500),
    );
  };



  return (
    <div className='min-h-screen' 
         style={{backgroundImage:`url(${BackGround})`,
                 width:'100%',
                 height:'100%',
                 backgroundSize:'cover',
                 backgroundPosition:'center',
                 backgroundRepeat:'no-repeat',
                 }}>
        <Navbar />
        <div className='pt-23'>
            <h1 className='font-extrabold text-4xl ml-20'>The Community Showcase</h1>
            <p className='mt-2 ml-20 text-white/70'>You can post and download pictures that you're interested in this page</p>
            <div className='mt-4 ml-20'>
              <input className='input w-100 text-purple-200 border-purple-400 border-2'
                      placeholder='you can search photos in here'
                      onChange={handleSearchChange}
                      value={searchText} />
              <div className='mt-4 font-bold text-2xl'>
                {loading ? (<Loader />) 
                          : (
                         <>
                            {searchText && (<h1>Showing Results for <span className='font-extrabold text-pink-700'>{searchText}</span></h1>)}
                            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-4 mr-5'>
                                  {searchText ? (<RenderCards data={searchedResults} titile="No Search Results found" />)
                                              : (<RenderCards data={allPosts} title="No Posts Yet" />)
                                  }
                            </div>
                            
                         </> 


                          )}
              </div>
            </div>
        </div>
    </div>
  )
}

export default Post
