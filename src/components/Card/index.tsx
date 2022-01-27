import {CardContainer} from './styles';


interface CardProps {
    width?: string,
    children?: React.ReactNode;
    height?: string,
    noShadow?: boolean,
    noBorder?: boolean
}

const Card = ({
    children,
    width='100%',
    height='auto',
    noShadow = false,
    noBorder = false,
    }: CardProps) => {
    return (
        <CardContainer width={width} height={height} noShadow={noShadow} noBorder={noBorder} >
            {children}
        </CardContainer>
    )
}

export default Card;