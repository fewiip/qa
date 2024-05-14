import { FunctionComponent, useState } from "react";
import { Chapter, ChapterPOST, LessonPOST, useLessons } from "../../../api"; 
import { Input } from "../../../../../shared/components/Input";
import { Button } from "../../../../../shared/components/Button/Button.component";
import { toast } from "react-toastify";
import styles from "./EditChapterItem.module.css";
 
import add3 from "../../../../../assets/images/add3.png"; 
import edit from "../../../../../assets/images/edit.png";
import delete1 from "../../../../../assets/images/delete.png";
import { EditLessonItem } from "../EditLessonItem";

interface EditChapterItemProps {
  chapterProps: Chapter;
  index: number;
  fetchCourse: () => void 
}

export const EditChapterItem: FunctionComponent<EditChapterItemProps> = (
  props
) => {
  const { chapterProps, fetchCourse, index } = props;
  const { getChapter, editChapter, deleteChapter, createLesson,  } = useLessons(); 
  const [chapter, setChapter] = useState<Chapter>(chapterProps);
  const [chapterName, setChapterName] = useState(chapter.name);
  const [lessonName, setLessonName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingLesson, setIsCreatingLesson] = useState(false);

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
    try{
      await deleteChapter(chapter.id)
      fetchCourse()
    }catch (error) {
      toast.error('Alguma coisa deu errado!')
    }
  }

  function handleCreateLessonClick() {
    setIsCreatingLesson(true);
  }
  async function handleCreateLesson() {
    setIsCreatingLesson(false);
    setLessonName('')
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
                <div>
                  <Button size="small" onClick={handleSaveClick}>
                    Salvar
                  </Button>
                </div>
                <div>
                  <Button size="small" onClick={handleCancelEditingClick}>
                    Cancelar
                  </Button>
                </div>
              </>
            )}
          </div>
          <div>
          {!isEditing && (
              <button className={styles.actionButton} onClick={handleEditNameClick}>
                <img src={edit} alt="editar o capitulo" />
              </button>
            )}
            <button
              className={styles.actionButton}
              onClick={handleCreateLessonClick}
            >
              <img src={add3} alt="criar uma lição" />
            </button>
            <button
              className={styles.actionButton}
              onClick={handleDeleteChapter}
            >
              <img src={delete1} alt="deletar o capitulo" />
            </button>
            
          </div>
        </div>
      </div>
      <ul className={styles.listBlock}>
        {chapter.lessons.map((j, index) => (
          <li>
            <EditLessonItem lessonProps={j} index={index} key={j.id} fetchChapter={fetchChapter}/>
          </li>
        ))}

        {isCreatingLesson && 
          <li>
            <div className={styles.listItemLesson}>
              <div className={styles.line}>
                <div className={styles.row}>
                  <div className={styles.chapterNumber}>Nova Lição:</div>

                  <Input
                    placeholder="Nome da Lição"
                    type="text"
                    value={lessonName}
                    onChange={(i) => setLessonName(i.target.value)}
                  />
                  <div>
                    <Button onClick={handleCreateLesson} size="small">
                      Criar Lição
                    </Button>
                  </div>
                  <div>
                    <Button onClick={handleCancelCreateLesson} size="small">
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        }
      </ul>
    </>
  );
};
