import WelcomeSvg from '../../assets/img/sss.svg'
import logoSvg from '../../assets/img/logo.svg'
import './index.less'
import {Button} from "antd";
const Welcome = () => {

    function fn() {
        let redirect_uri = ''
        let ClientId = ''
        if (window.location.hostname.includes('127.0.0.1')){
            redirect_uri = 'http://127.0.0.1:8000/login'
            ClientId = '50c768081026f4da5a0fb5368d36fa5e464d0ea614ed022490ad5771f3c688b3'
        } else {
            redirect_uri = 'http://canyon-platform-v2.fat-1.qa.nt.ctripcorp.com/login'
            ClientId = 'f8261f28206104cd4370436c24d274fb02deb8722cebe8156d2fe8882d3c079d'
        }
        window.location.href = `http://gitlab.com/oauth/authorize?response_type=code&state=STATE&scope=api&client_id=${ClientId}&redirect_uri=${redirect_uri}`
    }

    return <div className={'welcome'}>
        <div className={'left-box'}>
            <div className="login-form">
                <div className="logo">
                    <img src={logoSvg} alt=""/>
                    <span>CANYON</span>
                </div>
                <h1 className={'title'}>
                    你好，
                    <br/>
                    欢迎来到Canyon。
                </h1>
                <p className={'desc'}>您将被重定向到源代码管理系统进行身份验证。</p>
                <Button type={'primary'} style={{width:'100%'}} size={'large'} onClick={()=>fn()}>继续</Button>
            </div>
        </div>
        <div className={'right-box'}>
            <div className={'img-wrap'} style={{backgroundImage:`url(${WelcomeSvg})`}}>
                {/*<img src={WelcomeSvg}/>*/}
            </div>
        </div>
    </div>
}

export default Welcome
