import { useNavigate } from "react-router-dom";
import ProfileColoredImage from "../../../../assets/images/bug_alpha.png";
import styles from "./LessonButton.module.css"; 
import { FunctionComponent } from "react";
interface LessonButtonProps {
  courseid: number;
  lessonid: number;
  name: string;
}

export const LessonButton: FunctionComponent<LessonButtonProps> = (props) => {
  const { courseid, lessonid, name } = props;
  const navigate = useNavigate();
  return (
    <div
      className={styles.lessonButton}
      onClick={() => navigate(`/course/${courseid}/lesson/${lessonid}`)}
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
