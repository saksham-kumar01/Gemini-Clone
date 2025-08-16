import { createContext } from "react";
import { runGemini } from "../config/gemini";
import React, { useState } from 'react';


export const Context = createContext();

const ContextProvider = (props) => {

    const[input, setInput] = useState("");
    const[recentPrompt, setRecentPrompt] = useState("");
    const[prevPrompts, setPrevPrompts] = useState([]);
    const[showResult, setShowResult] = useState(false);
    const[loading, setLoading] = useState(false);
    const[resultData, setResultData] = useState("");
    
    const delayPara = (index, nextWord) => {
       setTimeout(() => {
        setResultData(prev => prev + nextWord);
       }, 75*index);
    }

     const newchat=() => {
        setLoading(false)
        setShowResult(false)
     }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response = "";
        if(prompt !== undefined) {
            response = await runGemini(prompt);
            setRecentPrompt(prompt);
        }
        else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await runGemini(input)
        }

        
        let responseArray = response.split("**");
        let newResponse = "";
        for( let i=0; i<responseArray.length; i++)
        {
            if(i === 0 || i%2 !==1){
                newResponse += responseArray[i];
                }
            else{
                 newResponse  += "<b>" + responseArray[i] + "</b>";
                }
        }

        let newResponse2 = newResponse.split("*").join("<br/>");

        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i] + " ";
            delayPara(i, nextWord+" ");
        }
        setLoading(false)
        setInput("")
    }


    const contextValue = {       
       setPrevPrompts,
       onSent,
       prevPrompts,
       setRecentPrompt,
       recentPrompt,
       showResult,
       loading,
       resultData,
       input,
       setInput,
       newchat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;