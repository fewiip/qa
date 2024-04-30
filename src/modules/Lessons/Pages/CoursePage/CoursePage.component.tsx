import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { Course, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterCard } from "../../components/CenterCard/CenterCard.component";
import { ActionsHelperCard } from "../../components/ActionsHelperCard";
import { EditCourseCard } from "../../components/EditCourseCard/EditCourseCard.component";
import { Button } from "../../../../shared/components/Button/Button.component";
import { CenterContent } from "../../components/CenterContent";
import { CourseCard } from "../../components/CourseCard/CourseCard.component";

import styles from "./CoursePage.module.css";
import Image from "../../../../assets/images/image.png";


export const CoursePage = () => {
  const { courseid } = useParams();
  const { getCourse,subscribeToCourse } = useLessons();
  const { user } = useAuthStore();
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course>();

  async function fetchCourse() {
    const response = await getCourse(parseInt(courseid as string));
    setCourse(response.data);
  }

  useEffect(() => {
    if (courseid) {
      fetchCourse();
    }
  }, [courseid]);

  function handleEditCourseClick() {
    navigate('/courses/edit/'+courseid)
  }

  function handleSeeCourseStatisticsClick(){
    navigate('/courses/statistics/'+courseid)
  }

  async function handleSubscribe (){
    try{
      if(user) {
        const payload = {
          courseId : [
            parseInt(courseid as string)
          ]
        }
        const response = await subscribeToCourse(payload, user?.id)
        console.log(response)
      }
      
    }catch{

    }
  }

  return (
    <AppLayout page="courses" variant="white">
      <div className={styles.contentWrapper}>
        <CenterContent>
          <div className={styles.content}>
            <div className={styles.img}>
              <img src={Image} alt="" />
            </div>
            <div className={styles.text}>
              <div>Turma: </div>
              <div>
                <h2>
                {course && course.name}
                </h2>
                </div>
              <div className={styles.buttons}>
                <div>
                  <Button onClick={handleEditCourseClick}>Editar Curso</Button>
                </div>
                <div>
                  <Button onClick={handleSubscribe}>Inscrever</Button>
                </div>
                <div>
                  <Button>Deinscrever</Button>
                </div>
                <div>
                  <Button onClick={handleSeeCourseStatisticsClick}>Ver Estatisticas</Button>
                </div>
              </div>
            </div>
          </div>
          <CourseCard courseid={parseInt(courseid as string)} />
        </CenterContent>
      </div>
    </AppLayout>
  );
};
