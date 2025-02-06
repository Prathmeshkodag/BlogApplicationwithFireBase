import React from 'react'
import AddblogFrom from './addBlogfrom';
import Bloglist from './bloglist';

 function Home() {
  return (
    <>
     
      <div className='home' style={{display:'flex'}} >
        <div  className='addblog' style={{width:'40%'}}>
           <AddblogFrom/>
        </div>
        <div className='bloglist' style={{width:'60%'}}>
           <Bloglist/>
        </div>

      </div>
    </>

  )
};


export default Home;
