import { FunctionComponent } from "react";
import styles from "./LessonsCard.module.css";
import { Chapter } from "../../api";
import { LessonButton } from "../LessonButton";

interface ChaptersCardProps {
  courseid: number,
  chapters: Chapter[];
}

export const ChaptersCard: FunctionComponent<ChaptersCardProps> = (props) => {
  const { chapters, courseid } = props;
  //const navigate = useNavigate()

  /*
    function handleCreateChapterClick(chapterid: number) {
        navigate(`/course/${courseid}/chapter/${chapterid}/lesson/add`)  
    }*/

  console.log(courseid);
  return (
    <>
      <div className={styles.lessonsWrapper}>
        {chapters.map((i) => (
          <div className={styles.lessonsLine} key={i.id}>
            <div className={styles.lessonTitle}>
              <p>{i.name} </p>
            </div>
            <div className={styles.lessonsColumn}>
              {i.lessons.map((j) => (
                <LessonButton
                  courseid={courseid}
                  name={j.name}
                  lessonid={j.id}
                  key={j.id}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
