import { useNavigate } from "react-router-dom";
import { FunctionComponent } from "react";
import { Course } from "../../api";
import { Card } from "../../../../shared/components/Card/Card.component";
import styles from "./CourseItem.module.css";
import { Button } from "../../../../shared/components/Button/Button.component";
import team1_colored from "../../../../assets/images/team1_colored.png"

interface CourseItemProps {
  course: Course;
}

export const CourseItem: FunctionComponent<CourseItemProps> = (props) => {
  const { course } = props;
  const navigate = useNavigate();

  function seeCourse(courseID: number) {
    navigate("/courses/" + courseID);
  } 

  return (
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
      <div >{course.description} </div>
      <Button onClick={() => seeCourse(course.id)}>Ver turma</Button>
        </div>
      </div>
    </Card>
  );
};
