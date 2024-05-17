import { FunctionComponent, useEffect, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import { Lesson, LessonPOST, useLessons } from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./EditLessonCard.module.css";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "../../../../shared/components/Input";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Tip } from "../../../../shared/components/Tip";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";

interface EditLessonCardProps {
  lesson: Lesson;
  courseid: number;
}

export const EditLessonCard: FunctionComponent<EditLessonCardProps> = (
  props
) => {
  const { lesson, courseid } = props;
  const { editLesson, isCourseOwner } = useLessons();
  const navigate = useNavigate();
  const [ownership, setOwnership] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchOwnership();
  }, []);

  async function fetchOwnership() {
    setOwnership(false);
    if (user && courseid) {
      try {
        const response = await isCourseOwner(user?.id, courseid);
        setOwnership(response.data.isOwner);
        console.log(response);
      } catch (error) {
        setOwnership(false);
      }
    }
  }

  //const  [ questoes, setQuestoes] = useState([]);

  const [lessonName, setlessonName] = useState(lesson?.name);
  const [lessonText, setlessonText] = useState<string | undefined>(
    lesson?.text
  );

  async function handleSubmit() {
    if (lessonText !== "" && lessonName !== "") {
      try {
        const payload: LessonPOST = {
          name: lessonName,
          text: lessonText || "",
        };

        console.log(lesson);
        const response = await editLesson(payload, lesson.id);
        console.log(response);
        navigate(`/course/${courseid}/lesson/${lesson.id}`);
      } catch (error) {
        toast.error("Alguma coisa deu errad!");
      }
    } else {
      toast.error("Nome e textos não podem ser nulos");
    }
  }

  function handleCancel() {
    navigate(`/course/${courseid}/lesson/${lesson.id}`);
  }

  return (
    <>
      {ownership && (
        <>
          <div data-color-mode="light">
            <CenterCard>
              <div className={styles.lessonTitle}>
                <Input
                  type="text"
                  value={lessonName}
                  onChange={(i) => setlessonName(i.target.value)}
                />
              </div>

              <div className={styles.lessonText}>
                <MDEditor
                  value={lessonText}
                  onChange={setlessonText}
                  height="100%"
                />

                {/* {quiz.map(i => <div>i</div>)} */}
              </div>
              <div className={styles.space}></div>
              <Tip>
                Use a linguagem de markdown para escrever o corpo do quiz
              </Tip>

              <div className={styles.options}>
                <Button
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  onClick={handleSubmit}
                >
                  Salvar
                </Button>
                <Button
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </div>
            </CenterCard>
          </div>
        </>
      )}
    </>
  );
};
