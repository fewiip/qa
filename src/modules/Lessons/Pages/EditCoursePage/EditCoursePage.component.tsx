import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import {  Course, CoursePOST, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterContent } from "../../components/CenterContent";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Input } from "../../../../shared/components/Input";
import { EditCourseCard } from "../../components/EditCourseCard/EditCourseCard.component";
import { ActionsHelperCard } from "../../components/ActionsHelperCard";

import styles from "./EditCoursePage.module.css";
import Image from "../../../../assets/images/image.png";
import edit from "../../../../assets/images/edit.png";

export const EditCoursePage = () => {
  const { courseid } = useParams();
  const navigate = useNavigate();

  const { getCourse, editCourse } = useLessons();
  const [course, setCourse] = useState<Course>();
  const [courseName, setCourseName] = useState(course?.name);
  const [isEditingName, setIsEditingName] = useState(false);

  async function fetchCourse() {
    const response = await getCourse(parseInt(courseid as string));
    setCourseName(response.data.name);
    setCourse(response.data);
  }

  useEffect(() => {
    if (courseid) {
      fetchCourse();
    }
  }, [courseid]);

  function handleEditClick() {
    setIsEditingName(true);
  }

  function handleCancelClick() {
    setIsEditingName(false);
  }

  async function handleEditingName() {
    setIsEditingName(false);
    try {
      const payload: CoursePOST = {
        name: courseName,
        owner: course?.id,
      };
      console.log("simulando envio", payload);
      const response = await editCourse(parseInt(courseid as string), payload);

      setCourse(response.data);
    } catch (err) {
      console.error("erro: " + err);
    }
  }

  function handleFinish() {
    navigate("/courses/" + courseid);
  }

  return (
    <AppLayout variant="white" page="courses">
      <div className={styles.contentWrapper}>
        <CenterContent>
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={Image} alt="" />
            </div>
            <div className={styles.text}>
              <div>
                Turma:
                <div className={styles.line}>
                  {!isEditingName && (
                    <>
                      <div className={styles.courseName}>
                        <h2>{courseName}</h2>
                        <button className={styles.actionButton}>
                          <img src={edit} onClick={handleEditClick} />
                        </button>
                      </div>
                    </>
                  )}

                  <div>
                    {isEditingName && (
                      <>
                        <div className={styles.row}>
                          <div>
                            <Input
                              value={courseName}
                              onChange={(i) => setCourseName(i.target.value)}
                            />
                          </div>
                          <Button   onClick={handleEditingName}>
                            Salvar
                          </Button>
                          <div></div>
                          <div>
                            <Button onClick={handleCancelClick}>
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ActionsHelperCard />
          <EditCourseCard courseid={parseInt(courseid as string)} />
          <div className={styles.buttons}>
            <Button onClick={handleFinish}>Concluir</Button>
          </div>
        </CenterContent>
      </div>
    </AppLayout>
  );
};
