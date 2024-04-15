import { AppLayout } from '../../../../shared/components/AppLayout';
import { Button } from '../../../../shared/components/Button/Button.component';
import { CenterCard } from '../../components/CenterCard/CenterCard.component';
import { CenterContent } from '../../components/CenterContent/CenterContent.component';
import styles from './CoursesPage.module.css'

export const CoursesPage = () => {
    return <AppLayout page='courses' variant='white'>
        <div className={styles.contentWrapper}>
            <CenterContent>
                <div>
                    
                </div>
                <div className={styles.content}>
                    <div className={styles.text}>
                        <center><h1>Turmas</h1>
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
                    </div>
                </div>


                <Button>
                    Criar Turma
                </Button>
            </CenterContent>
        </div>

    </AppLayout>
}