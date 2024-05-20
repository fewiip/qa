import { Card } from "../../../../shared/components/Card/Card.component";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import BugsBottleImage from "../../../../assets/images/jar_colored.png";
import SwordsImage from "../../../../assets/images/battle2_colored.png";
import CoinsImage from "../../../../assets/images/coin_colored.png";
import styles from "./StatisticsCard.module.css";
import { Button } from "../../../../shared/components/Button/Button.component";
import { UserStatistics, useLessons } from "../../api";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SprayImage from "../../../../assets/images/spray_colored.png";
import coinSolo_colored from "../../../../assets/images/coinSolo_transparent.png";
interface StatisticsCardProps {
  courseid: number
}

export const StatisticsCard : FunctionComponent<StatisticsCardProps> = (props) => {
  const {courseid} = props
  const { user } = useAuthStore();
  const { getUserStatistics, addRefill, subtractCoin  } = useLessons();
  const [userStatistiscs, setUserStatistics] = useState<UserStatistics>()
  console.log(courseid)
  async function fetcUserStatistics() {
    if(user) { 
      const response = await getUserStatistics(user?.id);
      setUserStatistics(response.data)
    }
  }
  useEffect(() => {
    fetcUserStatistics()
  }, [])

  async function fetchaAddRefill() {
    if(user) { 
      await subtractCoin(user?.id);
      const response2 = await addRefill(user?.id);
      setUserStatistics(response2.data)
    }
  }


  function handleRefill() {
    if(userStatistiscs){
      console.log('coins '+userStatistiscs?.coin)
      if(userStatistiscs?.coin > 0){
        console.log('coins maior que zero')
  
        fetchaAddRefill()
        //fetchaSubtractCoin()
        toast("Refil +1");
      }else if(userStatistiscs.coin === 0){
        toast("Precisa de moedas pra comprar o refil");
      }
    }
  }

  return (
    <Card>
      <div className={styles.line}>
        <b>MINHAS ESTATÍSTICAS</b>
      </div>

      <div className={styles.line}>
        <div className={styles.row}>
          <div>
            <img src={BugsBottleImage} alt="" />
          </div>
          <div className={styles.col}>
            <b>{userStatistiscs?.bug}</b>
            <p>Bugs</p>
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <img src={CoinsImage} alt="" />
          </div>
          <div className={styles.col}>
            <b>{userStatistiscs?.coin}</b>
            <p>Moedas</p>
          </div>
        </div>
      </div>

      <div className={styles.line}>
        <div className={styles.row}>
          <div>
            <img src={SwordsImage} alt="" />
          </div>
          <div className={styles.col}>
            <b>{userStatistiscs?.victory}</b>
            <p>Vitórias</p>
          </div>
        </div>
        <div className={styles.row}>
          <div >
            <img src={SprayImage} alt="" />
          </div>
          <div className={styles.col}>
            <b>{userStatistiscs?.refill}</b> <br />
            <p >Refis</p>
            <Button size="small" onClick={handleRefill}>
            repor 1
              <img src={coinSolo_colored} style={{marginTop: "0px",width: "10px", height: "10px"}} alt="" />
              </Button>
          </div>
        </div>
      </div> 
    </Card>
  );
};
