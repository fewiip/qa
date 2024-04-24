import { FunctionComponent, useState } from "react";
import { Chapter, ChapterPOST, useLessons } from "../../api";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../../shared/components/Input";
import { Button } from "../../../../shared/components/Button/Button.component";

import styles from "./EditChapterLine.module.css";

import add1 from "../../../../assets/images/add1.png";
import add3 from "../../../../assets/images/add3.png";
import add4 from "../../../../assets/images/add4.png";
import edit from "../../../../assets/images/edit.png";
import delete1 from "../../../../assets/images/delete.png";

interface EditChapterLineProps {
  chapter: Chapter;
  index: number;
}

export const EditChapterLine: FunctionComponent<EditChapterLineProps> = (props) => {
  const { chapter, index } = props;
  const { editChapter } = useLessons();
  const navigate = useNavigate()
  
  const [chapterName, setChapterName] =useState(chapter.name)
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(true);
  }

  async function handleSaveClick() {
    setIsEditing(false)

    try{
        const payload:ChapterPOST = {
            name: chapterName
        }
        const response = await editChapter(payload, chapter.id)
        setChapterName(response.data.name)
    }catch{

    }
  }
  function handleCancelClick() {
    setIsEditing(false);
  }

  function handleCreateChapter(){
    navigate(`/chapter/${chapter?.id}/lesson/add`)
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
};
