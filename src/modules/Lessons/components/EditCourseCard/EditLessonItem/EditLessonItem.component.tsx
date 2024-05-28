import { FunctionComponent, useState } from "react";
import { Lesson, QuizPOST, useLessons } from "../../../api";
import styles from "./EditLessonItem.module.css";
import { EditQuizItem } from "../EditQuizItem";
import { toast } from "react-toastify";
 
import { Input } from "../../../../../shared/components/Input";
import { Button } from "../../../../../shared/components/Button/Button.component";
import { useNavigate } from "react-router-dom";

interface EditLessonItemProps {
  courseid: number;
  lessonProps: Lesson;
  index: number;
  fetchChapter: () => void;
}

export const EditLessonItem: FunctionComponent<EditLessonItemProps> = (
  props
) => {
  const { courseid, lessonProps, fetchChapter, index } = props;
  const [lesson, setLesson] = useState<Lesson>(lessonProps);
  const [lessonName, setLessonName] = useState(lesson.name);
  const { getLesson, editLesson, deleteLesson, createQuiz } = useLessons();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [quizName, setQuizName] = useState("");
  const navigate = useNavigate();

  async function fetchLesson() {
    try {
      const response = await getLesson(lesson.id);
      setLesson(response.data);
    } catch {
      toast.error("Alguma coisa deu errado!");
    }
  }

  function handleEditNameClick() {
    navigate(`/course/${courseid}/lesson/edit/${lessonProps.id}`)
    //setIsEditing(true);
  }

  async function handleSaveClick() {
    setIsEditing(false);

    try {
      lessonProps.name = lessonName;
      setLesson(lessonProps);

      const payload = {
        name: lessonProps.name,
        text: lesson.text,
      };
      const response = await editLesson(payload, lesson.id);
      console.log(response);
    } catch (error) {
      toast.error("Alguma coisa deu errado!");
    }
  }

  async function handleDeleteLesson() {
    try {
      const response = await deleteLesson(lesson.id);
      console.log(response);
      fetchChapter();
    } catch (error) {
      toast.error("Alguma coisa deu errado!");
      console.log(error);
    }
  }
  function handleCancelEditingClick() {
    setIsEditing(false);
  }

  function handleCreateQuizClick() {
    navigate(`/course/${courseid}/lesson/${lessonProps.id}/quiz/add`);
    //setIsCreatingQuiz(true);
  }
  async function handleCreateQuiz() {
    setIsCreatingQuiz(false);
    setQuizName("");

    try {
      let payload: QuizPOST = {
        name: quizName,
        text: "",
        image: [],
        correctAnswer: 1,
        answerRequests: [
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
          {
            text: "",
          },
        ],
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
              Lição {index + 1}:
              <a href={`/course/${courseid}/lesson/${lesson.id}`}>
                {!isEditing && lessonName}
              </a>
            </div>
            {isEditing && (
              <>
                <Input
                  placeholder="Nome do capítulo"
                  type="text"
                  value={lessonName}
                  onChange={(i) => setLessonName(i.target.value)}
                />
                <div>
                  <Button
                    size="small"
                    style={{ color: "#3b7882" }}
                    onClick={handleSaveClick}
                  >
                    Confirmar
                  </Button>
                </div>
                <div>
                  <Button
                    size="small"
                    style={{ color: "#65aeba" }}
                    onClick={handleCancelEditingClick}
                  >
                    Cancelar
                  </Button>
                </div>
              </>
            )}
          </div>

          <div>
            {!isEditing && (
              <Button size="small" onClick={handleEditNameClick}>
                Editar
              </Button>
            )}
            <Button
              size="small"
              style={{ color: "green" }}
              onClick={handleCreateQuizClick}
            >
              Criar Quiz
            </Button>
            <Button
              size="small"
              style={{ color: "red" }}
              onClick={handleDeleteLesson}
            >
              Excluir
            </Button>
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
                courseID={courseid}
                lessonID={lesson.id}
                fetchLesson={fetchLesson}
                key={k.id}
              />
            </div>
          </li>
        ))}

        {isCreatingQuiz && (
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
                    <Button
                      onClick={handleCreateQuiz}
                      style={{ color: "#3b7882" }}
                      size="small"
                    >
                      Confirmar
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={handleCancelCreateQuiz}
                      style={{ color: "#65aeba" }}
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
        <div className={styles.space}></div>
      </ul>
    </>
  );
};
