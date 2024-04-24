import { FunctionComponent, useState } from "react";
import { Quiz } from "../../../api";
import styles from './EditQuizLine.module.css'

import add1 from "../../../../assets/images/add1.png";
import add3 from "../../../../assets/images/add3.png";
import add4 from "../../../../assets/images/add4.png";
import edit from "../../../../assets/images/edit.png";
import delete1 from "../../../../assets/images/delete.png";


interface EditQuizLineProps {
    quiz: Quiz;
    index: number
}

export const EditQuizLine: FunctionComponent<EditQuizLineProps> = (props) => {
    const {Quiz, index} = props 

    
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing(true);
    }
    function handleDeleteQuiz(){
        
    }

    return (
        <div className={styles.line}>
      <div className={styles.row}>
        Capitulo {index + 1}: {!isEditing && chapterName}
        {isEditing && (
          <>
            <Input placeholder='Nome do capitulo' type="text" value={chapterName} onChange={(i) => setChapterName(i.target.value)} />
            <div>
              <Button size="small" onClick={handleSaveClick}>
                Salvar
              </Button>
            </div>
            <div>
            <Button size="small" onClick={handleCancelClick}>Cancelar</Button>
            </div>
          </>
        )}
        {/*
        <a href={`/chapter/${chapter?.id}/lesson/add`}>(Criar uma Lição)</a>
        */}
      </div>
      <div>
        <button className={styles.actionButton} onClick={handleCreateChapter}>
          <img src={add3} alt="criar uma lição" />
        </button>

        {!isEditing && (
          <button className={styles.actionButton} onClick={handleEditClick}>
            <img src={edit} alt="editar o capitulo" />
          </button>
        )}
      </div>
    </div>
    );

}