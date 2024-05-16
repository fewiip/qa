import { AppLayout } from "../../../../shared/components/AppLayout";
import { Button } from "../../../../shared/components/Button/Button.component";
import { Card } from "../../../../shared/components/Card/Card.component";
import { Input } from "../../../../shared/components/Input";
import { CenterContent } from "../../components/CenterContent/CenterContent.component";
import styles from "./CoursesPage.module.css";
import { useNavigate } from "react-router-dom";

//import team5_coloed from "../../../../assets/images/team5_coloed.png"
import group2_colored from "../../../../assets/images/group2_colored.png";
import team1_colored from "../../../../assets/images/team1_colored.png";

import team2_colored from "../../../../assets/images/team2_colored.png";
import team5_colored from "../../../../assets/images/team5_coloed.png";

import searchIcon from "../../../../assets/images/search2.png";
import { useEffect, useState } from "react";
import { Course, Subscription, useLessons } from "../../api";
import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import { toast } from "react-toastify";
import { MiniCourseItem } from "../../components/MiniCourseItem";

export const CoursesPage = () => {
  const [search, setSearch] = useState("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();
  const { getCourses, getSubscribedCourses, getCoursesByOwner } = useLessons();
  const [createdCourses, setCreatedCourses] = useState<Course[]>();
  const [courses, setCourses] = useState<Course[]>();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  async function fetchCourses() {
    try {
      if (user) {
        console.log("user id:  " + user.id);
        const response1 = await getSubscribedCourses(user?.id);
        setSubscriptions(response1.data);
        const response2 = await getCoursesByOwner(user.id);
        setCreatedCourses(response2.data);
        const response3 = await getCourses();
        setCourses(response3.data);
      }
    } catch {
      toast.error("Alguma coisa deu errad!");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  function handleClick() {
    navigate("/courses/add");
  }

  function handleSearch() {
    if (search.length) {
      navigate("/courses/search/" + search);
    }
  }
  /*
  function aboveOne (x: number) {
    if (x >= 1) {
        return true
    }
    return false
    
  }*/

  return (
    <AppLayout page="courses" variant="white">
      <div className={styles.contentWrapper}>
        <CenterContent>
          <div className={styles.content}>
            <div className={styles.text}>
              <center>
                <h1>TURMAS</h1>
                <img src={group2_colored} alt="" />
                <p>Aprenda e ensine o quanto você quiser!</p>
              </center>

              <b>Sobre as turmas:</b>
              <ul>
                <li>
                  O QA+ permite que você crie e participe de multiplas turmas
                  (além da turma padrã QA+), levando o seu conhecimento além.
                </li>
              </ul>

              <b>Para gestores de turmas </b>
              <ul>
                <li>
                  Apoiamos sua autonomia para ensinar! Assim, nas turmas são
                  disponibilizados os mesmos recursos da turma padrão do QA+,
                  mas quem define o conteúdo, exercicios e conquistas é você!
                </li>
                <li>
                  Conheça e apoie sua turma: para que possa apoiar o processo de
                  aprendizagem de forma individualizada, permitimos o
                  acompanhamento das estastísticas de cada inscrito em sua
                  turma!
                </li>
              </ul>
              {/*
              <center>
                <Button onClick={handleClick}>Criar Turma</Button>
              </center>
                */}
            </div>
            <div className={styles.cards}>
              <Card>
                <div className={styles.cardTitle}>Minhas Turmas</div>
                <Button onClick={handleClick}>Criar Turma</Button>
                <div className={styles.row}>
                  <div>
                    <img src={team5_colored} alt="" />
                  </div>
                  {createdCourses && Boolean(createdCourses?.length) ? (
                    <MiniCourseItem course={createdCourses[0]} />
                  ) : (
                    <div className={styles.column}>
                      <div className={styles.teacher}>Nenhum curso criado</div>
                    </div>
                  )}
                </div>
                <div className={styles.seeMore}>
                  <a href="/courses/ownership">Ver minhas turmas</a>{" "}
                </div>
              </Card>
              <Card>
                <div className={styles.cardTitle}>
                  Turmas em que eu estou inscrito
                </div>
                <div className={styles.row}>
                  <div>
                    <img src={team1_colored} alt="" />
                  </div>
                  {subscriptions && Boolean(subscriptions.length) ? (
                    <MiniCourseItem course={subscriptions[0].course} />
                  ) : (
                    <div className={styles.column}>
                      <div className={styles.teacher}>Nenhuma incrição</div>
                    </div>
                  )}
                </div>
                <div className={styles.seeMore}>
                  <a href="/courses/subscriptions">Ver inscrições</a>{" "}
                </div>
              </Card>
              <Card>
                <div className={styles.cardTitle}>Buscar turmas</div>
                <div className={styles.input}>
                  <Input
                    icon={searchIcon}
                    onIconClick={handleSearch}
                    value={search}
                    onChange={(i) => setSearch(i.target.value)}
                  ></Input>
                </div>
                <div className={styles.row}>
                  <div>
                    <img src={team2_colored} alt="" />
                  </div>
                  {courses && Boolean(courses.length) ? (
                    <MiniCourseItem course={courses[0]} />
                  ) : (
                    <div className={styles.column}>
                      <div className={styles.teacher}>Nenhuma curso criado</div>
                    </div>
                  )}
                </div>
                <div className={styles.seeMore}>
                  <a href="/courses/all">Ver todas as turmas</a>
                </div>
              </Card>
            </div>
          </div>
        </CenterContent>
      </div>
    </AppLayout>
  );
};
