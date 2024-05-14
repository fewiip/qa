/*import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChapterPOST, Course, CoursePOST, useLessons } from "../../api";*/
import { AppLayout } from "../../../../shared/components/AppLayout";

import styles from "./CourseStatisticsPage.module.css";
import { CenterContent } from "../../components/CenterContent";
//import { Card } from "../../../../shared/components/Card/Card.component";
import { CenterCard } from "../../components/CenterCard/CenterCard.component";
import { SubscriberStatisticsCard } from "../../components/SubscribersStatisticsCard";

export const CourseStatisticsPage = () => {
  //const { courseid } = useParams();
  /*const navigate = useNavigate();

  const { getCourse, editCourse } = useLessons();
  const [course, setCourse] = useState<Course>();

  async function fetchCourse() {
    const response = await getCourse(parseInt(courseid as string));
    setCourse(response.data);
  }*/

  return (
    <>
      <AppLayout page="courses" variant="white">
        <div className={styles.contentWrapper}>
          <div>
            <div>Turma:</div>
            <div>Por:</div>
          </div>
          <CenterContent>
            <CenterCard>Painel de Controle:</CenterCard>
            <SubscriberStatisticsCard />
          </CenterContent>
        </div>
      </AppLayout>
    </>
  );
};
