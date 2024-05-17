import { FunctionComponent, useState } from "react";
import { Quiz, useLessons } from "../../../api";
import styles from "./EditQuizItem.module.css";
import { Input } from "../../../../../shared/components/Input";
import { Button } from "../../../../../shared/components/Button/Button.component";
 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface EditQuizItemProps {
  quizProps: Quiz;
  courseID: number;
  lessonID: number;
  index: number;
  fetchLesson: () => void;
}

export const EditQuizItem: FunctionComponent<EditQuizItemProps> = (props) => {
  const { courseID, lessonID, quizProps, index, fetchLesson } = props;
  const [quiz, setQuiz] = useState<Quiz>(quizProps);
  const { editQuiz, deleteQuiz } = useLessons();

  const [isEditing, setIsEditing] = useState(false);
  const [quizName, setQuizName] = useState(quiz.name);
  const navigate = useNavigate();
  
  function handleEditClick() {
    //setIsEditing(true);
    navigate(`/course/${courseID}/lesson/${lessonID}/quiz/edit/${quizProps.id}`)
  }
  async function handleDeleteQuiz() {
    try {
      const response = await deleteQuiz(quiz.id);
      console.log(response);
      fetchLesson();
    } catch (error) {
      toast.error("Alguma coisa deu errado!");
    }
  }

  async function handleSaveClick() {
    setIsEditing(false);
    try {
      quizProps.name = quizName;
      setQuiz(quizProps);

      const payload = {
        name: quiz.name,
        text: quiz.text,
        image: quiz.image,
        correctAnswer: quiz.correctAnswer,
        answerRequests: quiz.answer,
      };
      const response = await editQuiz(payload, quiz.id);
      console.log(response);
    } catch (error) {
      toast.error("Alguma coisa deu errado!");
    }
  }

  function handleCancelEditingClick() {
    setIsEditing(false);
  }

  return (
    <div className={styles.line}>
      <div className={styles.row}>
        Desafio {index + 1}:{" "}
        {!isEditing && (
          <a href={`/course/${courseID}/lesson/${lessonID}/quiz/${quiz.id}`}>
            {quizName}
          </a>
        )}
        {isEditing && (
          <>
            <Input
              placeholder="Nome do quiz"
              type="text"
              value={quizName}
              onChange={(i) => setQuizName(i.target.value)}
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
          <>
            <Button size="small" onClick={handleEditClick}>
              Editar
            </Button>
            <Button
              size="small"
              style={{ color: "red" }}
              onClick={handleDeleteQuiz}
            >
              Excluir
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
