import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import chatgpt from "..assets/images/chatgpt.png";
import human from "../assets/images/human.webp";
function ChatGpt({
  data,
  setData,
  userMessages,
  setResponse,
  setUserMessages,
  response,
  setText,
  text,
}) {
  const [height, setHeight] = useState("10px");
  const [control, setControl] = useState(0);
  const [open, setOpen] = React.useState(false);
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
      .post("http://localhost:8080/chatgpt/chat", {
        prompt,
        response,
        userMessages,
      })
      .then((res) => {
        console.log(res);
        setResponse((content) =>
          content.filter((e) => (e.content !== "ef" ? e : ""))
        );
        setResponse((content) => [...content, res.data]);
       

        setOpen(false);
      })
      .catch((err) => {
        setResponse((content) => [
          ...content,
          {
            role: "assisstant",
            content: "The server is busy now. Try again after few minutes!",
          },
        ]);
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
    setResponse((content) => [
      ...content,
      { role: "assistant", content: "ef" },
    ]);
    setPrompt("");
  };
  const ref = useRef(null);
  return (
    <Box>
      <Box sx={{ position: "relative", height: "92.5vh" }}>
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
                          alignItems: "start",
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
                              fontFamily:
                                "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",

                              whiteSpace: "pre-wrap",
                              wordWrap: "break-word",
                            }}
                          >
                            {" "}
                            {userMes.content === "ef" ? (
                              <span
                                style={{
                                  backgroundColor: "black",
                                  height: { height },
                                  width: "10px",
                                }}
                              >
                                hello
                              </span>
                            ) : (
                              userMes.content
                            )}
                          </p>
                        </Box>
                      </Stack>
                      <Button
                        variant="text"
                        sx={{
                          fontSize: "65%",
                          border: "1px solid black",
                          borderRadius: "20px",
                          textAlign: "center",
                          display: "block",
                          marginTop: "20px",
                          marginBottom: "-15px",
                        }}
                        onClick={(e) => setData(data + "" + userMes.content)}
                      >
                        Copy to text
                      </Button>
                    </Box>
                 
                  </Box>
                );
              })}
          </Box>
        </Box>
        <Box
          component="form"
          onSubmit={sendPrompt}
          sx={{
            zIndex: 1,
            position: "absolute",
            p: "2px 0px",
            paddingBotton: "0px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            bottom: "0px",
            borderBottom: "1px solid #E8E9EB",
            backgroundColor: "#fff",
            borderTop: "1px solid #E8E9EB",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Enter Prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px", border:"none",color:"#ff8f00",opacity:"75%" }}
            aria-label="search"
            onClick={sendPrompt}
          >
            <SendIcon sx={{"&:active":{
             opacity:"100%",
             transform:"scale(1.15)"
            },"&:hover":{
              color:"#ff8f00",
              fontWeight:"bold",
            }}}/>
          </IconButton>
        </Box>
        {/* {open && (
          <SimpleBackdrop
            open={open}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
        )} */}
      </Box>
    </Box>
  );
}

export default ChatGpt;
