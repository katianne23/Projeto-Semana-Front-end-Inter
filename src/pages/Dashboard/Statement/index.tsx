import { useState, useEffect } from 'react';
import {StatementContainer, StatementItemImage, StatementItemInfo, StatementItemContainer} from './styles'
import {FiDollarSign} from 'react-icons/fi'
import {format} from 'date-fns';
import {transactions} from '../../../services/resources/pix';

interface StatementItem{
    user:{
        firstName: string,
        lastName: string
    },
    value: number,
    type: 'paid' | 'received',
    updatedAt: Date
}

const StatementItem =({user,type, value, updatedAt}: StatementItem) =>{
   return(
       <StatementItemContainer>
           <StatementItemImage type={type}>
           <FiDollarSign size={24}/>
           </StatementItemImage>
           <StatementItemInfo>
           <p className="primary-color">
                    {value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                </p>
                <p className="">{type === 'paid' ? `Pago a `: `Recebido de`} <strong>{user.firstName} {user.lastName}</strong></p>
                <p className="">{format(new Date (updatedAt), "dd/MM/yyyy 'às' HH:mm'h'")}</p>
           </StatementItemInfo>
       </StatementItemContainer>

   )
}
const Statement = () => {

    const [statements, setStatements] =useState<StatementItem[]>([]);

    const getAlltransactions = async () => {
        const {data}= await transactions();
        setStatements(data);
    }

    useEffect(()=>{
        getAlltransactions();
    },[])
    return(
        <StatementContainer>
            {statements.length > 0 && statements.map(statement => <StatementItem {...statement}/>)}
        </StatementContainer>

      
    )
}

export default Statement;