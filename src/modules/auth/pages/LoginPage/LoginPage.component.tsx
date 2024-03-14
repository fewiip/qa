import { useAuth } from "../../api";
import { LoginForm } from "../../components/LoginForm";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {

  const { login } = useAuth()


  async function handleSubmit(email: string, password: string) {
    const response = await login(email, password)

    console.log(response)
  }

  return <div className={styles.loginWrapper}>
    <div className={styles.loginCard}>
      Login
      
      <br />

      <LoginForm onSubmit={handleSubmit} />
    </div>
  </div>
}