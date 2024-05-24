import { useNavigate } from "react-router-dom";
import ProfileColoredImage from "../../../../assets/images/bug_alpha.png";
import { FunctionComponent } from "react";
import styles from "./LessonButton.module.css"; 
interface LessonButtonProps {
  courseid: number;
  lessonid: number;
  name: string;
}

export const LessonButton: FunctionComponent<LessonButtonProps> = (props) => {
  const { courseid, lessonid, name } = props;
  const navigate = useNavigate();


  function readLesson () {
    navigate(`/course/${courseid}/lesson/${lessonid}`)
  }

  return (
    <div
      className={styles.lessonButton}
      onClick={readLesson}
    >
      <div className={styles.image}>
        <img src={ProfileColoredImage} alt="" />
      </div>
      <div className={styles.lessonTitle}>
        <b>{name}</b>
      </div>
    </div>
  );
};
