import React, { useRef, useState } from "react";
import type { ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { CoverageService } from '../../services/CoverageService'
import { ProjectService } from '../../services/ProjectService'
import { Button, Divider, message, Popconfirm, Spin } from "antd";
import { useNavigate } from "react-router-dom";

export type TableListItem = {
  id: number
  commitSha: string
  projectName: string
}

const ProjectList: React.FC = () => {
  const [spinning,setSpinning] = useState<any>(false)
  const ref = useRef<any>()
  const history = useNavigate()
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
    },
    {
      title: 'Commit',
      dataIndex: 'commitSha',
    },
    {
      title: '项目id',
      dataIndex: 'repoId',
    },
    {
      title: '源ID',
      dataIndex: 'codeHouseId',
    },
    {
      title: '操作',
      search: false,
      render(_, tableListItem) {
        return (
          <div>

            {/*<a onClick={()=>{*/}
            {/*  setSpinning(true)*/}
            {/*  CoverageService.triggerCoverage({projectId: tableListItem.id}).then(res=>{*/}

            {/*    if(res.error){*/}
            {/*      message.error(res.msg)*/}
            {/*      setSpinning(false)*/}
            {/*    } else {*/}
            {/*      message.info(res.msg)*/}
            {/*      setSpinning(false)*/}
            {/*    }*/}
            {/*  })*/}
            {/*}} style={{color:'purple'}}>生成报告</a>*/}
            {/*<Divider type={'vertical'}/>*/}
            <a
              onClick={() => {
                window.open(
                  `/report/${tableListItem.id}/index.html`
                )
              }}
            >
              查看报告
            </a>
            <Divider type={'vertical'}/>
            <Popconfirm
              title="确认删除?"
              onConfirm={()=>{
                ProjectService.deleteAProject({id: tableListItem.id}).then(res=>{
                  message.success('删除成功')
                  ref.current.reload()
                })
              }}
              onCancel={()=>{}}
              okText="Yes"
              cancelText="No"
            >
              <a style={{color:'red'}}>删除</a>
            </Popconfirm>
          </div>
        )
      },
    },
  ]
  return (
    <div>
      <Spin spinning={spinning}>
        <ProTable<TableListItem>
          search={false}
          columns={columns}
          actionRef={ref}
          request={(params, sorter, filter) => {
            return ProjectService.listProject().then((res) => {
              return {
                data: res.map((item: any) => ({
                  ...item,
                })),
                success: true,
              }
            })
          }}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
          }}
          dateFormatter="string"
          toolBarRender={() => [
            <Button
              type={'primary'}
              onClick={() => {
                history(`/project/-1`)
              }}
            >
              新增
            </Button>,
          ]}
        />
      </Spin>

    </div>
  )
}

export default ProjectList
