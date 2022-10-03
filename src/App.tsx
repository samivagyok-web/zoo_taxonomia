import { useEffect, useState } from 'react';
import './App.css';
import { Items as Items1 } from './fejezetek/elso/QuizItems';
import { Items as Items2 } from "./fejezetek/masodik/QuizItems";
import { Items as Items3 } from "./fejezetek/harmadik/QuizItems";

export interface QuizItem {
  pic: JSX.Element;
  answer: string;
  hint_one?: string;
  hint_two?: string;
}

function App() {
  const [data, setData] = useState<QuizItem[]>([]);
  const [gameData, setGameData] = useState<QuizItem[]>();
  const [gameStarted, setGameStarted] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [gameFinished, setGameFinished] = useState(false);
  const [correct, setCorrect] = useState<QuizItem[]>([]);
  const [incorrect, setIncorrect] = useState<QuizItem[]>([]);
  const [inputCol, setInputCol] = useState<string>("black");

  useEffect(() => {
    if (gameData != undefined && gameData.length == 0) {
      setGameFinished(true);
    }
  }, [gameData]);

  const startGame = (fejezet: number) => {
    let questions: QuizItem[] = [];
    
    if (fejezet == 1) {
      questions = Items1;
    } else if (fejezet == 2) {
      questions = Items2;
    } else {
      questions = Items3;
    }

    for (let i = 0; i < questions.length; i++) {
      const newPos = getRandomInt(0, questions.length - 1);
      swap(questions, i, newPos);
    }

    setData(questions);
    setGameData(questions);
    setGameStarted(true);
  }

  const swap = (arr: QuizItem[], i: number, j: number) => {
    const a = arr[i];
    arr[i] = arr[j];
    arr[j] = a;
  }

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const inputChange = (text: string) => {
    if (!gameData) return;

    if (text.toLowerCase() == gameData[0].answer.toLowerCase()) {
      correct?.push(gameData[0]);
      setCorrect(correct);

      if (gameData.length == 1) {
        setGameFinished(true);
        setGameData([]);
      } else {
        shiftArray(gameData);
        setGameData(gameData.filter(p => p.answer != gameData[0].answer))
      }

      setTextValue("");
    } else {
      setTextValue(text);
    }
  }

  const idkClicked = () => {
    if (!gameData) return;

    incorrect?.push(gameData[0]);
    setIncorrect(incorrect);

    setInputCol("red");
    setTextValue(gameData[0].answer);
  }

  const nextClick = () => {
      if (!gameData) return;

      setGameData(gameData.filter(p => p.answer != gameData[0].answer))
      setTextValue("");
      setInputCol("black");
  }

  const skip = () => {
    if (!gameData) return;

    shiftArray(gameData);
  }

  const shiftArray = (data: QuizItem[]) => {
    const arr: QuizItem[] = [];

    for (let i = 1; i < data.length; i++) {
      arr.push(data[i]);
    }

    arr.push(data[0]);

    setGameData(arr);
  }

  return (
    <div className="App">
      <div style={{fontSize: 32, fontWeight: "bold", marginBottom: 50, textAlign: "center", margin: "0px 7px"}}>Az ultimate zootaxonómia kvíz!</div>
      {
        gameFinished == true
          ?
        <div style={{marginTop: 20}}>
          <div style={{fontSize: 20, marginBottom: 5, textAlign: "center"}}>{(correct.length / data.length) * 100}%-ot értél el!</div>
          <div style={{fontSize: 20, marginBottom: 5, fontWeight: "bold", textAlign: "center"}}>Azonosítatlan fajok:</div>
          {
            incorrect.map((item, idx) => {
              return (
                <div key={idx} style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingBottom: 15, borderBottom: "1px solid gray"}}>
                  {item.pic}
                  <div style={{fontWeight: "bold", fontSize: 22}}>{item.answer}</div>
                </div>
              )
            })
          }
          <div style={{marginTop: 200, display: "flex", justifyContent: "center", alignItems: "center", gap: 15}}>            
            <button onClick={() => {startGame(1)}} className="start">1. fejezet</button>
            <button onClick={() => {startGame(2)}} className="start">2. fejezet</button>
            <button onClick={() => {startGame(3)}} className="start">3. fejezet</button>
          </div>      
        </div>
          :
        (
          gameStarted == false || !gameData 
            ?
          <div style={{marginTop: 200, display: "flex", justifyContent: "center", alignItems: "center", gap: 15}}>            
            <button onClick={() => {startGame(1)}} className="start">1. fejezet</button>
            <button onClick={() => {startGame(2)}} className="start">2. fejezet</button>
            <button onClick={() => {startGame(3)}} className="start">3. fejezet</button>
          </div>
            :
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div style={{marginBottom: 5, marginTop: 20, fontSize: 20}}>{gameData.length} azonosítatlan faj maradt hátra</div>
            <div style={{marginBottom: 5, fontSize: 20, color: "green"}}>{correct?.length} fajt azonosítottál eddig</div>
            <div style={{marginBottom: 5, fontSize: 20, color: "red"}}>{incorrect?.length} fajt nem ismertél fel eddig</div>                    
            {gameData && gameData.length != 0 && gameData[0].pic}

            <input style={{color: inputCol}} value={textValue} onChange={(e) => {inputChange(e.currentTarget.value)}} />

            <div style={{marginBottom: 80}}>
              <button onClick={() => {skip()}} style={{marginRight: 20}}>Ugorjuk át</button>
              <button onClick={() => idkClicked()} style={{marginRight: 20}}>Nem tudom</button>
              {inputCol == "red" && <button onClick={() => nextClick()}>Következő</button>}              
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;