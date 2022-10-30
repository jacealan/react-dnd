import React, { useEffect, useState } from "react"

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ItemTypes } from "./Constants"
import { useDrop } from "react-dnd"

import BoardSquare from "./BoardSquare"
import Square from "./Square"
import Knight from "./Knight"

function canMoveKnight(from, toX, toY) {
  const [x, y] = from
  const dx = toX - x
  const dy = toY - y

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  )
}

function renderSquare(i, knightPosition, handleSquareClick, moveKnight) {
  const x = i % 8
  const y = Math.floor(i / 8)
  // const isKnightHere = x === knightX && y === knightY
  // const black = (x + y) % 2 === 1
  // const piece = isKnightHere ? <Knight /> : null

  return (
    // <div
    //   key={i}
    //   style={{ width: "12.5%", height: "12.5%" }}
    //   onClick={() => handleSquareClick(x, y)}
    // >
    //   <Square black={black}>{piece}</Square>
    // </div>
    <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
      <BoardSquare
        x={x}
        y={y}
        moveKnight={moveKnight}
        canMoveKnight={canMoveKnight}
        knightPosition={knightPosition}
      >
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  )
}

function renderPiece(x, y, [knightX, knightY]) {
  if (x === knightX && y === knightY) {
    return <Knight />
  }
}

//
//
//
export default function Board() {
  const [knightPosition, setKnightPosition] = useState([0, 4])

  function moveKnight(toX, toY) {
    if (canMoveKnight(knightPosition, toX, toY)) setKnightPosition([toX, toY])
      // setKnightPosition(JSON.parse(JSON.stringify([toX, toY])))
    console.log(knightPosition)
  }
  function handleSquareClick(toX, toY) {
    if (canMoveKnight(knightPosition, toX, toY)) setKnightPosition([toX, toY])
  }

  // const [, drop] = useDrop(
  //   () => ({
  //     accept: ItemTypes.KNIGHT,
  //     drop: () => setKnightPosition([x, y])
  //   }),
  //   [x, y]
  // )

  const squares = []
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition, handleSquareClick, moveKnight))
  }
  // useEffect = (() => {
  //   squares = []
  //   for (let i = 0; i < 64; i++) {
  //     squares.push(renderSquare(i, knightPosition, handleSquareClick, moveKnight))
  //   }

  // }, [knightPosition])

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {squares}
      </div>
    </DndProvider>
  )
}
