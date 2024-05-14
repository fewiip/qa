import { Input } from "../../../../shared/components/Input";
import { FunctionComponent, useEffect, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { ChapterPOST, Course, useLessons } from "../../api";
import { toast } from "react-toastify"; 
import styles from "./EditCourseCard.module.css"; 

import add1 from "../../../../assets/images/add1.png"; 
import { EditChapterItem } from "./EditChapterItem"; 
import { Button } from "../../../../shared/components/Button/Button.component";

interface EditCourseCardProps {
  courseid: number;
}
export const EditCourseCard: FunctionComponent<EditCourseCardProps> = (props) => {
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

  
  function handleCreateChapterClick(){
    setIsCreatingChapter(true)
  }

  function handleCancelCreateChapterClick (){
    setIsCreatingChapter(false)
  }

  async function handleCreateChapter() {
    setIsCreatingChapter(false)
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
      <CenterCard>
        <div className={styles.title}>Hirarquia dos conteudos</div>
        {!course && <p>ID não encontrado</p>}
        {course && (
          <div>
            <div className={styles.listItemCourse}>
              <div className={styles.line}>
                <div>{course?.name}</div>
                <div>
                  <button className={styles.actionButton} onClick={handleCreateChapterClick}>
                    <img src={add1} alt="" />
                  </button>
                </div>
              </div>
            </div>
            <ul className={styles.listBlock}>
              {course.chapters.map((i, index) => (
                <li>
                  
                    <EditChapterItem index={index} chapterProps={i} key={i.id} fetchCourse={fetchCourse} />
                  
                  
                </li>
              ))}
              <li>
                {isCreatingChapter && 
                    <div className={styles.listItemChapter}>
                        <Input
                            placeholder="Nome do capitulo"
                            value={chapterName}
                            onChange={(i) => setChapterName(i.target.value)}
                        ></Input>
                        <Button onClick={handleCreateChapter}>Criar Capitulo</Button>
                        <Button onClick={handleCancelCreateChapterClick}>Cancelar</Button>
                    </div>
                }
              </li>
            </ul>
          </div>
        )}

        
      </CenterCard>
    </>
  );
};
