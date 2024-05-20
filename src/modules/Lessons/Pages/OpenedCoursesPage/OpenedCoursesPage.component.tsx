import { AppLayout } from "../../../../shared/components/AppLayout";
import { CenterContent } from "../../components/CenterContent/CenterContent.component";
import { Course, useLessons } from "../../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CourseItem } from "../../components/CourseItem";
import team2_colored from "../../../../assets/images/team2_colored.png";
/*import { useNavigate } from "react-router-dom";
import { Card } from "../../../../shared/components/Card/Card.component";
import { Button } from "../../../../shared/components/Button/Button.component";*/

import styles from "./OpenedCoursesPage.module.css";

export const OpenedCoursesPage = () => {
  const { getCourses } = useLessons();
  const [courses, setCourses] = useState<Course[]>();

  async function fetchCourses() {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch {
      toast.error("Alguma coisa deu errad!");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);
  /*
    function handleClick() {
        navigate('')
    }
    function seeCourse(courseID: number){
        navigate('/course/'+courseID)
    } */
  return (
    <>
      <AppLayout page="courses" variant="white">
        <div className={styles.contentWrapper}>
          <CenterContent>
            <div>
              <h1>TURMAS ABERTAS</h1>
            </div>
            <div className={styles.cards}>
              {courses?.map((i) => (
                <CourseItem course={i} />
              ))}
            </div>
          </CenterContent>
        </div>
      </AppLayout>
    </>
  );
};
