import { FunctionComponent } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import styles from './CreateCourseCard.module.css'
import { CenterContent } from "../CenterContent/CenterContent.component";
import Image from "../../../../assets/images/image.png"
import { Input } from "../../../../shared/components/Input";
import { Button } from "../../../../shared/components/Button/Button.component";

interface CreateCourseCardProps {
    userid: number,
}

export const CreateCourseCard: FunctionComponent<CreateCourseCardProps> = (props) => {
    return <>
        <CenterContent>
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
    </>
}