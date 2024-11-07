import { Button } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';
const WebPage = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('https://kuliyevmerdan.github.io/invoke-testing/')
    }
    return(
        <>
            <Button
                stretched
                mode='filled'
                onClick={handleClick}
            >Navigate</Button>
        </>
    )
}
export default WebPage;