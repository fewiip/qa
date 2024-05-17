import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterCard } from "../../components/CenterCard"; 
import professor2_happy from "../../../../assets/images/professor2_happy.png";
import { Button } from "../../../../shared/components/Button/Button.component";

import styles from "./IntroQuizPage.module.css";
import { useEffect, useState } from "react";
import { Lesson, useLessons } from "../../api";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { Tip } from "../../../../shared/components/Tip";

export const IntroQuizPage = () => {
  const { lessonid, courseid } = useParams();
  const [ownership, setOwnership] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { getLesson, isSubscribed, isCourseOwner } = useLessons();
  const [lesson, setLesson] = useState<Lesson>();

  async function fetchLesson() {
    const response = await getLesson(parseInt(lessonid as string));
    setLesson(response.data);
  }

  useEffect(() => {
    fetchLesson();
    fetchSubscription();
    fetchOwnership();
  }, []);

  function handleQuizClick() {
    navigate(
      `/course/${courseid}/lesson/${lesson?.id}/quiz/${lesson?.quizzes[0].id}`
    );
  }

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
    <>
      <AppLayout variant="grey">
        <div className={styles.contentWrapper}>
          <CenterCard>
            {(subscription || ownership) && (
              <>
                <center>
                  <h1 className={styles.header}>Pronto para começar?</h1>
                  <p>Algumas dicas antes de começar o quiz:</p>
                  <div className={styles.parent}>
                    <div className={styles.image}>
                      <img src={professor2_happy} alt="" />
                    </div>
                  </div>
                  <Tip variant="rounded">
                    O Quiz é composto por algumas perguntas da aula que você
                    acabou de ler
                  </Tip>
                  <Tip variant="rounded">
                    Você ganha um bug a resposta certa
                  </Tip>
                  <Tip variant="rounded">
                    Se você errou nem tudo está perdido! Se você ainda possuir
                    algum refil, ele permite que ainda ganhe o bug da pergunta
                  </Tip>
                  <Tip variant="rounded">
                    Se você tiver algum refil, ele será gasto automaticamente se
                    errar uma questão
                  </Tip>
                  <div>
                    <Button color="green" onClick={handleQuizClick}>
                      Começar!
                    </Button>
                  </div>
                </center>
              </>
            )}
          </CenterCard>
        </div>
      </AppLayout>
    </>
  );
};
