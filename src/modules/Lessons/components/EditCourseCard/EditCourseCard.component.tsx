import { Input } from "../../../../shared/components/Input";
import { FunctionComponent, useEffect, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { ChapterPOST, Course, useLessons } from "../../api";
import { toast } from "react-toastify";
import styles from "./EditCourseCard.module.css";

import { EditChapterItem } from "./EditChapterItem";
import { Button } from "../../../../shared/components/Button/Button.component";

interface EditCourseCardProps {
  courseid: number;
}
export const EditCourseCard: FunctionComponent<EditCourseCardProps> = (
  props
) => {
  const { courseid } = props;
  const { getCourse, createChapter } = useLessons();
  const [course, setCourse] = useState<Course>();
  const [chapterName, setChapterName] = useState("");

  const [isCreatingChapter, setIsCreatingChapter] = useState(false);

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

  function handleCreateChapterClick() {
    setIsCreatingChapter(true);
  }

  function handleCancelCreateChapterClick() {
    setIsCreatingChapter(false);
  }

  async function handleCreateChapter() {
    setIsCreatingChapter(false);
    try {
      let chapter: ChapterPOST = {
        name: chapterName,
      };
      console.log(course);
      const response = await createChapter(chapter, courseid);
      console.log(response.data.id);
      fetchCourse();
    } catch (error) {
      toast.error("Alguma coisa deu errado!");
    }
  }
  return (
    <>
      <CenterCard variant="withoutOverflow">
        <div className={styles.title}>Hirarquia dos conteudos</div>
        {!course && <p>ID não encontrado</p>}
        {course && (
          <div>
            <div className={styles.listItemCourse}>
              <div className={styles.line}>
                <div>{course?.name}</div>
                <div>
                <Button size="small"
                    onClick={handleCreateChapterClick}
                    style={{color: 'green'}}
                  >
                    Criar Capitulo
                  </Button>
                </div>
              </div>
            </div>
            <ul className={styles.listBlock}> 
              {Boolean(course.chapters.length) ? (
                <>
                  {course.chapters.map((i, index) => (
                    <li>
                      <EditChapterItem
                        index={index}
                        courseid={courseid}
                        chapterProps={i}
                        key={i.id}
                        fetchCourse={fetchCourse}
                      />
                    </li>
                  ))}
                </>
              ) : (
                 !isCreatingChapter && (<li>
                  <div className={styles.listItemChapter}>
                    <center>Nenhum conteudo</center>
                  </div>
                </li>)
              )}
              {isCreatingChapter && (
                <li>
                  <div className={styles.listItemChapter}>
                    <div className={styles.line}>
                      <div className={styles.row}>
                        <div>Novo Capitulo:</div>
                        <div>
                          <Input
                            placeholder="Nome do capitulo"
                            value={chapterName}
                            onChange={(i) => setChapterName(i.target.value)}
                          ></Input>
                        </div>
                      </div>
                      <div className={styles.row}>
                        <div>
                          <Button onClick={handleCreateChapter}
                          style={{color: '#3b7882'}}
                           size="small">
                            Confirmar
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={handleCancelCreateChapterClick}
                            style={{color: '#65aeba'}}
                            size="small"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        )}
      </CenterCard>
    </>
  );
};
