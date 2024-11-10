import React from "react";

function AiResume({ aiResponse }) {
    return <div>
         <textarea
        name="outputBox"
        rows="20"
        cols="50"
        value={aiResponse || "No data to display"}// Displays the response data
        readOnly // Keeps this textarea read-only for output
                    />
        </div>;
}
export default AiResume;
