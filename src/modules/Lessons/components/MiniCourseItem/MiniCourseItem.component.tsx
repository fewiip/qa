import { FunctionComponent } from "react";
import { Course } from "../../api";
import styles from "./MiniCourseItem.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/Button/Button.component";

interface MiniCourseItemProps {
  course: Course;
}

export const MiniCourseItem: FunctionComponent<MiniCourseItemProps> = (
  props
) => {
  const { course } = props;
  const navigate = useNavigate();

  function handleClickCourse() {
    navigate("/courses/" + course.id);
  }
  return (
    <>
      <div className={styles.column}>
        <div>
          <b>{course.name}</b>
        </div>
        <div className={styles.teacher}>
          por: {course.ownerName} {course.ownerLastName}
        </div>
        <Button onClick={handleClickCourse}>Acessar</Button>
      </div>
    </>
  );
};
