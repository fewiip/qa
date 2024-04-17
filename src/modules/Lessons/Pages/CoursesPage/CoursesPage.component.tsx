import { AppLayout } from '../../../../shared/components/AppLayout';
import { Button } from '../../../../shared/components/Button/Button.component';
import { Card } from '../../../../shared/components/Card/Card.component';
import { Input } from '../../../../shared/components/Input';
import { CenterCard } from '../../components/CenterCard/CenterCard.component';
import { CenterContent } from '../../components/CenterContent/CenterContent.component';
import styles from './CoursesPage.module.css'
import { useNavigate } from "react-router-dom";

import team5_coloed from "../../../../assets/images/team5_coloed.png"
import group2_colored from "../../../../assets/images/group2_colored.png"
import team1_colored from "../../../../assets/images/team1_colored.png"


export const CoursesPage = () => {
    const navigate = useNavigate()
    function handleClick() {
        navigate('/courses/add')
    }

    return <AppLayout page='courses' variant='white'>
        <div className={styles.contentWrapper}>
            <CenterContent>
                <div className={styles.content}>
                    <div className={styles.text}>
                        <center><h1>Turmas</h1>
                            <img src={group2_colored} alt="" />
                            <p>Aprenda e ensine o quanto você quiser!</p>

                        </center>


                        <b>Sobre as turmas:</b>
                        <ul>
                            <li>
                                O QA+ permite que você crie e participe de multiplas turmas (além da turma padrã QA+), levando o seu conhecimento além.
                            </li>
                        </ul>

                        <b>Para gestores de turmas </b>
                        <ul>
                            <li>
                                Apoiamos sua autonomia para ensinar! Assim, nas turmas são disponibilizados os mesmos recursos da turma padrão do QA+, mas quem define o conteúdo, exercicios e conquistas é você!
                            </li>
                            <li>
                                Conheça e apoie sua turma: para que possa apoiar o processo de aprendizagem de forma individualizada, permitimos o acompanhamento das estastísticas de cada inscrito em sua turma!
                            </li>
                        </ul>

                        <center>
                            <Button onClick={handleClick}>
                                Criar Turma
                            </Button>
                        </center>
                    </div>
                    <div className={styles.cards}>
                        <Card>
                            <div className={styles.cardTitle}>Minhas Turmas</div>
                            <Button>Criar Turma</Button>
                            <div className={styles.seeMore}>Ver todas</div>
                        </Card>
                        <Card>
                            <div className={styles.cardTitle}>Turmas em que eu estou inscrito</div>
                            <div className={styles.row}>

                                <div><img src={team1_colored} alt="" /></div>
                                <div className={styles.column}>
                                    <div><b>Automatização de teste</b></div>
                                    <div className={styles.teacher}>por: Fulano dos testes</div>
                                    <Button>Acessar</Button>
                                </div>
                            </div>
                            <div className={styles.seeMore}>Ver todas</div>
                        </Card>
                        <Card>
                            <div className={styles.cardTitle}>Buscar turmas</div>
                            <div>
                                <Input></Input>
                            </div>
                            <div className={styles.seeMore}> <a href="/courses/all"> Ver todas</a></div>
                        </Card>
                    </div>
                </div>



            </CenterContent>
        </div>

    </AppLayout>
}