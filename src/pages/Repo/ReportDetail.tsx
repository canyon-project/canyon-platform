import { Avatar, Button, Drawer, Table } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react'
import request from '../../utils/request'
import moment from 'moment'

const columns = [
  {
    title: '覆盖率Id',
    dataIndex: 'id',
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
    render(_, t): any {
      return (
        <div>
          <Avatar src={t.reporterAvatar} />
          <span style={{ marginLeft: '10px', color: '#4f5162' }}>
            {t.reporterUsername}
          </span>
        </div>
      )
    },
  },
  {
    title: '上报时间',
    dataIndex: 'createdAt',
    render(_: any) {
      return moment(_).format('YYYY-MM-DD HH:mm')
    },
  },
]

const ReportDetail: React.FC = ({
  visible,
  closeVisible,
  commitSha,
  dataSource,
  selectCommit,
}: any) => {
  const onClose = () => {
    closeVisible()
  }
  return (
    <>
      <Drawer
        title="上报日志"
        placement="right"
        width={'65%'}
        onClose={onClose}
        visible={visible}
      >
        <Table
          rowKey={'id'}
          columns={columns}
          dataSource={
            dataSource.find((item: any) => item.commitSha === selectCommit)
              ?.record || []
          }
        />
      </Drawer>
    </>
  )
}

export default ReportDetail
