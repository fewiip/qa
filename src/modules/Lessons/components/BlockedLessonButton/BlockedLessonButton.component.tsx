import ProfileColoredImage from "../../../../assets/images/bug_alpha_grey.png";
import { FunctionComponent } from "react";
import { toast } from "react-toastify";

import styles from './BlockedLessonButton.module.css'

interface LessonButtonProps {
  courseid: number;
  lessonid: number;
  name: string;
}

export const BlockedLessonButton: FunctionComponent<LessonButtonProps> = (
  props
) => {
  const {  name } = props; 

  function readLesson() {
    toast.error('Primeiro complete todas as lições do capítulo anterior')
  }

  return (
    <div className={styles.lessonButton} onClick={readLesson}>
      <div className={styles.image}>
        <img src={ProfileColoredImage} alt="" />
      </div>
      <div className={styles.lessonTitle}>
        <b>{name}</b>
      </div>
    </div>
  );
};
