import { Card } from "../../../../shared/components/Card/Card.component"
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import BugsBottleImage from "../../../../assets/images/jar_colored.png"
import SwordsImage from "../../../../assets/images/battle2_colored.png"
import CoinsImage from "../../../../assets/images/coin_colored.png"
import SprayImage from "../../../../assets/images/spray_colored.png"
import styles from './StatisticsCardBig.module.css'
import { Button } from "../../../../shared/components/Button/Button.component";

export const StatisticsCardBig = () => {

  const { user } = useAuthStore();


  return <Card>
    MINHAS ESTATISTICAS <br />

    <div className={styles.statisticsLine}>

      <div className={styles.statisticsCardLine}>
        <div className={styles.statisticsCardItem}>
          <img src={BugsBottleImage} alt="" />
        </div>
        <div className={styles.statisticsCardItem}>
          <b>{user?.bug}</b>  <br />
          Bugs
        </div>
        <div className={styles.statisticsCardItem}>
          <img src={CoinsImage} alt="" />
        </div>
        <div className={styles.statisticsCardItem}>
          <b>{user?.coin}</b>  <br />
          Moedas
        </div>
      </div>

      <div className={styles.statisticsLine}>
        <div className={styles.statisticsCardItem}>
          <img src={SwordsImage} alt="" />
        </div>
        <div className={styles.statisticsCardItem}>
          <b>{user?.victory}</b>  <br />
          Vitórias
        </div>
        <div className={styles.statisticsCardItem}>
          <img src={SprayImage} alt="" />
        </div>
        <div className={styles.statisticsCardItem}>
          <b>{user?.refill}</b>  <br />
          Refis <br />
          <Button>repor 5</Button>
        </div>

      </div>
    </div>

  </Card>
}