import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Course, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterContent } from "../../components/CenterContent/CenterContent.component";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { CourseItem } from "../../components/CourseItem";
import team5_colored from "../../../../assets/images/team5_coloed.png";

import styles from "./CreatedCoursesPage.module.css";
import { Button } from "../../../../shared/components/Button/Button.component";
import { useNavigate } from "react-router-dom";

export const CreatedCoursesPage = () => {
  const { getCoursesByOwner } = useLessons();
  const [courses, setCourses] = useState<Course[]>();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  async function fetchCourses() {
    try {
      if (user) {
        const response = await getCoursesByOwner(user.id);
        setCourses(response.data);
      }
    } catch {
      toast.error("Alguma coisa deu errad!");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  function handleClick() {
    navigate("/courses/add");
  }

  return (
    <>
      <AppLayout page="courses" variant="white">
        <div className={styles.contentWrapper}>
          <CenterContent>
            <div className={styles.content}>
              <div className={styles.text}>
                <center>
                  <h1>MINHAS TURMAS</h1>
                  <img src={team5_colored} alt="" />
                  <p>Aqui são listadas as turmas que você criou!</p>
                </center>

                <b>Sobre as minhas turmas:</b>
                <ul>
                  <li>Gerencie todas as turmas que você criou.</li>
                  <li>Você pode manter turmas e lições.</li>
                  <li>
                    Além disso, você pode manter quizzes para exercitar os
                    conhecimentos de seus estudantes.
                  </li>
                </ul>
                <center>
                  <Button onClick={handleClick}>Criar Turma</Button>
                </center>
              </div>
              <div className={styles.cards}>
                {courses?.map((i) => (
                  <CourseItem course={i} />
                ))}
              </div>
            </div>
          </CenterContent>
        </div>
      </AppLayout>
    </>
  );
};
