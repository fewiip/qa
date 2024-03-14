import styles from "./LoginForm.module.css"
import { FunctionComponent, useState } from "react"

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void
}

export const LoginForm: FunctionComponent<LoginFormProps> = (props) => {

  const { onSubmit } = props  

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {


    onSubmit(email, password)  
  }

  return <div className={styles.loginCard}>
      <input type="text" value={email} onChange={(i) => setEmail(i.target.value)} /> <br />
      <input type="password" value={password} onChange={(i) => setPassword(i.target.value)} />  <br />

      <button onClick={handleSubmit}>Login</button>
  </div>
}