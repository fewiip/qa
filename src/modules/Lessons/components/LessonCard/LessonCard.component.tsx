import styles from "./LessonCard.module.css";
import { FunctionComponent, useEffect, useState } from "react";
import { Lesson, useLessons } from "../../api";
import professor1_happy from "../../../../assets/images/professor1_happy.png"; 
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/Button/Button.component";
import MDEditor from "@uiw/react-md-editor";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";

interface LessonCardProps {
  courseid: number;
  lesson?: Lesson;
}

export const LessonCard: FunctionComponent<LessonCardProps> = (props) => {
  const { lesson, courseid } = props;
  const navigate = useNavigate();
  const { isSubscribed, isCourseOwner } = useLessons();
  const [ownership, setOwnership] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchSubscription();
    fetchOwnership();
  }, []);

  async function fetchSubscription() {
    setSubscription(false);
    console.log(`userID: ${user?.id} ;courseID: ${courseid}`);
    if (user && courseid) {
      try {
        const response = await isSubscribed(user?.id, courseid);
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
        const response = await isCourseOwner(user?.id, courseid);
        setOwnership(response.data.isOwner);
        console.log(response);
      } catch (error) {
        setOwnership(false);
      }
    }
  }

  /*
  const books: BookProps[] = [
    {
      id: 1,
      name: 'Introdução ao teste de software',
      author: 'Delamaro, Maldonado e Jino',
      img: book1
    },
    {
      id: 2,
      name: 'Introdução ao teste de software',
      author: 'Delamaro, Maldonado e Jino',
      img: book1
    },

  ]
  */

  function handleQuizClick() {
    navigate(
      `/course/${courseid}/lesson/${lesson?.id}/quiz/intro`
    );
    /*
    navigate(
      `/course/${courseid}/lesson/${lesson?.id}/quiz/${lesson?.quizzes[0].id}`
    );
    */
  }

  function handleEditLessonClick() {
    navigate(`/course/${courseid}/lesson/edit/${lesson?.id}`);
  }
  function handleCreateQuizClick() {
    navigate(`/course/${courseid}/lesson/${lesson?.id}/quiz/add`);
  }
  function returnToCourse() {
    navigate(`/course/${courseid}/lessons`);
  }

  function returnToCourseOwner() {
    navigate(`/course/edit/${courseid}`);
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        {(subscription || ownership) && (
          <>
            <div className={styles.imgAndText}>
              <div className={styles.profImage}>
                <img src={professor1_happy} alt="" />
              </div>
              <div className={styles.lessonText}>
                <div className={styles.lessonTitle}>
                  <h2>{lesson?.name}</h2>
                </div>
                <div className={styles.lessonContent} data-color-mode="light"> 
                  <MDEditor.Markdown
                    source={lesson?.text}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.lessonButtons}>
              {Boolean(lesson?.quizzes.length) && (
                <Button onClick={handleQuizClick}>Começar quiz</Button>
              )}
              {/*
               */}
              {ownership ? (
                <>
                  <Button onClick={returnToCourse}>Voltar para o curso</Button>
                  <Button onClick={returnToCourseOwner}>Voltar para edição</Button>
                  <Button onClick={handleEditLessonClick}>Editar</Button>
                  <Button onClick={handleCreateQuizClick}>Criar um quiz</Button>
                </>
              ) : (
                <Button onClick={returnToCourse}>Voltar</Button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

interface BookProps {
  id: number;
  img: string;
  author: string;
  name: string;
}

export const Book: FunctionComponent<BookProps> = (props) => {
  const { img, author, name } = props;
  return (
    <div className={styles.book}>
      <div>
        <img src={img} alt="" />
      </div>
      <div className={styles.bookInfo}>
        <b>{name}</b>
        <p>{author}</p>
      </div>
    </div>
  );
};
