import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterCard } from "../../components/CenterCard";
import Lottie from "lottie-react";
import animation2 from "../../../../assets/animations/animation2.json";
import jarTransparent from "../../../../assets/images/jar_transparent.png";
import { Button } from "../../../../shared/components/Button/Button.component";

import styles from "./FinishedQuizPage.module.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { useLessons } from "../../api";
 
export const FinishedQuizPage = () => {
  const [ownership, setOwnership] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const { lessonid, courseid } = useParams();
  const {  isSubscribed, isCourseOwner } = useLessons();
  const { user } = useAuthStore();
  //const [isFinished, setIsFinished] = useState(false)
  const navigate = useNavigate()

  function handleClick() { 
    navigate('/course/'+courseid+'/lesson/'+lessonid) 
  }


  useEffect(() => { 
    fetchSubscription();
    fetchOwnership();
  }, []);


  async function fetchSubscription() {
    setSubscription(false);
    console.log(`userID: ${user?.id} ;courseID: ${courseid}`);
    if (user && courseid) {
      try {
        const response = await isSubscribed(user?.id, parseInt(courseid));
        setSubscription(response.data.isSubscribed);
        console.log(response);
      } catch (error) {
        setSubscription(false);
      }
    }
  }

  async function fetchOwnership() {
    setOwnership(false);
    if (user && courseid) {
      try {
        const response = await isCourseOwner(user?.id, parseInt(courseid));
        setOwnership(response.data.isOwner);
        console.log(response);
      } catch (error) {
        setOwnership(false);
      }
    }
  }

  return (
    <AppLayout variant="grey">
      <div className={styles.contentWrapper}>
      {(subscription || ownership) && (
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
        </CenterCard>)}
      </div>
    </AppLayout>
  );
};
