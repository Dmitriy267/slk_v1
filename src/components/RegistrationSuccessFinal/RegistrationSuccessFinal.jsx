import './RegistrationSuccessFinal.sass'
import Button from '../Button/ButtonMain'
import img from '../../assets/images/SuccessRegistration.svg'
import { useNavigate } from 'react-router-dom'

export const RegistrationSuccessFinal = () => {
    const navigate = useNavigate()

    return (
        <section className="registrationSuccess">
            <div className="registrationSuccess__form">
                <img src={img} alt="" className="registrationSuccess__img" />

                <div className="registrationSuccess__content">
                    <h2 className="registrationSuccess__title">Почта успешно подтверждена!</h2>
                    <div className="registrationSuccess__button">
                        <Button title='В личный кабинет' size='281px' action={() => navigate('/')}/>
                    </div>
                </div>
            </div>
            
        </section>
    )
}