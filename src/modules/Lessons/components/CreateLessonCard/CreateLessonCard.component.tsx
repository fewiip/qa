import { FunctionComponent, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { LessonPOST, useLessons } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./CreateLessonCard.module.css";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "../../../../shared/components/Input";
import { Button } from "../../../../shared/components/Button/Button.component";

interface CreateLessonCardProps {
  chapterID: number;
}

export const CreateLessonCard: FunctionComponent<CreateLessonCardProps> = (
  props
) => {
  const {courseid} = useParams();
  const { chapterID } = props;
  const { createLesson } = useLessons();
  const navigate = useNavigate();

  const [lessonName, setLessonName] = useState("");
  const [lessonText, setLessonText] = useState<string | undefined>("");

  async function handleSubmit() {
    //verificando se eh nulo
    if (lessonText !== '' && lessonName !== '') {
      try {
        const lesson: LessonPOST = {
          text: lessonText as string,
          name:  lessonName
        };
   
  
        console.log(lesson);
        const response = await createLesson(lesson, chapterID);
  
        console.log("id da resposta " + response.data.id);
        navigate(`/course/${courseid}/lesson/${response.data.id}`);
      } catch (error) {
        toast.error("Alguma coisa deu errado!");
      }
    }else{
      toast.error("Nome e textos não podem ser nulos");
    }
    
  }

  function handleCancel(){
    navigate(`/course/edit/${courseid}`);
  }

  return (
    <div data-color-mode="light">
      <CenterCard>
        <div className={styles.lessonTitle}>
          <Input
            type="text"
            value={lessonName}
            onChange={(i) => setLessonName(i.target.value)}
          />
        </div>

        <div className={styles.lessonText}>
          <MDEditor value={lessonText} onChange={setLessonText} height="100%" />
        </div>

        <div className={styles.options}>
          <Button
            style={{ padding: "16px", borderRadius: "8px", fontSize: "12px" }}
            onClick={handleSubmit}
          >
            Salvar
          </Button>
          <Button
            style={{ padding: "16px", borderRadius: "8px", fontSize: "12px" }}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </CenterCard>
    </div>
  );
};
