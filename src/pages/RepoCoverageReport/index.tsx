import {PageContainer} from "@ant-design/pro-layout";
import {CheckCircleTwoTone} from "@ant-design/icons";
import {Avatar, Divider} from "antd";

const RepoCoverageReport = () => {
  return <PageContainer title={<div>
    <p>qingkong-platform</p>
    <p>
      <CheckCircleTwoTone twoToneColor="#52c41a" />
      <span>删除rep</span>
      <Divider type={'vertical'}/>
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <span>wr_zhang25 laset report</span>
    </p>
  </div>}>
    <div style={{backgroundColor:'#fff'}}>

    </div>

  </PageContainer>
}

export default RepoCoverageReport
