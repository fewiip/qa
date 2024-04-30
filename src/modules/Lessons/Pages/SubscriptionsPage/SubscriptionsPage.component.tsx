import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Course, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Card } from "../../../../shared/components/Card/Card.component";
import { CenterContent } from "../../components/CenterContent/CenterContent.component";
import styles from "./SubscriptionsPage.module.css";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";

export const SubscriptionsPage = () => {
  const { getCourses, getSubscribedCourses } = useLessons();
  const [courses, setCourses] = useState<Course[]>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  async function fetchCourses() {
    try {
      if (user) {
        console.log('user id:  ' + user.id)
        const response = await getSubscribedCourses(user?.id);
        setCourses(response.data);
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
            {courses?.map((i) => (
              <Card>
                <div className={styles.cardTitle}> {i.name} </div>
                <div className={styles.teacher}> {i.owner}</div>
                <Button>Solicitar entrar</Button>
                <div>
                  <a href={`/courses/edit/${i.id}`}>Ver turma</a>
                </div>
              </Card>
            ))}
          </CenterContent>
        </div>
      </AppLayout>
    </>
  );
};
