import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Subscription, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterContent } from "../../components/CenterContent/CenterContent.component";
import styles from "./SubscriptionsPage.module.css";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { SubscribedCoursesItem } from "../../components/SubscribedCourseItem";

import team1_colored from "../../../../assets/images/team1_colored.png";

export const SubscriptionsPage = () => {
  const { getSubscribedCourses } = useLessons();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();
  const { user } = useAuthStore();

  async function fetchCourses() {
    try {
      if (user) {
        console.log("user id:  " + user.id);
        const response = await getSubscribedCourses(user?.id);
        setSubscriptions(response.data);
      }
    } catch {
      toast.error("Alguma coisa deu errad!");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <AppLayout page="courses" variant="white">
        <div className={styles.contentWrapper}>
          <CenterContent>
            <div className={styles.content}>
              <div className={styles.text}>
                <center>
                  <h1>MINHAS INSCRIÇÕES</h1>
                  <img src={team1_colored} alt="" />
                  <p>Acompanhe todas as suas inscrições</p>
                </center>

                <b>Sobre as minhas inscrições:</b>
                <ul>
                  <li>
                    O QA+ permite que você acompanhe cursos feitos por outros gestores. 
                  </li>
                  <li>
                    Reveja os conteudos de seu interesse e reforce os seus conhecimentos através dos nossos quizzes.
                  </li>
                </ul>
 
              </div>
              <div className={styles.cards}>
                {subscriptions?.map((i) => (
                  <SubscribedCoursesItem course={i.course} />
                ))}
              </div>
            </div>
          </CenterContent>
        </div>
      </AppLayout>
    </>
  );
};
