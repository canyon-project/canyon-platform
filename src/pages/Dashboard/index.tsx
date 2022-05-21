import React from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table'
import { RepoService } from '../../services/RepoService'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '@ant-design/pro-layout'
import { useTranslation } from 'react-i18next'

type TableListItem = {
  id: number
  pathWithNamespace: string
  times: number
  lastTimeReport: string
}

const Dashboard = () => {
  const { t } = useTranslation()
  const columns: ProColumns<TableListItem>[] = [
    {
      title: t('repoId'),
      dataIndex: 'id',
    },
    {
      title: t('repoName'),
      dataIndex: 'pathWithNamespace',
      render(_, tableListItem) {
        return (
          <a
            onClick={() => {
              history(`/${tableListItem.pathWithNamespace}`)
            }}
          >
            {tableListItem.pathWithNamespace}
          </a>
        )
      },
    },
    {
      title: t('reportTimes'),
      dataIndex: 'times',
    },
    {
      title: t('lastTimeReport'),
      dataIndex: 'lastTimeReport',
      valueType: 'dateTime',
    },
    {
      title: t('operation'),
      render(_, tableListItem: any) {
        return (
          <a
            onClick={() => {
              history(`/${tableListItem.pathWithNamespace}`)
            }}
          >
            {t('detail')}
          </a>
        )
      },
    },
  ]

  const history = useNavigate()

  return (
    <PageContainer title={'Dashboard'}>
      <ProTable<TableListItem>
        columns={columns}
        request={() => {
          return RepoService.repoList().then((res) => {
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
        options={false}
        headerTitle={t('repoList')}
      />
    </PageContainer>
  )
}

export default Dashboard
