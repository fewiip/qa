import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { useParams } from "react-router-dom";
import { useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterCard } from "../../components/CenterCard";
import Lottie from "lottie-react";
import { Button } from "../../../../shared/components/Button/Button.component";
import { useEffect, useState } from "react";
import { Tip } from "../../../../shared/components/Tip";

import styles from "./FinishedQuizPage.module.css";
import jarTransparent from "../../../../assets/images/jar_transparent.png";
import coins from "../../../../assets/images/coin_colored.png";
import animation2 from "../../../../assets/animations/animation2.json";
import { useQuizStore } from "../../../auth/stores/useQuizStore";

export const FinishedQuizPage = () => {
  const quizStore = useQuizStore()
  const finishQuiz = useQuizStore((state) => state.finishQuiz)
  const [ownership, setOwnership] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const { courseid } = useParams();
  const { isSubscribed, isCourseOwner, addBug, addCoin } = useLessons();
  const { user } = useAuthStore();
  //const [isFinished, setIsFinished] = useState(false)
  const navigate = useNavigate();
  const [bugsAdd, setbugsAdd] = useState(0)
  const [coinsAdd , setcoinsAdd ]= useState(0)
  

  async function handleClick() {
    if(user){
      for (let i=0; i<bugsAdd; i++){
        await addBug(user.id)
      }
      for (let i=0; i<coinsAdd; i++){
        await addCoin(user.id)
      }
    }
    navigate("/course/" + courseid + "/lessons/");
  }

  useEffect(() => {
    fetchSubscription();
    fetchOwnership();
    fetchPontuation ();
  }, []);
 
  async function fetchPontuation () {
    console.log(quizStore.quiz)
    if(quizStore.quiz == true){
      setbugsAdd(quizStore.bugsAdd)
      setcoinsAdd(quizStore.coinsAdd) 
      console.log('bugs '+ bugsAdd + ',coins: ' + bugsAdd)
      finishQuiz()
    }


  }
  

  async function fetchSubscription() {
    setSubscription(false);
    
    if (user && courseid) {
      try {
        const response = await isSubscribed(user?.id, parseInt(courseid));
        setSubscription(response.data.isSubscribed);
        
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
              <Tip variant="rounded">
                <div className={styles.text}>
                  <div>Bugs dos desafios</div>
                  <div className={styles.coins}>
                    <p>+{bugsAdd}</p>
                    <img src={jarTransparent} alt="" />
                  </div>
                </div>
              </Tip>
              <Tip variant="rounded">
                <div className={styles.text}>
                  <div>Moeadas dos desafios</div>
                  <div className={styles.coins}>
                    <p>+ {coinsAdd}</p>
                    <img src={coins} alt="" />
                  </div>
                </div>
              </Tip>
              <div>
                <Button color="green" onClick={handleClick}>
                  Continuar
                </Button>
              </div>
            </center>
          </CenterCard>
        )}
      </div>
    </AppLayout>
  );
};
