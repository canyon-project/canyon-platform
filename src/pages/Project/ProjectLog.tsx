import {Button, Drawer, Table} from "antd";
import React, {useEffect} from "react";
import {useState} from "react";
import request from "../../utils/request";
import moment from "moment";

const columns = [
    {
        title: '覆盖率Id',
        dataIndex: 'coverageId',
    },

    {
        title: 'Commit Sha',
        dataIndex: 'commitSha',
    },
    {
        title: '插桩路径',
        dataIndex: 'instrumentCwd',
    },
    {
        title: '上报者',
        dataIndex: 'reporterUsername',
    },
    {
        title: '上报时间',
        dataIndex: 'createdAt',
        render(_:any){
            return moment(_).format('YYYY-MM-DD HH:mm')
        }
    }
]

const ProjectLog: React.FC = ({visible,closeVisible,commitSha}:any) => {
    // const [visible, setVisible] = useState(false);
    // const showDrawer = () => {
    //     setVisible(true);
    // };
    const [dataSource,setDataSource] = useState([])
    useEffect(()=>{
        request.get('/api/cov/coverage/log',{params:{commitSha}}).then((res:any)=>{
            // console.log(res,commitSha)
            setDataSource(res)
        })
    },[commitSha])
    const onClose = () => {
        closeVisible()
    };
    return (
        <>
            <Drawer title="上报日志" placement="right" width={'65%'} onClose={onClose}  visible={visible}>
                <Table rowKey={'coverageId'} columns={columns} dataSource={dataSource}/>
            </Drawer>
        </>
    );
};


export default ProjectLog
