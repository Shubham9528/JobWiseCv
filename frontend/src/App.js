import React, { useState } from 'react';
import './App.css';
import InputBox from './components/InputBox';

function App() {
    const [inputBox, setInputBox] = useState("");
   

    // Whenever aiResponse1 updates, update the root aiResponse
//     React.useEffect(() => {
//         setAiResponse(aiResponse1);
//     }, [aiResponse1, setAiResponse]);
     console.log(inputBox);
   
    return (
        <div className="App">
            <InputBox setInputBox={setInputBox}  />
        </div>
    );
}

export default App;
