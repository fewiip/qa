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
  const {
    getCourseLeaderBoard,
    getCourse,
    unSubscribeToCourse,
    isSubscribed,
    isCourseOwner,
  } = useLessons();
  const [users, setUsers] = useState<User[]>([]);
  const [course, setCourse] = useState<Course>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const navigate = useNavigate();
  const [ownership, setOwnership] = useState(false);
  const [subscription, setSubscription] = useState(false);

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
    fetchSubscription();
    fetchOwnership();
    fetchLeaderboard();
    fetchLessons();
  }, []);

  async function fetchSubscription() {
    setSubscription(false);
    console.log(`userID: ${user?.id} ;courseID: ${courseid}`);
    if (user && courseid) {
      try {
        const response = await isSubscribed(user?.id, parseInt(courseid));
        setSubscription(response.data.isSubscribed);
        console.log(response);

      } catch (error) {
        setSubscription(false);
      }
    }
  }

  async function fetchOwnership() {
    setOwnership(false);
    if (user && courseid) {
      try {
        const response = await isCourseOwner(user?.id, parseInt(courseid));
        setOwnership(response.data.isOwner);
        console.log(response);
      } catch (error) {
        setOwnership(false);
      }
    }
  }

  async function unsubscribe() {
    try {
      if (user) {
        const payload = {
          courseId: parseInt(courseid as string),
        };
        const response = await unSubscribeToCourse(payload, user?.id);
        console.log(response);
        toast("Desinscrição do curso realizada");
      }
    } catch (error) {
      toast.error("Alguma coisa deu errado!");
      console.log(error);
    }
  }

  function exit() {
    unsubscribe();
    
    navigate("/course/" + courseid);
  }

  return (
    <AppLayout>
      <div className={styles.contentWrapper}>
        <CenterContent>
          {(subscription || ownership) && (
            <>
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
                <StatisticsCard courseid={parseInt(courseid as string)} />
              </div>

              <div className={styles.chaptersWrapper}>
                {courseid && (
                  <ChaptersCard
                    courseid={parseInt(courseid)}
                    chapters={chapters}
                  />
                )}
              </div>
            </>
          )}
        </CenterContent>
      </div>
    </AppLayout>
  );
};
