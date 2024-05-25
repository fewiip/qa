import { useNavigate } from "react-router-dom";
import ProfileColoredImage from "../../../../assets/images/bug_alpha.png";
import { FunctionComponent } from "react";
import styles from "./LessonButton.module.css"; 
import { IsOpened, useLessons } from "../../api";
interface LessonButtonProps {
  userid: number,
  courseid: number;
  lessonid: number;
  name: string;
}

export const LessonButton: FunctionComponent<LessonButtonProps> = (props) => {
  const { courseid, lessonid, userid, name } = props;
  const {setLessonOpened } = useLessons()
  const navigate = useNavigate();




  function readLesson () {
    try {
      const payload:IsOpened = {
        id: lessonid,
        isOpen: true
      }
      const response = setLessonOpened(courseid, userid, payload )
      console.log(response)
      navigate(`/course/${courseid}/lesson/${lessonid}`)
    } catch(error){
      console.log(error)
    }
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
