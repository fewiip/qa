import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import styles from './BigUserCard.module.css'
import avatar_colored from "../../../../assets/images/avatar_colored.png"
//avatar_colored


export const BigUserCard = () => {
    const { user } = useAuthStore();

    return <>
        <div className={styles.userCard}>
            <div className={styles.imgAndInfo}>
            <div className={styles.userAvatar}>
                <img src={avatar_colored} alt="" />
            </div>


            <div className={styles.userInfo}>
                <div className={styles.userName}>{user?.firstName} {user?.lastName} </div>
                <div className={styles.userRole}>QA Master</div>
                <div>
                    <button>Atualizar dados</button>
                    <button>Excluir conta</button>
                </div>
            </div>
            </div>
            


            <div>
                <button>Sair</button>
            </div>
        </div>
    </>
}