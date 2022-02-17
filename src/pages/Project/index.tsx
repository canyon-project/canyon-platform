import React, { useRef } from "react";
import { Button, Tooltip, Tag, Divider, Popconfirm, message, notification } from "antd";
import { DownOutlined, QuestionCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProjectService } from "../../services/ProjectService";
import { useNavigate } from "react-router-dom";
import { CoverageService } from "../../services/CoverageService";
import './index.less'

export type TableListItem = {
  id: number
  commitSha: string
  projectName: string
}


const columns: ProColumns<TableListItem>[] = [
  {
    title: '项目ID',
    dataIndex: 'id',
  },
  {
    title: '仓库Id',
    dataIndex: 'repoId',
  },
  {
    title: '仓库名称',
    dataIndex: 'projectRepoDetail',
    render(_:any,tableListItem){
      return <span>{_.name_with_namespace}</span>
    }
  },
  {
    title: 'BU',
    dataIndex: 'projectRepoDetail',
    render(_: any,tableListItem){
      return <span>{_.bu}</span>
    }
  },
  {
    title: '源名称',
    dataIndex: 'codeHouseApiVersion',
  }
]

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



export default () => {
  const ref = useRef<any>()
  const history = useNavigate()
  const expandedRowRender = (p:any) => {
    return (
      <ProTable
        rowKey={'commitSha'}
        actionRef={ref}
        columns={[
          {
            title: 'Commit',
            dataIndex: 'commitSha',
          },
          {
            title: '操作',
            search: false,
            render(_, tableListItem) {
              return (
                <div>
                  <a
                    onClick={() => {
                      history(`/project/${tableListItem.projectId}/commit/${tableListItem.commitSha}/tree/-1`)
                    }}
                  >
                    查看报告
                  </a>
                </div>
              )
            },
          },
        ]}
        headerTitle={false}
        search={false}
        options={false}
        request={(params, sorter, filter) => {
          console.log(p,'p')
          return CoverageService.listCoverageByCommit({projectId: p.id}).then((res) => {
            return {
              data: res.filter((item:any) => item.repoId === p.repoId),
              success: true,
            }
          })
        }}
        pagination={false}
      />
    );
  };

  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        return ProjectService.listProject().then((res) => {
          return {
            data: res.reduce((previousValue:any, currentValue:any)=>{
              if (!previousValue.map((item:any)=>item.repoId).includes(currentValue.repoId)){
                previousValue.push(currentValue)
              }
              return previousValue
            },[]),
            success: true,
          }
        })
      }}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
      }}
      expandable={{ expandedRowRender }}
      search={false}
      dateFormatter="string"
    />
  );
};
