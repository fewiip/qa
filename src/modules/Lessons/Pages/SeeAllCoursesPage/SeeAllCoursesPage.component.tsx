import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterContent } from "../../components/CenterContent/CenterContent.component";
import styles from "./SeeAllCoursesPage.module.css";
import { Course, useLessons } from "../../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CourseItem } from "../../components/CourseItem";
/*import { useNavigate } from "react-router-dom";
import { Card } from "../../../../shared/components/Card/Card.component";
import { Button } from "../../../../shared/components/Button/Button.component";*/

import team2_colored from "../../../../assets/images/team2_colored.png";

export const SeeAllCourses = () => {
  const { getCourses } = useLessons();
  const [courses, setCourses] = useState<Course[]>();

  async function fetchCourses() {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch {
      toast.error("Alguma coisa deu errad!");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);
  /*
    function handleClick() {
        navigate('')
    }
    function seeCourse(courseID: number){
        navigate('/courses/'+courseID)
    } */
  return (
    <>
      <AppLayout page="courses" variant="white">
        <div className={styles.contentWrapper}>
          <CenterContent>
          <div className={styles.content}>
              <div className={styles.text}>
                <center>
                  <h1>TURMAS ABERTAS</h1>
                  <img src={team2_colored} alt="" />
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
