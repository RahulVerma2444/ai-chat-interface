import { useState, useRef, useEffect } from "react";


function Prompt() {
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")
    const [error, setError] = useState(null)
    const [messages, setMessages] = useState([])
    const bottomRef = useRef(null);

    



    const handleSubmit = () => {

        if (!prompt.trim()){
            console.log("Prompt is empty!")
            return;
        }

        const newPromptEntry = {
            role: "user",
            content: prompt
        }

        const baseMessages = [...messages, newPromptEntry]

        setLoading(true);
        setError(null);
        setResponse("");        
        
        fetch('http://localhost:3001/api/ai', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({messages: baseMessages })
        })
        .then(res => {
            console.log("Response status: ", res.status)
            if(!res.ok){
                throw Error('Error: Could not generate a response')
            }
            return res.json()
        })
        .then(data => {
            const responseText = data.reply || data.message || data.response || data.text || JSON.stringify(data) 
            setResponse(responseText)

            const newResponseEntry = {
                role: "assistant",
                content: responseText
            }                

            const finalMessages = [...baseMessages, newResponseEntry]
            
            
            setLoading(false)
            setError(null)
            setPrompt("")
            setMessages(finalMessages)
        })
        .catch(err => {
            console.log("Catch block error: ", err)
            setError(err.message)
            setLoading(false)
            
        })        
    }

    const handleClear = () => {
        setPrompt("")
        setLoading(false)
        setResponse("")
        setError(null)
        setMessages([])
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
   


    return(
        <div style={{
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            padding: "16px",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont"
        }}>
        
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "20px"
        }}>
        {messages.map((msg, index) => (
            <div
                key={index}
                style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.role === "user" ? "#2563eb" : "#e5e7eb",
                color: msg.role === "user" ? "white" : "#111827",
                padding: "10px 14px",
                borderRadius: "16px",
                maxWidth: "70%",
                marginLeft: msg.role === "user" ? "auto" : "0",
                marginTop: "6px"
                }}
            >
                <p style={{ margin: 0 }}>{msg.content}</p>
            </div>
        ))}
        <div ref={bottomRef} />
        </div>

            

            <textarea
                disabled={loading}
                value={prompt}
                onChange={(e) => {setPrompt(e.target.value)}}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey){
                        e.preventDefault();
                        handleSubmit();
                    }
                }}
                placeholder="Ask me anything!"
                style={{
                    width: '100%',
                    minHeight: "80px",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    resize: "none",
                    fontSize: "14px",
                    outline: "none"
                }}
            />


           <div style={{
                display: "flex",
                gap: "10px",
                marginTop: "12px",
                width: "100%"
           }}>
                <button
                    type="button"
                    disabled={loading}
                    onClick={() => {handleSubmit()}}
                    style={{
                        backgroundColor: loading ? "#93c5fd" : "#05a5daff",
                        color: "#e5e7eb",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "Analyzing..." : "Submit"}
                </button>
            
                <button
                    type="button"
                    onClick={() => {handleClear()}}
                    style={{
                        backgroundColor: "#e5e7eb",
                        color: "#374151",
                        padding: "10px 16px", 
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        cursor: messages.length === 0 ? "not-allowed" : "pointer"
                    }}
                >
                    Clear
                </button>
            </div>


            {loading && (
                <div style={{color: "#6b7280", marginTop: "8px"}}>
                    Thinking...
                </div>
            )}
            
            {error && (
                <div style={{
                    backgroundColor: "#f62626ff",
                    color: "#f5f5f5",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    marginTop: "12px"
                    }}>
                        {error}
                    </div>
                )}
        </div>
    )
}


export default Prompt