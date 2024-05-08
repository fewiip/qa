import { FunctionComponent, useEffect, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { Course, useLessons } from "../../api";
import { toast } from "react-toastify"; 
import styles from "./CourseCard.module.css"; 
 
interface CourseCardProps {
  courseid: number;
}
export const CourseCard: FunctionComponent<CourseCardProps> = (props) => {
  const { courseid } = props;
  const { getCourse } = useLessons();
  const [course, setCourse] = useState<Course>();  

  async function fetchCourse() {
    try {
      const response = await getCourse(courseid);
      setCourse(response.data);
    } catch {
      toast.error("Alguma coisa deu errad!"); 
    }
  }

  useEffect(() => {
    fetchCourse();
  }, []);
 
  return (
    <>
      <CenterCard>
        <div className={styles.title}>Hirarquia dos conteudos</div>
        {!course && <p>ID não encontrado</p>}
        {course && (
          <div>
            <div className={styles.listItemCourse}>
              <div className={styles.line}>
                <div>{course?.name}</div> 
              </div>
            </div>
            <ul className={styles.listBlock}>
              {course.chapters.map((i, index) => (
                <li key={i.id}>
                  <div className={styles.listItemChapter} >
                    <div className={styles.line}> Capitulo {index + 1}: {i.name}</div>
                  </div>
                  <ul className={styles.listBlock}>
                    {i.lessons.map((j, index) => (
                      <li key={j.id}>
                        <div className={styles.listItemLesson} >
                          <div className={styles.line}>
                            <div>
                              <a href={`/lesson/${j.id}`}>
                                Lição {index + 1}: {j.name}
                              </a>
                            </div> 
                          </div>
                        </div>
                        <ul className={styles.listBlock}>
                          {j.quizzes.map((k, index) => (
                            <li key={k.id}>
                              <div className={styles.listItemQuiz} >
                                <a href={`/lesson/${j.id}/quiz/${k.id}`}>
                                  Desafio {index + 1}: {k.name}
                                </a>
                              </div>
                            </li>
                          ))}
                          <div className={styles.space}></div>
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CenterCard>
    </>
  );
};
