import React, { useRef } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { CodeHouseService } from '../../services/CodeHouseService'
import { Button, Divider, message, Popconfirm } from 'antd'
import { useNavigate } from "react-router-dom";
import moment from 'moment'

export type TableListItem = {
  id: number
  commitSha: string
  projectName: string
}

const CodeHouse: React.FC = () => {
  const ref = useRef<any>()
  const history = useNavigate()
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '源ID',
      dataIndex: 'id',
    },
    {
      title: '源名称',
      dataIndex: 'apiVersion',
    },
    {
      title: '源地址',
      dataIndex: 'gitUrl',
    },
    {
      title: 'Token',
      dataIndex: 'token',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render(_){
        return <span>{moment(_).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      render(_){
        return <span>{moment(_).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '操作',
      search: false,
      render(_, tableListItem) {
        return (
          <div>
            <a
              onClick={() => {
                history(`/code-house/${tableListItem.id}`)
              }}
            >
              查看
            </a>
            <Divider type={'vertical'} />
            <Popconfirm
              title="确认删除?"
              onConfirm={() => {
                CodeHouseService.deleteACodeHouse({
                  id: tableListItem.id,
                }).then((res) => {
                  message.success('删除成功')
                  ref.current.reload()
                })
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </div>
        )
      },
    },
  ]
  return (
    <div>
      <ProTable<TableListItem>
        search={false}
        columns={columns}
        actionRef={ref}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        request={(params, sorter, filter) => {
          return CodeHouseService.listCodeHouse().then((res) => {
            return {
              data: res,
              success: true,
            }
          })
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            type={'primary'}
            onClick={() => {
              history(`/code-house/-1`)
            }}
          >
            新增
          </Button>,
        ]}
      />
    </div>
  )
}

export default CodeHouse
