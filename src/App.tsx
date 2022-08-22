import { useState } from "react";
import styles from "./App.module.css";
import poweredImage from './assets/powered.png'
import { levels, calculateImc, Level} from './helpers/imc';
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png';

const App = ()=>{
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setweightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = ()=>{
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField))
    }else{
      alert("Digite todos os campos.")
    }
  }
  const handleBackButton = ()=>{
    setToShow(null);
    setHeightField(0)
    setweightField(0)
  }
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
            <img width={150} src={poweredImage} alt="" />
        </div>
      </header>
      <div className={styles.container}>

        <div className={styles.leftSide}>
            <h1>Calcule o seu IMC.</h1>
            <p>O índice de massa corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso ideal. Desenvolvido pelo polímata Lambert Quételet no fim do século XIX, trata-se de um método fácil e rápido para a avaliação do nível de gordura de cada pessoa, sendo, por isso, um preditor internacional de obesidade adotado pela Organização Mundial da Saúde (OMS).</p>
            <input
              type="number"
              placeholder="Digite a sua altura. Ex.: 1.5 (em metros)."
              value={heightField > 0 ? heightField: ''}
              onChange={e => setHeightField(parseFloat(e.target.value))}
              disabled={toShow ? true:false}
              />
            <input
              type="number"
              placeholder="Digite o seu peso. Ex.: 75.3 (em kg)."
              value={weightField > 0 ? weightField: ''}
              onChange={e => setweightField(parseFloat(e.target.value))}
              disabled={toShow ? true:false}
            />
            <button disabled={toShow ? true:false} onClick={handleCalculateButton}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          { !toShow &&
            <div className={styles.grid}>
              {levels.map((item, key)=>(
                <GridItem key={key} item={item} />
                ))}
           </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div onClick={handleBackButton} className={styles.rightArrow}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>              
                <GridItem item={toShow} />
            </div>
          }
        </div>

      </div>
    </div>
  );

}

export default App;