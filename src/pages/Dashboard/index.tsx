import React, {useEffect, useRef, useState} from "react";
import { Button, Tooltip, Tag, Divider, Popconfirm, message, notification } from "antd";
import { DownOutlined, QuestionCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProjectService } from "../../services/ProjectService";
import { useNavigate } from "react-router-dom";
import { CoverageService } from "../../services/CoverageService";
// import './index.less'
// import ProjectLog from "./ProjectLog";
import request from "../../utils/request";
import {PageContainer} from "@ant-design/pro-layout";

export type TableListItem = {
    id: number
    commitSha: string
    projectName: string
}




const openNotification = (req:any,res:any) => {
    // const type:any = res.error?'error':'success'
    const codePath = `${req.codeHouseId}-${req.repoId}-${req.commitSha}`
    const args = {
        message: '覆盖率报告生成成功',
        description: <p>{res.msg} <a target={'_blank'} href={`/report/${codePath}`}>查看详情</a></p>,
        duration: 0
    };
    notification.success(args)
};



const Dashboard =  () => {
    const columns: ProColumns<TableListItem>[] = [
        {
            title: '项目ID',
            dataIndex: 'id',
        },
        // {
        //     title: '仓库Id',
        //     dataIndex: 'repoId',
        // },
        {
            title: '仓库名称',
            dataIndex: 'path_with_namespace',
            render(_:any,tableListItem){
                return <a onClick={()=>{
                    history(`/${_}`)
                }}>{_}</a>
            }
        },
        // {
        //     title: 'BU',
        //     dataIndex: 'projectRepoDetail',
        //     render(_: any,tableListItem){
        //         return <span>{_.bu}</span>
        //     }
        // },
        // {
        //     title: '源名称',
        //     dataIndex: 'codeHouseApiVersion',
        // }
    ]
    const ref = useRef<any>()
    const history = useNavigate()

    const [projectLogVisible, setProjectLogVisible] = useState(false);
    const [projectLogCommitSha, setProjectLogCommitSha] = useState(-1);

    function closeProjectLogVisible() {
        setProjectLogVisible(false)
    }



    return (
        <PageContainer title={'Dashboard'}>
            <ProTable<TableListItem>
                columns={columns}
                request={(params, sorter, filter) => {
                    return ProjectService.listProject().then((res) => {
                        return {
                            data: res,
                            success: true,
                        }
                    })
                }}
                rowKey="id"
                pagination={{
                    showQuickJumper: true,
                }}
                search={false}
                dateFormatter="string"
            />
            {/*<ProjectLog commitSha={projectLogCommitSha} visible={projectLogVisible} closeVisible={closeProjectLogVisible}/>*/}
        </PageContainer>
    );
};

export default Dashboard
