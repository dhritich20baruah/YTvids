import React, { useState } from 'react'

const QuestionBlock = () => {
    const [index, setIndex] = useState(0)

    const [status, setStatus] = useState('notvisited')

    const { query } = props
  return (
    <>
    <div>
       { query.map((item) => {
            return (
                <li key={item.number}> {item.number} </li>
            )
        })}
        <ul>
        <li className={status} onClick={() => { setIndex(0) }}>1</li>
                                <li className={status} onClick={() => { setIndex(1) }}>2</li>
                                <li className={status} onClick={() => { setIndex(2) }}>3</li>
                                <li className={status} onClick={() => { setIndex(3) }}>4</li>
                                <li className={status} onClick={() => { setIndex(4) }}>5</li>
                                <li className={status} onClick={() => { setIndex(5) }}>6</li>
                                <li className={status} onClick={() => { setIndex(6) }}>7</li>
                                <li className={status} onClick={() => { setIndex(7) }}>8</li>
                                <li className={status} onClick={() => { setIndex(8) }}>9</li>
                                <li className={status} onClick={() => { setIndex(9) }}>10</li>
                                <li className={status} onClick={() => { setIndex(10) }}>11</li>
                                <li className={status} onClick={() => { setIndex(11) }}>12</li>
                                <li className={status} onClick={() => { setIndex(12) }}>13</li>
                                <li className={status} onClick={() => { setIndex(13) }}>14</li>
                                <li className={status} onClick={() => { setIndex(14) }}>15</li>
                                <li className={status} onClick={() => { setIndex(15) }}>16</li>
                                <li className={status} onClick={() => { setIndex(16) }}>17</li>
                                <li className={status} onClick={() => { setIndex(17) }}>18</li>
                                <li className={status} onClick={() => { setIndex(18) }}>19</li>
                                <li className={status} onClick={() => { setIndex(19) }}>20</li>
                                <li className={status} onClick={() => { setIndex(20) }}>21</li>
                                <li className={status} onClick={() => { setIndex(21) }}>22</li>
                                <li className={status} onClick={() => { setIndex(22) }}>23</li>
                                <li className={status} onClick={() => { setIndex(23) }}>24</li>
                                <li className={status} onClick={() => { setIndex(24) }}>25</li>
                                <li className={status} onClick={() => { setIndex(25) }}>26</li>
                                <li className={status} onClick={() => { setIndex(26) }}>27</li>
                                <li className={status} onClick={() => { setIndex(27) }}>28</li>
                                <li className={status} onClick={() => { setIndex(28) }}>29</li>
                                <li className={status} onClick={() => { setIndex(29) }}>30</li>
        </ul>
    </div>
    </>
  )
}

export default QuestionBlock