import { HeaderContainer, HeaderWrapper, UserInfo } from "./styles";

import useAuth from '../../hooks/userAuth';
import logoInter from '../../assets/images/Inter-orange.png';

import UserCircle from "../UserCircle";
import { useNavigate } from "react-router-dom";

const Header = () =>{
    const navigate = useNavigate();
    const {user} = useAuth()

    const initials = user.firstName.substr(0,1)+user.lastName.substr(0,1)
    
    const handleLogoff = () =>{
        navigate('/signin')
    }

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <img src ={logoInter} width={172} height={61} alt="Logo Inter"/>
                <UserInfo>
                    <UserCircle initials={initials}/>
                    <div>
                        <p>Olá .<span className="primary-color font-bold">{user.firstName} {user.lastName}</span></p>
                        <strong>{user.accountNumber}-{user.accountDigit}</strong><br />
                        <a href="/" onClick={handleLogoff}>Sair</a>
                            </div>                    

                </UserInfo>
            </HeaderWrapper>
        </HeaderContainer>
    )
}

export default Header