import { FunctionComponent, useState } from "react";
import { CenterCard } from "../CenterCard/CenterCard.component";
import styles from './ActionsHelperCard.module.css'
import add1 from "../../../../assets/images/add1.png"
import add3 from "../../../../assets/images/add3.png"
import add4 from "../../../../assets/images/add4.png"
import edit from "../../../../assets/images/edit.png"
import delete1 from "../../../../assets/images/delete.png"


export const ActionsHelperCard: FunctionComponent = (props) => {
    return <>
        <CenterCard>
            <div className={styles.title}>Ações</div>
            <div className={styles.line}>
                <div className={styles.item}>
                    <div className={styles.image}>
                        <img src={add1} alt="" />
                    </div>
                    <div className={styles.text}>
                        Novo <br /> Capítulo
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.image}>
                        <img src={add3} alt="" />
                    </div>
                    <div className={styles.text}>
                        Nova <br /> Lição
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.image}>
                        <img src={add4} alt="" />
                    </div>
                    <div className={styles.text}>
                        Novo <br /> Desafio
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.item}>
                        <div className={styles.image}>
                            <img src={edit} alt="" />
                        </div>
                        <div className={styles.text}>
                            Editar
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.image}>
                            <img src={delete1} alt="" />
                        </div>
                        <div className={styles.text}>
                            Remover
                        </div>
                    </div>
                </div>
            </div>
        </CenterCard>
    </>
}