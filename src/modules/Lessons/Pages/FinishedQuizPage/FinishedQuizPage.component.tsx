import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterCard } from "../../components/CenterCard";
import styles from "./FinishedQuizPage.module.css";
import Lottie from "lottie-react";
import animation2 from "../../../../assets/animations/animation2.json";
import jarTransparent from "../../../../assets/images/jar_transparent.png";
import { Button } from "../../../../shared/components/Button/Button.component";
export const FinishedQuizPage = () => {
  const { lessonid, courseid } = useParams();
  const navigate = useNavigate()

  function handleClick() { 
    navigate('/course/'+courseid+'/lesson/'+lessonid)

  }
  return (
    <AppLayout variant="grey">
      <div className={styles.contentWrapper}>
        <CenterCard>
          <center>
            <h1 className={styles.header}>Desafios concluídos!</h1>
            <p>Parabéns! Você concluiu os desafios!</p>
          <div className={styles.parent}>
            <div className={styles.image}>
              <img src={jarTransparent} alt="" />
            </div>
            <div className={styles.animation}>
              <Lottie animationData={animation2} />
            </div>
          </div>
          <div>
            <Button color="green" onClick={handleClick}>Voltar pra Lição</Button>
          </div>
          </center>
        </CenterCard>
      </div>
    </AppLayout>
  );
};
