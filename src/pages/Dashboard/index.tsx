/* eslint-disable react-hooks/exhaustive-deps */
import {DashboardBackground, BodyContainer, InlineContainer, InlineTitle} from './styles';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useAuth from '../../hooks/userAuth';

import {pay, request} from '../../services/resources/pix'

import Statement from './Statement';
import { useEffect, useState } from 'react';

const Dashboard = () => {

    const {user, getCurrentUser} = useAuth();
    const wallet = user?.wallet || 0;

    const [Key, setKey] = useState('')
    const [generatedkey, setGeneratedKey] = useState('')
    const [value, setValue] = useState('')

    const handleNewPayment = async () =>{
        console.log('entrou')

        const {data} =  await request(Number(value))

        console.log('vallor', data);

        if(data.copyPastekey){
            setGeneratedKey(data.copyPastekey)
        }


    }

    const handlePayPix = async () => {

        try{
            const {data} = await pay(Key)

            if(data.mag){
                alert(data.mag)
                return
            }

            alert('Não foi possivel fazer pagamento')

        }catch(e){
            console.log(e);
            alert("Não é possivel receber o PIX do mesmo usuário")
        }

    }

 
 
    useEffect(()=>{
        getCurrentUser()
    }, [])

    if(!user){
        return null
    }

 

    return (
        <DashboardBackground>
            <Header />
            <BodyContainer>
                <div>
                   <Card noShadow width="90%">
                       <InlineTitle>
                        <h2 className="h2">Saldo Atual</h2>
                       </InlineTitle>
                       <InlineContainer>
                            <h3 className="wallet">
                                {wallet.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                            </h3>
                        </InlineContainer>
                   </Card>
                   <Card noShadow width="90%">
                       <InlineTitle>
                        <h2 className="h2">Receber PIX</h2>
                       </InlineTitle>
                        <InlineContainer>
                            <Input value={value} onChange={e => setValue(e.target.value)}style={{flex:1}} placeholder="Valor"/>
                            <Button onClick={handleNewPayment}>Gerar código</Button>
                        </InlineContainer>
                            {generatedkey &&(
                                <>
                                <p className="primary-color">Pix copia e cola:</p>
                                <p className="primary-color">asd10asd1asd1as4d1asd4</p>
                                </>
                            )}
                            
                        
                   </Card>
                   <Card noShadow width="90%">
                        <InlineTitle>
                            <h2 className="h2">Pagar PIX</h2>
                        </InlineTitle>
                        <InlineContainer>
                        <Input style={{flex:1}} value={Key} onChange={ e => setKey(e.target.value)}
                        placeholder="Insira a chave"/>
                        <Button onClick={handlePayPix}>Pagar PIX</Button>
                        </InlineContainer>
                   </Card>
                </div>
                <div>
                    <Card noShadow width="90%">
                      <InlineTitle>
                      <h2 className="h2">Extrato da conta</h2>
                      </InlineTitle>
                      <Statement />
                   </Card>
                </div>
            </BodyContainer>
        </DashboardBackground>
    )
}

export default Dashboard;