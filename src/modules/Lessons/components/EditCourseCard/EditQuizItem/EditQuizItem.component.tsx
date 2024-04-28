import { FunctionComponent, useState } from "react";
import { Quiz, useLessons } from "../../../api";
import styles from './EditQuizItem.module.css'
import { Input } from "../../../../../shared/components/Input";
import { Button } from "../../../../../shared/components/Button/Button.component";

import add1 from "../../../../../assets/images/add1.png";
import add3 from "../../../../../assets/images/add3.png";
import add4 from "../../../../../assets/images/add4.png";
import edit from "../../../../../assets/images/edit.png";
import delete1 from "../../../../../assets/images/delete.png";
import { toast } from "react-toastify";


interface EditQuizItemProps {
    quizProps: Quiz;
    lessonID: number;
    index: number;
    fetchLesson: () => void 
}

export const EditQuizItem: FunctionComponent<EditQuizItemProps> = (props) => {
    const {lessonID, quizProps, index, fetchLesson} = props 
    const [quiz, setQuiz] = useState<Quiz>(quizProps)
    const {editQuiz, deleteQuiz} = useLessons();
    
    const [isEditing, setIsEditing] = useState(false);
    const [quizName, setQuizName] = useState(quiz.name)

    
    function handleEditClick() {
        setIsEditing(true);
    }
    async function handleDeleteQuiz(){
      try{
        const response = await deleteQuiz(quiz.id)
        fetchLesson()
      }catch (error) {
        toast.error('Alguma coisa deu errado!')
      }
      
    }

    async function handleSaveClick(){
      setIsEditing(false)

      try{
        quizProps.name = quizName;
        setQuiz(quizProps)
        const response = await editQuiz(quiz)
      }catch (error) {
        toast.error('Alguma coisa deu errado!')
    }
    }

    function handleCancelEditingClick () {
      setIsEditing(false)
    }

    return (
      <div className={styles.line}>
      <div className={styles.row}>
        Desafio {index + 1}: {!isEditing && <a href={`/lesson/${lessonID}/quiz/${quiz.id}`}>{quizName}</a>  }
        {isEditing && (
          <>
            <Input placeholder='Nome do quiz' type="text" value={quizName} onChange={(i) => setQuizName(i.target.value)} />
            <div>
              <Button size="small" onClick={handleSaveClick}>
                Salvar
              </Button>
            </div>
            <div>
            <Button size="small" onClick={handleCancelEditingClick}>Cancelar</Button>
            </div>
          </>
        )}
        
      </div>
      <div>
        

        {!isEditing && (
          <button className={styles.actionButton} onClick={handleEditClick}>
            <img src={edit} alt="editar o quiz" />
          </button>
        )}
        <button className={styles.actionButton} onClick={handleDeleteQuiz}>
            <img src={delete1} alt="deletar o quiz" />
          </button>
      </div>
    </div>
    );

}