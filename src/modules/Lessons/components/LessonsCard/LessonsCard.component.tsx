import { FunctionComponent } from "react";
import styles from "./LessonsCard.module.css";
import { Chapter } from "../../api";
import { LessonButton } from "../LessonButton";
import { OpenedLessonButton } from "../OpenedLessonButton/OpenedLessonButton.component";
import { BlockedLessonButton } from "../BlockedLessonButton/BlockedLessonButton.component";
import { CompletedLessonButton } from "../CompletedLessonButton/CompletedLessonButton.component";

interface ChaptersCardProps {
  userid: number;
  courseid: number;
  chapters: Chapter[];
}

export const ChaptersCard: FunctionComponent<ChaptersCardProps> = (props) => {
  const { chapters, courseid, userid } = props;
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
          <>
            <div className={styles.lessonsLine} key={i.id}>
              <div className={styles.lessonTitle}>
                <p>{i.name} </p>
              </div>

              {i.isLocked && (
                <div className={styles.lessonsColumn}>
                  {i.lessons.map((j) => (
                    <>
                      <BlockedLessonButton
                        courseid={courseid}
                        name={j.name}
                        lessonid={j.id}
                        key={j.id}
                      />
                    </>
                  ))}
                </div>
              )}
              {!i.isLocked && (
                <div className={styles.lessonsColumn}>
                  {i.lessons.map((j) => (
                    <>
                      {j.isOpen && !j.isComplete && (
                        <OpenedLessonButton
                          courseid={courseid}
                          name={j.name}
                          lessonid={j.id}
                          key={j.id}
                        />
                      )}

                      {j.isOpen && j.isComplete && (
                        <CompletedLessonButton
                          courseid={courseid}
                          name={j.name}
                          lessonid={j.id}
                          key={j.id}
                        />
                      )}

                      {!j.isOpen && (
                        <LessonButton
                          userid={userid}
                          courseid={courseid}
                          name={j.name}
                          lessonid={j.id}
                          key={j.id}
                        />
                      )}
                    </>
                  ))}
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
};
