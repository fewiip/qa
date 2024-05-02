import { Card } from "../../../../shared/components/Card/Card.component";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import BugsBottleImage from "../../../../assets/images/jar_colored.png";
import SwordsImage from "../../../../assets/images/battle2_colored.png";
import CoinsImage from "../../../../assets/images/coin_colored.png";
import SprayImage from "../../../../assets/images/spray_colored.png";
import styles from "./StatisticsCard.module.css";
import { Button } from "../../../../shared/components/Button/Button.component";

export const StatisticsCard = () => {
  const { user } = useAuthStore();

  return (
    <Card>
      <div className={styles.line}>
        <b>MINHAS ESTATISTICAS</b>
      </div>

      <div className={styles.line}>
        <div className={styles.row}>
          <div>
            <img src={BugsBottleImage} alt="" />
          </div>
          <div className={styles.col}>
            <b>{user?.bug}</b>
            <p>Bugs</p>
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <img src={CoinsImage} alt="" />
          </div>
          <div className={styles.col}>
            <b>{user?.coin}</b>
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
            <b>{user?.victory}</b>
            <p>Vitórias</p>
          </div>
        </div>
        <div className={styles.row}>
          <div >
            <img src={SprayImage} alt="" />
          </div>
          <div className={styles.col}>
            <b>{user?.refill}</b> <br />
            <p>Refis</p>
            <Button size="small">repor 5</Button>
          </div>
        </div>
      </div> 
    </Card>
  );
};
