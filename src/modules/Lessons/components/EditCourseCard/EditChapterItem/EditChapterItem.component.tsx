import { FunctionComponent, useState } from "react";
import { Chapter, ChapterPOST, useLessons } from "../../../api";
import { Input } from "../../../../../shared/components/Input";
import { Button } from "../../../../../shared/components/Button/Button.component";
import { toast } from "react-toastify";
import styles from "./EditChapterItem.module.css";
 
import { EditLessonItem } from "../EditLessonItem";
import { useNavigate } from "react-router-dom";

interface EditChapterItemProps {
  courseid: number;
  chapterProps: Chapter;
  index: number;
  fetchCourse: () => void;
}

export const EditChapterItem: FunctionComponent<EditChapterItemProps> = (
  props
) => {
  const { courseid, chapterProps, fetchCourse, index } = props;
  const { getChapter, editChapter, deleteChapter } = useLessons();
  const [chapter, setChapter] = useState<Chapter>(chapterProps);
  const [chapterName, setChapterName] = useState(chapter.name);
  const [lessonName, setLessonName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);
  const navigate = useNavigate()

  async function fetchChapter() {
    try {
      const response = await getChapter(chapter.id);
      setChapter(response.data);
    } catch {
      toast.error("Alguma coisa deu errad!");
    }
  }

  function handleEditNameClick() {
    setIsEditing(true);
  }

  async function handleSaveClick() {
    setIsEditing(false);

    try {
      const payload: ChapterPOST = {
        name: chapterName,
      };
      const response = await editChapter(payload, chapter.id);
      setChapterName(response.data.name);
    } catch {}
  }
  function handleCancelEditingClick() {
    setIsEditing(false);
  }

  async function handleDeleteChapter() {
    try {
      await deleteChapter(chapter.id);
      fetchCourse();
    } catch (error) {
      toast.error("Alguma coisa deu errado!");
    }
  }

  function handleCreateLessonClick() {
    navigate(`/course/${courseid}/chapter/${chapterProps.id}/lesson/add`)
    //setIsCreatingLesson(true);
  }
  async function handleCreateLesson() {
    /*
    navigate(`/course/${courseid}/chapter/${chapterProps.id}/lesson/add`)
    setIsCreatingLesson(false);
    setLessonName("");
    try {
      let lesson: LessonPOST = {
        name: lessonName,
        text: "",
      };
      const response = await createLesson(lesson, chapter.id);
      console.log(response.data);
      fetchChapter();
    } catch (error) {
      toast.error("Alguma coisa deu errado!");
    }
    */
  }
  function handleCancelCreateLesson() {
    setIsCreatingLesson(false);
  }

  return (
    <>
      <div className={styles.listItemChapter}>
        <div className={styles.line}>
          <div className={styles.row}>
            <div className={styles.chapterNumber}>
              Capitulo {index + 1}: {!isEditing && chapterName}
            </div>

            {isEditing && (
              <>
                <Input
                  placeholder="Nome do capitulo"
                  type="text"
                  value={chapterName}
                  onChange={(i) => setChapterName(i.target.value)}
                />
              </>
            )}
          </div>
          <div>
            <div>
              {isEditing && (
                <>
                  <div className={styles.row}>
                    <div>
                      <Button size="small" 
                      style={{color: '#3b7882'}}
                      onClick={handleSaveClick}>
                        Salvar
                      </Button>
                    </div>
                    <div>
                      <Button 
                      size="small" 
                      style={{color: '#65aeba'}}
                      onClick={handleCancelEditingClick}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {!isEditing && (
              <>
                <div className={styles.row}>
                <div>
                <Button size="small" 
                  onClick={handleEditNameClick}
                >
                  Renomear
                </Button>

                </div>
                <div>
                <Button size="small" 
                style={{color: 'green'}}
                  onClick={handleCreateLessonClick}
                >
                  Criar lição
                </Button>
                </div>
                <div>
                <Button  size="small" 
                style={{color: 'red'}}
                  onClick={handleDeleteChapter}
                >
                  Excluir
                </Button>
                </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ul className={styles.listBlock}>
        {chapter.lessons.map((j, index) => (
          <li>
            <EditLessonItem
              lessonProps={j}
              index={index}
              key={j.id}
              courseid={courseid}
              fetchChapter={fetchChapter}
            />
          </li>
        ))}

        {isCreatingLesson && (
          <li>
            <div className={styles.listItemLesson}>
              <div className={styles.line}>
                <div className={styles.row}>
                  <div>Nova Lição:</div>

                  <div>
                    <Input
                      placeholder="Nome da Lição"
                      type="text"
                      value={lessonName}
                      onChange={(i) => setLessonName(i.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div>
                    <Button onClick={handleCreateLesson}
                    style={{color: '#3b7882'}}
                    size="small">
                      Criar Lição
                    </Button>
                  </div>
                  <div>
                    <Button onClick={handleCancelCreateLesson} 
                    style={{color: '#65aeba'}}
                    
                     size="small">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </>
  );
};
