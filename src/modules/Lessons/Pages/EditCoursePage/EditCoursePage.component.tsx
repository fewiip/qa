import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Course, CoursePOST, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterContent } from "../../components/CenterContent";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Input } from "../../../../shared/components/Input";
import { EditCourseCard } from "../../components/EditCourseCard/EditCourseCard.component";
//import { ActionsHelperCard } from "../../components/ActionsHelperCard";

import styles from "./EditCoursePage.module.css";
import Image from "../../../../assets/images/bookRed_colored.png";
import edit from "../../../../assets/images/edit.png";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { toast } from "react-toastify";

export const EditCoursePage = () => {
  const { courseid } = useParams();
  const navigate = useNavigate();
  const [ownership, setOwnership] = useState(false);
  const { user } = useAuthStore();
  const { getCourse, editCourse, isCourseOwner } = useLessons();
  const [course, setCourse] = useState<Course>();
  const [courseName, setCourseName] = useState(course?.name);
  const [courseNameFromInput, setCourseNameFromInput] = useState(course?.name);
  const [courseDescription, setcourseDescription] = useState(
    course?.description
  );
  const [courseDescriptionFromInput, setcourseDescriptionFromInput] = useState(
    course?.description
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  async function fetchCourse() {
    const response = await getCourse(parseInt(courseid as string));
    setCourseName(response.data.name);
    setCourseNameFromInput(response.data.name);
    setcourseDescription(response.data.description);
    setcourseDescriptionFromInput(response.data.description);
    setCourse(response.data);
  }

  async function fetchOwnership() {
    setOwnership(false);
    if (user && courseid) {
      try {
        const response = await isCourseOwner(user?.id, parseInt(courseid));
        setOwnership(response.data.isOwner);
        console.log(response);
      } catch (error) {
        setOwnership(false);
      }
    }
  }

  useEffect(() => {
    if (courseid) {
      fetchCourse();
    }
    fetchOwnership();
  }, [courseid]);

  function handleEditNameClick() {
    setIsEditingName(true);
  }

  function handleEditDescriptionClick() {
    setIsEditingDescription(true);
  }

  function handleCancelEditName() {
    setIsEditingName(false);
    setCourseNameFromInput(courseName);
  }

  function handleCancelEditDescription() {
    setIsEditingDescription(false);
    setcourseDescriptionFromInput(courseDescription);
  }

  async function handleEditingName() {
    if (courseNameFromInput !== "") {
      setIsEditingName(false);

      try {
        const payload: CoursePOST = {
          name: courseNameFromInput,
          owner: user?.id,
          description: courseDescription,
        };
        console.log(payload);
        const response = await editCourse(
          parseInt(courseid as string),
          payload
        );

        setCourse(response.data);
        setCourseName(courseNameFromInput);
      } catch (err) {
        console.error("erro: " + err);
        toast.error("Nome e textos não podem ser nulos");
      }
    } else {
      toast.error("Nome não pode ser nulo");
    }
  }

  async function handleEditingDescription() {
    setIsEditingDescription(false);
    try {
      const payload: CoursePOST = {
        name: courseName,
        owner: user?.id,
        description: courseDescriptionFromInput,
      };
      console.log("simulando envio", payload);
      const response = await editCourse(parseInt(courseid as string), payload);
      setCourse(response.data);
      setcourseDescription(courseDescriptionFromInput);
    } catch (err) {
      console.error("erro: " + err);
    }
  }

  function handleFinish() {
    navigate("/course/" + courseid);
  }

  return (
    <AppLayout variant="white" page="courses">
      <div className={styles.contentWrapper}>
        <CenterContent>
          {ownership && (
            <>
              <div className={styles.content}>
                <div className={styles.img}>
                  <img src={Image} alt="" />
                </div>
                <div className={styles.text}>
                  <div>
                    <div className={styles.line}>
                      {!isEditingName && (
                        <>
                          <div className={styles.courseName}>
                            <h2>{courseName}</h2>
                            <button className={styles.actionButton}>
                              <img src={edit} onClick={handleEditNameClick} />
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
                                  value={courseNameFromInput}
                                  onChange={(i) =>
                                    setCourseNameFromInput(i.target.value)
                                  }
                                />
                              </div>
                              <Button onClick={handleEditingName}>
                                Salvar
                              </Button>
                              <div></div>
                              <div>
                                <Button onClick={handleCancelEditName}>
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <b>Por:</b>
                    {course && course.ownerName + " " + course.ownerLastName}
                  </div>
                  <div>
                    <b>Descrição:</b>
                  </div>
                  <div>
                    <div className={styles.rowline}>
                      {course && !isEditingDescription && (
                        <>
                          {!Boolean(courseDescription?.length) && (
                            <>
                              <p style={{ color: "grey" }}>Vazio</p>
                            </>
                          )}
                          <p>{course.description}</p>
                          <button className={styles.actionButton}>
                            <img
                              src={edit}
                              onClick={handleEditDescriptionClick}
                            />
                          </button>
                        </>
                      )}
                    </div>
                    {course && isEditingDescription && (
                      <>
                        <div>
                          <textarea
                            name=""
                            id=""
                            value={courseDescriptionFromInput}
                            onChange={(i) =>
                              setcourseDescriptionFromInput(i.target.value)
                            }
                          ></textarea>
                        </div>
                        <div className={styles.row}>
                          <div>
                            <Button onClick={handleEditingDescription}>
                              Salvar
                            </Button>
                          </div>
                          <div>
                            <Button onClick={handleCancelEditDescription}>
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/*
              <ActionsHelperCard />
                    */}
              <EditCourseCard courseid={parseInt(courseid as string)} />
              <div className={styles.buttons}>
                <Button onClick={handleFinish}>Concluir</Button>
              </div>
            </>
          )}
        </CenterContent>
      </div>
    </AppLayout>
  );
};
