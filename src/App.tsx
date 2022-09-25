import { useEffect, useState } from 'react';
import './App.css';

interface QuizItem {
  pic: JSX.Element;
  answer: string;
  hint_one?: string;
  hint_two?: string;
}

function App() {
  const [data, setData] = useState<QuizItem[]>(
    [
      {pic: <img src={require("./assets/xyela.png")}/>, answer: "Xyela"},
      {pic: <img src={require("./assets/cephus_p.png")}/>, answer: "Cephus Pygmacus"},
      {pic: <img src={require("./assets/rhogogaster_v.png")}/>, answer: "Rhogogaster viridis"},
      {pic: <img src={require("./assets/athalia_r.png")}/>, answer: "Athalia Rosae"},
      {pic: <img src={require("./assets/uroceros_gigas.png")}/>, answer: "Urocerus Gigas"},
      {pic: <img src={require("./assets/andricus_h.png")}/>, answer: "Andricus hungaricus"},
      {pic: <img src={require("./assets/andricus_q.png")}/>, answer: "Andricus quercuscalicis"},
      {pic: <img src={require("./assets/ichneumon.png")}/>, answer: "Ichneumon"},
      {pic: <img src={require("./assets/rhyssa.png")}/>, answer: "Rhyssa persuasoria"},
      {pic: <img src={require("./assets/ophion.png")}/>, answer: "Ophion"},
      {pic: <img src={require("./assets/cotesia.png")}/>, answer: "Cotesia glomerata"},
      {pic: <img src={require("./assets/chrysis.png")}/>, answer: "Chrysis"},
      {pic: <img src={require("./assets/megascolia.png")}/>, answer: "Megascolia maculata"},
      {pic: <img src={require("./assets/mutilla.png")}/>, answer: "Mutilla"},
      {pic: <img src={require("./assets/pompilus.png")}/>, answer: "Pompilus"},
      {pic: <img src={require("./assets/eumenes.png")}/>, answer: "Eumenes coarctatus"},
      {pic: <img src={require("./assets/polistes.png")}/>, answer: "Polistes gallicus"},
      {pic: <img src={require("./assets/vespula_g.png")}/>, answer: "Vespula germanica"},
      {pic: <img src={require("./assets/vespula_v.png")}/>, answer: "Vespula vulgaris"},
      {pic: <img src={require("./assets/vespa_c.png")}/>, answer: "Vespa crabro"},
      {pic: <img src={require("./assets/monomorium_p.png")}/>, answer: "Monomorium pharaonis"},
      {pic: <img src={require("./assets/tetramorium_c.png")}/>, answer: "Tetramorium caespitum"},
      {pic: <img src={require("./assets/formica_c.png")}/>, answer: "Formica cunicularia"},
      {pic: <img src={require("./assets/formica_r.png")}/>, answer: "Formica rufa"},
      {pic: <img src={require("./assets/lasius_n.png")}/>, answer: "Lasius niger"},
      {pic: <img src={require("./assets/ammophila_s.png")}/>, answer: "Ammophila sabulosa"},
      {pic: <img src={require("./assets/sceliphron_d.png")}/>, answer: "Sceliphron destillatorium"},
      {pic: <img src={require("./assets/philanthus_t.png")}/>, answer: "Philanthus triangulum"},
      {pic: <img src={require("./assets/andrena.png")}/>, answer: "Andrena"},
      {pic: <img src={require("./assets/halictus.png")}/>, answer: "Halictus"},
      {pic: <img src={require("./assets/megachile.png")}/>, answer: "Megachile"},
      {pic: <img src={require("./assets/xylocopa_v.png")}/>, answer: "Xylocopa violacea"},
      {pic: <img src={require("./assets/bombus_p.png")}/>, answer: "Bombus pascuorum"},
      {pic: <img src={require("./assets/bombus_l.png")}/>, answer: "Bombus lapidarius"},
      {pic: <img src={require("./assets/bombus_r.png")}/>, answer: "Bombus rupestris"},
      {pic: <img src={require("./assets/apis_m.png")}/>, answer: "Apis mellifera"},    
    ]
  );
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

  const startGame = () => {
    const questions = data.slice();

    for (let i = 0; i < questions.length; i++) {
      const newPos = getRandomInt(0, questions.length - 1);
      swap(questions, i, newPos);
    }

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

    setTimeout(() => {
      setGameData(gameData.filter(p => p.answer != gameData[0].answer))
      setTextValue("");
      setInputCol("black");
    }, 3000);

    setInputCol("red");
    setTextValue(gameData[0].answer);
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
          <div style={{display: "flex", justifyContent: "center"}}>
            <button onClick={() => {setCorrect([]); setIncorrect([]); setGameFinished(false); setGameStarted(true); startGame()}} style={{marginTop: 30, marginBottom: 30}}>Restart</button>
          </div>          
        </div>
          :
        (
          gameStarted == false || !gameData 
            ?
          <button style={{marginTop: 200}} onClick={() => {startGame()}} className="start">Induljon a játék!</button>
            :
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div style={{marginBottom: 5, marginTop: 20, fontSize: 20}}>{gameData.length} azonosítatlan faj maradt hátra</div>
            <div style={{marginBottom: 5, fontSize: 20, color: "green"}}>{correct?.length} fajt azonosítottál eddig</div>
            <div style={{marginBottom: 5, fontSize: 20, color: "red"}}>{incorrect?.length} fajt nem ismertél fel eddig</div>                    
            {gameData && gameData.length != 0 && gameData[0].pic}

            <input style={{color: inputCol}} value={textValue} onChange={(e) => {inputChange(e.currentTarget.value)}} />

            <div style={{marginBottom: 80}}>
              <button onClick={() => {skip()}} style={{marginRight: 20}}>Ugorjuk át</button>
              <button onClick={() => idkClicked()}>Nem tudom</button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;