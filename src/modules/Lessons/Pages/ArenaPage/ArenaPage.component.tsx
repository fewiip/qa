import { AppLayout } from "../../../../shared/components/AppLayout"; 
import { CenterContent } from "../../components/CenterContent";

import styles from "./ArenaPage.module.css";
import battle2_colored from "../../../../assets/images/battle2_colored.png";
import { Card } from "../../../../shared/components/Card/Card.component";

export const ArenaPage = () => {
  return (
    <AppLayout page="arena" variant="white">
      <div className={styles.contentWrapper}>
        <CenterContent>
          <div className={styles.content}>
            <div className={styles.text}>
              <center>
                <h1>ARENA</h1>
                <img src={battle2_colored} alt="" />
                <p>
                  Duele com outro competidor em uma disputa de 05 minutos de
                  desafios e prove que você é o melhor!
                </p>
              </center>

              <b>Sobre o duelo:</b>
              <ul>
                <li>
                  Ambos os competidores iniciam com saldos de 10 pontos de bugs;
                </li>
                <li>
                  Cada resposta correta soma 1 ponto ao seu saldo de duelo;
                </li>
                <li>
                  Cada resposta incorreta desconta 1 ponto de seu saldo de
                  duelo;
                </li>
                <li>
                    O competidor que finalizar o duelo com mais pontos ganha; <b>01 vitória na arena</b> + o <b>saldo de pontos</b> de bugs que acumulou durante o duelo
                </li>
                <li>
                  Em caso de empate ambos os competidores ganham os benefícios
                </li>
              </ul>
            </div>
            <div className={styles.cards}>
              <Card>
                Infelizmente a funcionalidade de Arena ainda não está disponível
              </Card>
            </div>
          </div>
        </CenterContent>
      </div>
    </AppLayout>
  );
};
