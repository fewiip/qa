import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Course, Subscription, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterContent } from "../../components/CenterContent/CenterContent.component";

import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";

import { Card } from "../../../../shared/components/Card/Card.component";

import team1_colored from "../../../../assets/images/team1_colored.png";
import styles from "./HomePage.module.css";
import { MiniCourseItem } from "../../components/MiniCourseItem";
import { Button } from "../../../../shared/components/Button/Button.component";
export const HomePage = () => {
  const [courses, setCourses] = useState<Course[]>();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();
  const { getCourses, getSubscribedCourses } = useLessons();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  async function fetchCourses() {
    try {
      if (user) {
        const response = await getSubscribedCourses(user?.id);
        setSubscriptions(response.data);
        const response3 = await getCourses();
        setCourses(response3.data);
      }
    } catch {
      toast.error("Alguma coisa deu errad!");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  function handleClickCourse() {
    if (subscriptions) {
      navigate("/courses/" + subscriptions[0].course.id + "/lessons");
    }
  }

  function seeAllCoursesClick () {
    navigate('/courses/all')
  }

  return (
    <>
      <AppLayout page="lessons" variant="white">
        <div className={styles.contentWrapper}>
          <CenterContent>
            <div className={styles.line}>
                
                    { (subscriptions && Boolean(subscriptions.length)) ? (
              <Card>
                <div className={styles.cardTitle}>Continue estudando</div>
                <div>
                 Continue estudando e praticando os conteúdos de um dos cursos que você está inscrito.
                </div>
                <div  className={styles.space}></div>
                <div>
                  <div className={styles.row}>
                    <div>
                      <img src={team1_colored} alt="" />
                    </div>
                      <div className={styles.column}>
                        <div>
                          <b>{subscriptions[0].course.name}</b>
                        </div>
                        <div className={styles.teacher}>
                          por: {subscriptions[0].course.ownerName}{" "}
                          {subscriptions[0].course.ownerLastName}
                        </div>
                        <Button onClick={handleClickCourse}>Acessar</Button>
                      </div>
                  </div>
                </div>
              </Card>
                    ) : 
                    
              <Card>
                <div className={styles.cardTitle}>Bem-vindo!!!</div>
                <div>
                  Parece que essa é a sua primeira vez acessando o QA+, como
                  primeiro passo, nós recomendamos entrar na seguinte turma,
                  você tembém pode pesquisar ou ver todas as turmas abertas no
                  QA+.
                </div>
                <div>
                  <div className={styles.row}>
                    <div>
                      <img src={team1_colored} alt="" />
                    </div>
                    {courses && Boolean(courses.length) && (
                      <MiniCourseItem course={courses[0]} />
                    )}
                  </div>
                </div>
              </Card>
                    }
              <Card>
                <div className={styles.cardTitle}>Turmas abertas</div>
                <div>
                  Você também pode descobrir outras turmas que podem ser de seu
                  interesse.
                </div>
                <div className={styles.space}></div>
                <Button onClick={seeAllCoursesClick}>Ver turmas abertas</Button>
              </Card>
            </div>
          </CenterContent>
        </div>
      </AppLayout>
    </>
  );
};
