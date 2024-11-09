"use client"
import { KeyboardEvent, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const commands = ["whoami", "help", "neofetch", "clear", ""];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  function handleEnter(event: KeyboardEvent<HTMLInputElement>){
    if (event.key==="Enter"){
      const output = handleCommand(input);
      if (input !== "clear"){
        setHistory((prevHistory)=> {
          return [...prevHistory, `$ ${input}`, output!];
        });
      }
        setInput("");
    }
  }
  function handleCommand(command: string){
    if (commands.includes(command)){
      switch (command){
        case "whoami":
          return "root";
        case "help":
            return "commands: help whoami neofetch clear (hint: use neofetch)"; 
        case "clear":
          setHistory([]);
        }
        
      } else {
          return `fish: unknown command: ${command}`;
      }
  }

  return (
    <div className=" h-screen w-full justify-center align-center p-6">
      <div className="flex flex-col gap-2 bg-[#1E1E2E] h-4/6 opacity-70 py-6 px-4 rounded-lg border-[#6B85BC] border w-full" onClick={()=>inputRef.current?.focus()}>
      <div className="flex flex-row gap-2" >
      <p>
      commands: 
      </p>
      <p className="text-[#C691A3]">
      help whoami neofetch clear (hint: use neofetch)
      </p>
      </div>
      {history.map((line, index)=>(
        <div key={index}>
          {line}
          </div>
      ))}
      <div className="flex flex-row">
       <p className="weightSmall pr-2"> {"$"} </p> 
       <input ref={inputRef} value={input} onChange={handleInputChange} onKeyDown={handleEnter} autoFocus maxLength={30} type="text" className="bg-[#1E1E2E] text-[#6B85BC] outline-none weightLarger"/>
      </div>
      </div>
    </div>
  );
}