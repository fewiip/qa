import { Button } from "../../../../shared/components/Button/Button.component"
import { Input } from "../../../../shared/components/Input"
import { SignUpProps } from "../../api"
import styles from "./SignUpForm.module.css"
import { FunctionComponent, useEffect, useMemo, useState } from "react"

interface SignUpFormProps {
  onSubmit: (payload: SignUpProps) => void
}

export const SignUpForm: FunctionComponent<SignUpFormProps> = (props) => {

  const { onSubmit } = props

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  function handleSubmit() {
    const formError = [];

    if (!firstName.length || firstName.length > 255) {
      formError.push('firstName')
    }

    if (!lastName.length || lastName.length > 255) {
      formError.push('lastName')
    }

    if (!password.length || password.length > 255) {
      formError.push('password')
    } 

    if (password !== confirmPassword ) {
      formError.push('confirmPassword')
    }

    if (formError.length) {
      setErrors(formError)
      return
    }

    onSubmit({ email, password, firstName, lastName })
  }

  useEffect(() => {
    setErrors(prev => prev.filter(i => i !== 'password'))
  }, [confirmPassword, password])

  const  hasPasswordError = useMemo(() =>  {
    return Boolean(errors.find(i => i === 'password'))
  }, [confirmPassword, password, errors])

  const  hasfirstNameError = useMemo(() =>  {
    return Boolean(errors.find(i => i === 'firstName'))
  }, [firstName, errors])

  return (
    <div className={styles.loginCard}>

      <Input placeholder='Nome' type="text" value={firstName} onChange={(i) => setFirstName(i.target.value)} hasError={hasfirstNameError} />
      {
        
      }
      <Input placeholder='Sobrenome' type="text" value={lastName} onChange={(i) => setLastName(i.target.value)} />

      <Input placeholder='E-mail' type="text" value={email} onChange={(i) => setEmail(i.target.value)} />

      <Input placeholder='Senha' type="password" value={password} onChange={(i) => setPassword(i.target.value)} hasError={hasPasswordError}/>
      <Input placeholder='Confirmar senha' type="password" value={confirmPassword} onChange={(i) => setConfirmPassword(i.target.value)} hasError={hasPasswordError} />

      {
        hasPasswordError && <div className={styles.errorPasswordMessage}>Ops! A senha e a confirmação de senha não coincidem. Por favor, verifique e tente novamente.</div>
      }

      <Button onClick={handleSubmit}>Criar conta</Button>

      <div className={styles.politics}>
        Ao entrar no QA+ você concorda com nossos <a href="">Termos</a> e <a href="">Políticas de Privacidade</a>
      </div>
    </div>
  )
}