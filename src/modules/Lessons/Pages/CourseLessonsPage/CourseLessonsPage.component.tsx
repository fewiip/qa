import { useEffect, useState } from "react";
import { AppLayout } from "../../../../shared/components/AppLayout";
import styles from "./CourseLessonsPage.module.css";
import { Chapter, Course, User, useLessons } from "../../api";
import { StatisticsCard } from "../../components/StatisticsCard/StatisticsCard.component";
//import { NextAchievementCard } from "../../components/NextAchievementCard";
import { ChaptersCard } from "../../components/LessonsCard/LessonsCard.component";
//import { LeadershipCard } from "../../components/LeadershipCard/LeadershipCard.component";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CourseLeadershipCard } from "../../components/CourseLeadershipCard";
import { CenterContent } from "../../components/CenterContent";
import { Button } from "../../../../shared/components/Button/Button.component";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";

export const CourseLessonsPage = () => {
  const { user } = useAuthStore();
  const { courseid } = useParams();
  const { getCourseLeaderBoard, getCourse, unSubscribeToCourse } = useLessons();
  const [users, setUsers] = useState<User[]>([]);
  const [course, setCourse] = useState<Course>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const navigate = useNavigate();

  async function fetchLeaderboard() {
    const response = await getCourseLeaderBoard(parseInt(courseid as string));
    setUsers(response.data);
  }

  async function fetchLessons() {
    try {
      const response = await getCourse(parseInt(courseid as string));
      setChapters(response.data.chapters);
      setCourse(response.data);
    } catch {
      toast.error("Alguma coisa deu errad!");
    }
  }

  useEffect(() => {
    fetchLeaderboard();
    fetchLessons();
  }, []);

  async function unsubscribe() {
    try {
      if (user) {
        const payload = {
          courseId: parseInt(courseid as string),
        };
        const response = await unSubscribeToCourse(payload, user?.id);
        console.log(response); 
      }
    } catch (error) {
      toast.error("Alguma coisa deu errado!");
      console.log(error);
    }
  }

  function exit() {
    unsubscribe()
    navigate("/courses/" + courseid);
  }

  return (
    <AppLayout >
      <div className={styles.contentWrapper}>
        <CenterContent>
          <div className={styles.line}>
            <div>
              <h2>TURMA: {course && course?.name}</h2>
              <p className={styles.teacher}>
                Por: {course && course?.ownerName}{" "}
                {course && course?.ownerLastName}
              </p>
            </div>
            <div>
              <Button
                onClick={exit}
                size="big"
                style={{
                  width: "150px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  height: "50px",
                }}
              >
                Desinscrever
              </Button>
            </div>
          </div>

          <div className={styles.line}>
            <CourseLeadershipCard users={users} />
            <StatisticsCard />
          </div>

          <div className={styles.chaptersWrapper}>
            <ChaptersCard chapters={chapters} />
          </div>
        </CenterContent>
      </div>
    </AppLayout>
  );
};
