import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Course, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterContent } from "../../components/CenterContent/CenterContent.component";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { CourseItem } from "../../components/CourseItem";
import group2_colored from "../../../../assets/images/group2_colored.png";

import styles from "./CreatedCoursesPage.module.css";

export const CreatedCoursesPage = () => {
  const { getCoursesByOwner } = useLessons();
  const [courses, setCourses] = useState<Course[]>();
  const { user } = useAuthStore();

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

  //getCoursesByOwner
  return (
    <>
      <AppLayout page="courses" variant="white">
        <div className={styles.contentWrapper}>
          <CenterContent>
          <div className={styles.content}>
              <div className={styles.text}>
                <center>
                  <h1>Turmas</h1>
                  <img src={group2_colored} alt="" />
                  <p>Aprenda e ensine o quanto você quiser!</p>
                </center>

                <b>Sobre as turmas:</b>
                <ul>
                  <li>
                    O QA+ permite que você crie e participe de multiplas turmas
                    (além da turma padrã QA+), levando o seu conhecimento além.
                  </li>
                </ul>

                <b>Para gestores de turmas </b>
                <ul>
                  <li>
                    Apoiamos sua autonomia para ensinar! Assim, nas turmas são
                    disponibilizados os mesmos recursos da turma padrão do QA+,
                    mas quem define o conteúdo, exercicios e conquistas é você!
                  </li>
                  <li>
                    Conheça e apoie sua turma: para que possa apoiar o processo
                    de aprendizagem de forma individualizada, permitimos o
                    acompanhamento das estastísticas de cada inscrito em sua
                    turma!
                  </li>
                </ul>
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
