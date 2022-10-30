import logo from "./logo.svg"
import "./App.css"

import { useEffect, useState } from "react"
import Board from "./Board"

function App() {

  return (
    <div className="App">
      <div style={{ width: "640px", height: "640px" }}>
        <Board />
      </div>
    </div>
  )
}

export default App
