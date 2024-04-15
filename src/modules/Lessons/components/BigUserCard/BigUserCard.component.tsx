import { useAuthStore } from "../../../auth/stores/useAuthStore.hook";
import styles from './BigUserCard.module.css'
import avatar_colored from "../../../../assets/images/avatar_colored.png"
import { useNavigate } from 'react-router-dom';
import { Button } from "../../../../shared/components/Button/Button.component";



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
                    <Button onClick={editUser}>Atualizar dados</Button>
                    <Button onClick={deleteUser}>Excluir conta</Button>
                </div>
            </div>
            </div>
            


            <div>
                <Button>Sair</Button>
            </div>
        </div>
    </>
}