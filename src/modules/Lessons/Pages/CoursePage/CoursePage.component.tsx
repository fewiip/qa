import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { Course, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { Button } from "../../../../shared/components/Button/Button.component";
import { CenterContent } from "../../components/CenterContent";
import { CourseCard } from "../../components/CourseCard/CourseCard.component";

import styles from "./CoursePage.module.css";
import Image from "../../../../assets/images/image.png";
import { toast } from "react-toastify";


export const CoursePage = () => {
  const { courseid } = useParams();
  const { getCourse,subscribeToCourse, isSubscribed } = useLessons();
  const { user } = useAuthStore();
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course>();
  const [subscription, setSubscription] = useState(false)

  async function fetchCourse() {
    const response = await getCourse(parseInt(courseid as string));
    setCourse(response.data);
  }

  async function fetchSubscription() {
    if(user && courseid){
      try{
        const response = await isSubscribed(user?.id, parseInt(courseid))
        setSubscription(true)
      }catch(error){
        setSubscription(false)
      }
    }
    setSubscription(false)
  }

  useEffect(() => {
    if (courseid) {
      fetchCourse();
      fetchSubscription();
    }
  }, [courseid]);

  function handleEditCourseClick() {
    navigate('/courses/edit/'+courseid)
  }

  function handleSeeCourseStatisticsClick(){
    navigate('/courses/statistics/'+courseid)
  }

  async function handleSubscribe () {
    try{
      if(user) {
        const payload = {
          courseId : parseInt(courseid as string) 
        }
        const response = await subscribeToCourse(payload, user?.id) 
        setSubscription(true)
      }
      
    }catch(error){
      toast.error("Alguma coisa deu errado!"); 
      console.log(error)
    }
  }

  async function handleUnsubscribe () {
    try{
      if(user){
        const payload = {
          courseId : parseInt(courseid as string) 
        }
        const response = await subscribeToCourse(payload, user?.id) 
        setSubscription(false)
      }
    }catch(error){
      toast.error("Alguma coisa deu errado!"); 
      console.log(error)
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
                {!subscription && <div>
                  <Button onClick={handleSubscribe}>Inscrever</Button>
                </div>}
                {subscription && <div>
                  <Button onClick={handleUnsubscribe}>Deinscrever</Button>
                </div>}
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
