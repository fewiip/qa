import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import BugsBottleImage from "../../../../assets/images/jar_colored.png"
import SwordsImage from "../../../../assets/images/battle2_colored.png"
import CoinsImage from "../../../../assets/images/coin_colored.png"
import SprayImage from "../../../../assets/images/spray_colored.png"
import styles from './BigStatisticsCard.module.css'
import { Button } from "../../../../shared/components/Button/Button.component";

import coinSolo_colored from "../../../../assets/images/coinSolo_transparent.png";
import { UserStatistics, useLessons } from "../../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const BigStatisticsCard = () => {

  const { user } = useAuthStore();
  const { getUserStatistics, addRefill, subtractCoin  } = useLessons();
  const [userStatistiscs, setUserStatistics] = useState<UserStatistics>()
  
  async function fetchaAddRefill() {
    if(user) { 
      await subtractCoin(user?.id);
      const response2 = await addRefill(user?.id);
      setUserStatistics(response2.data)
    }
  }
  async function fetcUserStatistics() {
    if(user) { 
      const response = await getUserStatistics(user?.id);
      setUserStatistics(response.data)
    }
  }

  useEffect(() => {
    fetcUserStatistics()
  }, [])

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

  return <>


    <div className={styles.cardWrapper}>
    <div className={styles.statisticsCardLine}>
      <div className={styles.titulo}>
      MINHAS ESTATÍSTICAS
      </div>
       </div>


      <div className={styles.statisticsCardLine}>
        <div className={styles.statisticCardInfo}>
          <div className={styles.statisticsCardItem}>
            <img src={BugsBottleImage} alt="" />
          </div>
          <div className={styles.statisticsCardItem}>
            <b>{userStatistiscs?.bug}</b>  <br />
            Bugs
          </div>
        </div>


        <div className={styles.statisticCardInfo}>
          <div className={styles.statisticsCardItem}>
            <img src={CoinsImage} alt="" />
          </div>
          <div className={styles.statisticsCardItem}>
            <b>{userStatistiscs?.coin}</b>  <br />
            Moedas
          </div>
        </div>


        <div className={styles.statisticCardInfo}>

          <div className={styles.statisticsCardItem}>
            <img src={SwordsImage} alt="" />
          </div>
          <div className={styles.statisticsCardItem}>
            <b>{userStatistiscs?.victory}</b>  <br />
            Vitórias
          </div>

        </div>


        <div className={styles.statisticCardInfo}>

          <div className={styles.statisticsCardItem}>
            <img src={SprayImage} alt="" />
          </div>
          <div className={styles.statisticsCardItem}>
            <b>{userStatistiscs?.refill}</b>  <br />
            Refis <br />
            <Button size="small" onClick={handleRefill}>Repor
            1<img src={coinSolo_colored} style={{marginTop: "0px",width: "10px", height: "10px"}} alt="" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  </>
}