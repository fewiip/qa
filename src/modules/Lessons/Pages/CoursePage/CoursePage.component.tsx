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
  const { getCourse, subscribeToCourse, unSubscribeToCourse, isSubscribed, isCourseOwner } = useLessons();
  const { user } = useAuthStore();
  const navigate = useNavigate()
  const [course, setCourse] = useState<Course>();
  const [subscription, setSubscription] = useState(false)
  const [ownership, setOwnership] = useState(false)

  async function fetchCourse() {
    const response = await getCourse(parseInt(courseid as string));
    setCourse(response.data);
  }

  async function fetchOwnership() {
    setOwnership(false) 
    if(user && courseid){
      try{
        const response = await isCourseOwner(user?.id, parseInt(courseid))
        setOwnership(response.data.isOwner)
        console.log(response)
      }catch(error){
        setOwnership(false)
      }
    }
  }

  async function fetchSubscription() {
    setSubscription(false)
    console.log(`userID: ${user?.id} ;courseID: ${courseid}`)
    if(user && courseid){
      try{
        const response = await isSubscribed(user?.id, parseInt(courseid))
        setSubscription(response.data.isSubscribed)
        console.log(response)
      }catch(error){
        setSubscription(false)
      }
    }
  }

  useEffect(() => {
    if (courseid) {
      fetchCourse();
      fetchSubscription();
      fetchOwnership();
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
        console.log(`userID: ${user.id}`)
        const response = await subscribeToCourse(payload, user?.id) 
        console.log(response)
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
        const response = await unSubscribeToCourse(payload, user?.id) 
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
              
              <div>
                <h2>
                {course && course.name}
                </h2>
                </div>
                <div>
                  <b>Por:</b>  {course && (course.ownerName + " " + course.ownerLastName)}
                </div>
                <div><b>Descrição:</b> </div>
              <div> 
                {course && course.description} 
                </div>
              <div className={styles.buttons}>
                {ownership && <div>
                  <Button onClick={handleEditCourseClick}>Editar Curso</Button>
                </div>}
                
                {!subscription && <div>
                  <Button onClick={handleSubscribe}>Inscrever</Button>
                </div>}
                
                {subscription && <div>
                  <Button onClick={handleUnsubscribe}>Deinscrever</Button>
                </div>}
                {ownership &&
                <div>
                  <Button onClick={handleSeeCourseStatisticsClick}>Ver Estatisticas</Button>
                </div>}
              </div>
            </div>
          </div>
          <CourseCard courseid={parseInt(courseid as string)} />
        </CenterContent>
      </div>
    </AppLayout>
  );
};
