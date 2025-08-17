import React, { useContext } from 'react'
import './front.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'

function front() {

  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

  return (
    <div className='main'>
      <div className="nav">
        <p>GEMINI</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

        {!showResult
        ?<>
        <div className="greet">
          <p><span>HELLO, Sam.</span></p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest beautiful place is search</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Sumarize the concept</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Brainstorm team bonding activities</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>improve the readibility of code</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        </>
        :
        <div className="result">
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img className={loading ? "blinking-icon" : ""} src={assets.gemini_icon} alt="" />
            {loading
            ? 
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
            :
              <p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }

          </div>
        </div>
        
        }

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' 
               onKeyDown={(e) => {
               if (e.key === "Enter") {
               onSent();}
               }}/>
            <div>
              <img src={assets.gallery_icon} alt="" /> 
              <img src={assets.mic_icon} alt="" />
              {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, So double check it.......
          </p>
        </div>
      </div>
      
    </div>
  )
}

export default front

