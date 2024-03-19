import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api";
import { LoginForm } from "../../components/LoginForm";
import { useAuthStore } from "../../stores/useAuthStore.hook";
import styles from "./LoginPage.module.css";
import { RouteEnum } from "../../../../routes/router";

export const LoginPage = () => {

  const { login } = useAuth()
  const { setToken } = useAuthStore()
  const navigate = useNavigate()


  async function handleSubmit(email: string, password: string) {
    try {
      const response = await login(email, password)

      setToken(response.data.token)

      navigate(RouteEnum.LESSONS)
    } catch (error) {
      alert('usuario ou senha incorreto')
    }
  }

  return <div className={styles.loginWrapper}>
    <div className={styles.loginCard}>
      Login
      
      <br />

      <LoginForm onSubmit={handleSubmit} />

      <a href="#">Criar um usuario</a> <br />

      <a href="">Esqueci a minha senha</a> 

    </div>
  </div>
}