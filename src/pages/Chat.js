import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import contentimage from "../assets/bg-image.4b3208f1.png";
import { Box, Button, Stack } from "@mui/material";
import axios from "axios";
import chatgpt from "../assets/images/chatgpt.png";
import human from "../assets/images/human.webp";

// const vision = require('@google-cloud/vision').v1;

// Imports the Google Cloud client libraries
// const client = new vision.ImageAnnotatorClient();
const Chat = () => {
  const [height, setHeight] = useState("10px");
  const [control, setControl] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [response,setResponse]=useState([]);
  const [userMessages,setUserMessages]=useState([])
  const handleClose = () => {
    setOpen(false);
  };
  const [title, setTitle] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const [prompt, setPrompt] = useState("");
  let userMessages2 = [];
  const sendPrompt = (e) => {
    e.preventDefault();
    console.log("Hekmkfjjjjfhf");
    //setOpen(true);
    // setUserMessages((content) => [...content, prompt]);
    updateContent(e);
    console.log(response);
    axios
      .get(`http://54.153.113.83/allfiles?prompt=${prompt}`,)
      .then((res) => {
        console.log(res.data);
        setResponse((content) =>
          content.filter((e) => (e.name !== "ef" ? e : ""))
        );
        const allResponse=[...response];
        const another=[];
        console.log(allResponse);
        Array.from(res.data).forEach(element => {
          console.log(element)
          another.push(element)
        });
       allResponse.push(another);
       console.log("Abid");
       setResponse(allResponse)

        setOpen(false);
      })
      .catch((err) => {
        const allResponse=[...response];
        allResponse.push([   
          {
            name: "assisstant",
            text: "The server is busy now. Try again after few minutes!",
          },]
     );
   
      });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (control % 2 === 0) setHeight("20px");
      else setHeight("10px");
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const updateContent = (e) => {
    
    setUserMessages((content) => [...content, prompt]);
     const allResponse=[...response];
     allResponse.push([   
      {  name:"ef",
    text:"ef" },]
  );
  setResponse(allResponse);
    setPrompt("");
  };
  const ref = useRef(null);
  return (

    <div className="mypage">
    <div style={{ position: "relative",  }}>
      <div className="top">
        <div className="top-title">
          Use GCP & Generative AI to create content using personal data/file storage.
        </div>
      </div>
      <div className="chat">
        <div className="chat-left">
          <div className="chat-left-top">
            GENERATIVE AI
          </div>
          <div className="chat-left-container">
          </div>
        </div>
        <div className="chat-right">
          <div className="chat-right-top">
            <div className="chat-right-top-page">
              Pages/Chat
            </div>
            <div className="chat-right-top-name" style={{fontSize: "30px", margin: "10px", fontFamily: "fantasy" }}>
              ChatPage
            </div>
          </div>    
          {response.length>0&&<div className="chat-right-container" style={{ height: "calc(90vh -100px)",
            overflowY: "scroll",}}>
         
            <Box
          sx={{
            zIndex: -1,
            marginBottom: "130px",
            height: "calc(90vh -100px)",
            overflowY: "scroll",
          }}
        >
          <Box sx={{ backgroundColor: "white" }}>
            {response
              .filter((e) => e.content !== "")
              .map((userMes, e) => {
                return (
                  <Box key={userMes}>
                    <Box
                      sx={{
                        backgroundColor: "#FFF8E1",
                        borderBottom: "1px solid grey",
                        padding: "20px",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          width: "95%",
                          margin: "0px auto",
                          alignItems: "start",
                        }}
                      >
                        <Box flex={1}>
                          <img
                            src={human}
                            width="30px"
                            height="30px"
                            style={{ borderRadius: "50%" }}
                          />
                        </Box>

                        <Box
                          className="cont"
                          flex={4}
                          onLoad={(e) =>
                            document
                              .getElementsByClassName("cont")
                              [
                                document.getElementsByClassName("cont").length -
                                  1
                              ].scrollIntoView({ behavior: "smooth" })
                          }
                          sx={{
                            width: "95%",
                            margin: "0px auto",
                            textAlign: "start",
                          }}
                        >
                          {userMessages[e]
                            ? userMessages[e].toString().includes("Feedback")
                              ? userMessages[e].toString().substr(0, 30)
                              : userMessages[e]
                            : ""}
                        </Box>
                      </Stack>
                      {/* <Button
                    variant="text"
                    sx={{
                      fontSize: "65%",
                      border: "1px solid black",
                      borderRadius: "20px",
                      textAlign: "start",
                      display: "block",
                      marginTop: "20px",
                      marginBottom: "-15px",
                    }}
                    onClick={(e) => setData(data + "" + userMessages[e])}
                  >
                    Copy to text
                  </Button> */}
                    </Box>

                    <Box
                    ref={e===response.length-1?ref:null}onLoad={()=> e===response.length-1?ref.current?.scrollIntoView():""
                  }
                      sx={{
                        backgroundColor: "#F7F7F8",
                        borderBottom: "1px solid white",
                        padding: "20px",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          width: "95%",
                          margin: "0px auto",
                          alignItems: "center",
                        }}
                      >
                        <Box flex={1}>
                          <img
                            src={chatgpt}
                            width="30px"
                            height="30px"
                            style={{ borderRadius: "50%" }}
                          />
                        </Box>

                        <Box
                          flex={4}
                          sx={{
                            width: "95%",
                            margin: "0px auto",
                            textAlign: "start",
                          }}
                        >
                          <p 
                            style={{
                              margin:"0px",
                              padding:"0px",
                              marginTop:"-15px",
                              fontFamily:
                                "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",

                              whiteSpace: "pre-wrap",
                              wordWrap: "break-word",
                            }}
                          >
                            {" "}
                           { (
                         userMes.map(e=>e.name==="ef"? 
                          <span
                            style={{
                              backgroundColor: "black",
                              height: { height },
                              width: "10px",
                            }}
                          >
                            hello
                          </span>
                         :<div style={{marginTop:"0px",marginBottom:"0px",padding:"0px"}}><p style={{marginTop:"0px",marginBottom:"0px",padding:"0px"}}>{e.name}</p>
                         <p style={{marginTop:"0px",marginBottom:"0px",padding:"0px"}}><a href={e.link}>Live Link {e.link}</a></p>
                            <pre style={{marginTop:"0px",marginBottom:"0px",padding:"0px", whiteSpace: "pre-wrap"}}>Live Link: {e.text}</pre>
                        
                         </div>)
                            )}
                          </p>
                        </Box>
                      </Stack>
                    
                    </Box>
                 
                  </Box>
                );
              })}
          </Box>
        </Box>
          
          </div>}
        </div>
      </div>
      <div className="chat-right-input" style={{   zIndex: 1,
            position: "absolute",bottom:"0px",left:"50px",width:"calc(100% - 50px)"}}>
              <input className="input" type="text" id="fname" name="firstname" placeholder="Type Your Message Here .."value={prompt}onChange={e=>setPrompt(e.currentTarget.value)} />
              <button className="Submit" onClick={sendPrompt}>Submit</button>
            </div>
    </div>
    </div>
  );
};

export default Chat;