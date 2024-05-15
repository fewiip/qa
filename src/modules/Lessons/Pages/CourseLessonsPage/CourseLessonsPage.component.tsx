import { useEffect, useState } from "react";
import { AppLayout } from "../../../../shared/components/AppLayout";
import styles from "./CourseLessonsPage.module.css";
import { Chapter, Course, User, useLessons } from "../../api";
import { StatisticsCard } from "../../components/StatisticsCard/StatisticsCard.component";
//import { NextAchievementCard } from "../../components/NextAchievementCard";
import { ChaptersCard } from "../../components/LessonsCard/LessonsCard.component";
//import { LeadershipCard } from "../../components/LeadershipCard/LeadershipCard.component";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CourseLeadershipCard } from "../../components/CourseLeadershipCard";

export const CourseLessonsPage = () => {
  const { courseid } = useParams(); 
  const { getCourseLeaderBoard, getCourse } = useLessons();
  const [users, setUsers] = useState<User[]>([])
  const [course, setCourse] = useState<Course>()
  const [chapters, setChapters] = useState<Chapter[]>([]);

  async function fetchLeaderboard() {
    const response = await getCourseLeaderBoard(parseInt(courseid as string));
    setUsers(response.data);
  }

  async function fetchLessons() {
    try{
        const response = await getCourse(parseInt(courseid as string));
        setChapters(response.data.chapters);
        setCourse(response.data)
    }catch{
        toast.error("Alguma coisa deu errad!"); 
    }
  }

  useEffect(() => {
    fetchLeaderboard();
    fetchLessons();
  }, []);

  return (
    <AppLayout>
      <div className={styles.lessonContent}>
        <div className={styles.chaptersCardsBar}>
          <CourseLeadershipCard users={users} /> 
          <StatisticsCard />
        </div>

        <div className={styles.chaptersWrapper}>
            <h2>{course && course?.name}</h2>
          <ChaptersCard chapters={chapters} />
        </div>
      </div>
    </AppLayout>
  );
};
