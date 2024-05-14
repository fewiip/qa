import { useEffect, useState } from "react"; 
import { toast } from "react-toastify";
import { Course, Subscription, useLessons } from "../../api";
import { AppLayout } from "../../../../shared/components/AppLayout";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Card } from "../../../../shared/components/Card/Card.component";
import { CenterContent } from "../../components/CenterContent/CenterContent.component";
import styles from "./SubscriptionsPage.module.css";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { CourseItem } from "../../components/CourseItem";

export const SubscriptionsPage = () => {
  const { getSubscribedCourses } = useLessons();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();
  const [courses, setCourses] = useState<Course[]>(); 
  const { user } = useAuthStore();

  async function fetchCourses() {
    try {
      if (user) {
        console.log('user id:  ' + user.id)
        const response = await getSubscribedCourses(user?.id);
        setSubscriptions(response.data); 
      }
    } catch {
      toast.error("Alguma coisa deu errad!");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <AppLayout page="courses" variant="white">
        <div className={styles.contentWrapper}>
          <CenterContent>
          {
                        subscriptions?.map(
                            (i) => ( 
                                <CourseItem course={i.course}/>
                             )
                        )
                    }
          </CenterContent>
        </div>
      </AppLayout>
    </>
  );
};
