import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context';


function sidebar() {

const[extended , setExtended] = useState(false);
const{onSent, prevPrompts, setRecentPrompt, newchat} = useContext(Context);

const loadPrompt = async(prompt) => {
  setRecentPrompt(prompt);
  await onSent(prompt)
  }

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={()=> setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
        <div onClick={()=>newchat()} className="newchat">
            <img src={assets.plus_icon} alt="" />
            {extended?<p className='NC' >New Chat</p>:null}
        </div>
        {extended?
        <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) =>{
              return(
                 <div onClick={()=>loadPrompt(item)} key={index} className="recent-entry" >
                    <img src={assets.message_icon} alt="" />
                    {extended && <span>{item.slice(0,18)}</span>}
            </div>
              )
            })}
          
        </div>
        :null
        }
        
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended?<p>HELP</p>:null}
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended?<p>History</p>:null}
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  )
}

export default sidebar
