import { FunctionComponent, useState } from "react";
import { Lesson, QuizPOST, useLessons } from "../../../api";
import styles from "./EditLessonItem.module.css";
import { EditQuizItem } from "../EditQuizItem";
import { toast } from "react-toastify";

import add1 from "../../../../../assets/images/add1.png";
import add3 from "../../../../../assets/images/add3.png";
import add4 from "../../../../../assets/images/add4.png";
import edit from "../../../../../assets/images/edit.png";
import delete1 from "../../../../../assets/images/delete.png";
import { Input } from "../../../../../shared/components/Input";
import { Button } from "../../../../../shared/components/Button/Button.component";

interface EditLessonItemProps {
  lessonProps: Lesson;
  index: number;
  fetchChapter: () => void
}

export const EditLessonItem: FunctionComponent<EditLessonItemProps> = (
  props
) => {
  const { lessonProps, fetchChapter, index } = props;
  const [lesson, setLesson] = useState<Lesson>(lessonProps);
  const [lessonName, setLessonName] = useState(lesson.name);
  const { getLesson, editLesson, deleteLesson, createQuiz } = useLessons();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [quizName, setQuizName] = useState('')
  
  async function fetchLesson(){
    try{
        const response = await getLesson(lesson.id)
        setLesson(response.data)
    }catch{
      toast.error('Alguma coisa deu errado!')
    }
  }
  
  function handleEditNameClick() {
    setIsEditing(true);
  }

  async function handleSaveClick() {
    setIsEditing(false);

    try {
      lessonProps.name = lessonName;
      const response = await editLesson(lessonProps);
      setLesson(response.data);
    } catch (error) {
      toast.error('Alguma coisa deu errado!')
  }
  

  }

  async function handleDeleteLesson() {
    try{
      const response = await deleteLesson(lesson.id)
      fetchChapter()
    }catch (error) {
      toast.error('Alguma coisa deu errado!')
      console.log(error)
    }

  }
  function handleCancelEditingClick() {
    setIsEditing(false);
  } 

  function handleCreateQuizClick() {
    setIsCreatingQuiz(true);
  }
  async function handleCreateQuiz() {
    setIsCreatingQuiz(false);
    setQuizName('')

    try {
      let payload: QuizPOST = {
        name: quizName,
        text: "",
        image: [],
        correctAnswer: 1,
        answerRequests: [
          {
            text: ""
          },
          {
            text: ""
          },
          {
            text: ""
          },
          {
            text: ""
          },
          {
            text: ""
          }
        ]
      };
      const response = await createQuiz(payload, lesson.id);
      console.log(response.data);
      fetchLesson();
    } catch (error) {
      toast.error("Alguma coisa deu errado!");
    }
  }
  function handleCancelCreateQuiz() {
    setIsCreatingQuiz(false);
  }
  
  return (
    <>
      <div className={styles.listItemLesson}>
        <div className={styles.line}>
          <div className={styles.row}>
            <div className={styles.chapterNumber}>
              <a href={`/lesson/${lesson.id}`}>Lição {index + 1}:</a>
              {!isEditing && lessonName}
            </div>
            {isEditing && (
              <>
                <Input
                  placeholder="Nome do capitulo"
                  type="text"
                  value={lessonName}
                  onChange={(i) => setLessonName(i.target.value)}
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
                <img src={edit} alt="" />
              </button>
            )}
            <button className={styles.actionButton} onClick={handleCreateQuizClick}>
                <img src={add4} alt="" />
            </button>
            <button className={styles.actionButton} onClick={handleDeleteLesson}>
                <img src={delete1} alt="" />
            </button>
          </div>
        </div>
      </div>

      <ul className={styles.listBlock}>
        {lesson.quizzes.map((k, index) => (
          <li>
            <div className={styles.listItemQuiz}>
              <EditQuizItem
                quizProps={k}
                index={index}
                lessonID={lesson.id}
                fetchLesson={fetchLesson}
                key={k.id}
              />
            </div>
          </li>
        ))}

        {isCreatingQuiz && 
        <li>
        <div className={styles.listItemQuiz}>
          <div className={styles.line}>
            <div className={styles.row}>
              <div className={styles.chapterNumber}>Novo Quiz:</div>

              <Input
                placeholder="Nome do Quiz"
                type="text"
                value={quizName}
                onChange={(i) => setQuizName(i.target.value)}
              />
              <div>
                <Button onClick={handleCreateQuiz} size="small">
                  Criar Lição
                </Button>
              </div>
              <div>
                <Button onClick={handleCancelCreateQuiz} size="small">
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </li>}
        <div className={styles.space}></div>
      </ul>
    </>
  );
};
