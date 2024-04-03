import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import styles from './BigUserCard.module.css'
import avatar_colored from "../../../../assets/images/avatar_colored.png"
import { useNavigate } from 'react-router-dom';



export const BigUserCard = () => {
    const { user } = useAuthStore()
    const navigate = useNavigate()

    function editUser() {
        navigate('')
    }

    function deleteUser() {
        navigate('')
    }

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
                    <button onClick={editUser}>Atualizar dados</button>
                    <button onClick={deleteUser}>Excluir conta</button>
                </div>
            </div>
            </div>
            


            <div>
                <button>Sair</button>
            </div>
        </div>
    </>
}