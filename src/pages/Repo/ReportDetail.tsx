import { Avatar, Button, Drawer, Table } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react'
import request from '../../utils/request'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const ReportDetail: React.FC = ({
  visible,
  closeVisible,
  commitSha,
  dataSource,
  selectCommit,
}: any) => {
  const { t } = useTranslation()
  const columns = [
    {
      title: t('coverage') + 'ID',
      dataIndex: 'id',
    },

    {
      title: 'Commit Sha',
      dataIndex: 'commitSha',
    },
    {
      title: t('instrumentCwd'),
      dataIndex: 'instrumentCwd',
    },
    {
      title: t('reporter'),
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
      title: t('reportTime'),
      dataIndex: 'createdAt',
      render(_: any) {
        return moment(_).format('YYYY-MM-DD HH:mm')
      },
    },
  ]
  const onClose = () => {
    closeVisible()
  }
  return (
    <>
      <Drawer
        title={t('reportLog')}
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
