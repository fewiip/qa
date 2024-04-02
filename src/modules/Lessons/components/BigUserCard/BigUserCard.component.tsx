import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import styles from './BigUserCard.module.css'

export const BigUserCard = () => {
    const { user } = useAuthStore();

    return <>
        <div className={styles.userCard}>
            
            <div>coluna imagem</div>
            <div>coluna
            <div>line 
            <div className={styles.userName}>{user?.firstName} {user?.lastName} </div>
            <div className={styles.userRole}>QA Master</div>
                 e botao</div>
            <div>line atualizar dados e excluir conta</div>
            </div>
        </div>
    </>
}