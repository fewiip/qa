import { Button } from "../../../../shared/components/Button/Button.component";
import { Input } from "../../../../shared/components/Input";
import { FunctionComponent, useEffect, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { ChapterPOST, Course, useLessons } from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./CourseCard.module.css";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";

import add1 from "../../../../assets/images/add1.png";
import add3 from "../../../../assets/images/add3.png";
import add4 from "../../../../assets/images/add4.png";
import edit from "../../../../assets/images/edit.png";
import delete1 from "../../../../assets/images/delete.png";

interface CourseCardProps {
  courseid: number;
}
export const CourseCard: FunctionComponent<CourseCardProps> = (props) => {
  const { user } = useAuthStore();
  const { courseid } = props;
  const { getCourse, createChapter } = useLessons();
  const [course, setCourse] = useState<Course>();
  const [chapterName, setChapterName] = useState("");
  let message = "tudo ok";
  const navigate = useNavigate();

  async function fetchCourse() {
    try {
      const response = await getCourse(courseid);
      setCourse(response.data);
    } catch {
      toast.error("Alguma coisa deu errad!");
      message = "ID não encontrado";
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
                <li>
                  <div className={styles.listItemChapter}>
                    <div className={styles.line}> Capitulo {index + 1}: {i.name}</div>
                  </div>
                  <ul className={styles.listBlock}>
                    {i.lessons.map((j, index) => (
                      <li>
                        <div className={styles.listItemLesson}>
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
                            <li>
                              <div className={styles.listItemQuiz}>
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
