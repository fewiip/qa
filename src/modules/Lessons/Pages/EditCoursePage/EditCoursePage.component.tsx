import { useParams } from "react-router-dom"
import { CenterContent } from "../../components/CenterContent"
import Image from "../../../../assets/images/image.png"
import styles from './EditCoursePage.module.css'
import { Button } from "../../../../shared/components/Button/Button.component"
import { Input } from "../../../../shared/components/Input"

export const EditCoursePage = () => {
    const {courseid} = useParams();
    return <CenterContent>
        <div className={styles.content}>
                <div className={styles.img}>
                    <img src={Image} alt="" />
                </div>
                <div className={styles.text}>
                    <div>
                        Turma: <Input placeholder="Nome da Turma" />
                    </div>
                    <div>
                        <Button>
                            Salvar
                        </Button>
                        <Button>
                            Cancelar
                        </Button>
                    </div>
                </div>

            </div>
    </CenterContent>
}