import { useNavigate } from "react-router-dom";
import { FunctionComponent } from "react"; 
import { Card } from "../../../../shared/components/Card/Card.component"; 
import { Button } from "../../../../shared/components/Button/Button.component";
import team1_colored from "../../../../assets/images/team1_colored.png"
 
import { Course } from "../../api";
import styles from './SubscribedCoursesItem.module.css'
interface SubscribedCoursesItemProps {
    course: Course;
}

export const SubscribedCoursesItem: FunctionComponent<SubscribedCoursesItemProps> = (props) => {
    const { course } = props;
    const navigate = useNavigate();
  
    function seeCourse(courseID: number) {
      navigate("/courses/" + courseID + "/lessons");
    }
  

    return <>
    <Card>
      <div className={styles.cardTitle}>
        <b>{course.name}</b>
      </div>
      <div className={styles.row}>
      <div><img src={team1_colored} alt="" /></div>
        <div className={styles.column}>

      <div className={styles.teacher}>
        Por: {course.ownerName} {course.ownerLastName}
      </div>
      <div className={styles.teacher}>{course.description} </div>
      <Button onClick={() => seeCourse(course.id)}>Ver turma</Button>
        </div>
      </div>
    </Card>
    </>
}