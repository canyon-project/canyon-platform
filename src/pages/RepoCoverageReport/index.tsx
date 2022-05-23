import { PageContainer } from '@ant-design/pro-layout'
import { CheckCircleTwoTone, FieldTimeOutlined } from '@ant-design/icons'
import { Avatar, Divider } from 'antd'
import { CoverageService } from '../../services/CoverageService'
import { useEffect, useState } from 'react'
import CoverageReport from '../../components/CanyonReport'
import { useNavigate, useParams } from 'react-router-dom'
import { useMount } from 'ahooks'
import React from 'react'
import {useTranslation} from "react-i18next"
import moment from "moment"

const RepoCoverageReport = () => {
  // 数据准备 根据commit获取commitMsg、头像、用户名、最后一次上报时间
  const [fd, setFd] = useState<any>({})
  const {t} = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const [fileCoverage, setFileCoverage] = useState<any>([])
  const [treeSummary, setTreeSummary] = useState<any>([])
  const [loading, setLoading] = useState<any>(false)
  const [fileDetail, setFileDetail] = useState<any>({
    fileName: '.js',
    content: '',
  })

  const [baseInfo, setBaseInfo] = useState<any>({})

  // console.log(params,'params')

  // 组件挂载时
  useMount(() => {
    CoverageService.retrieveACoverageForAProjectService({
      commitSha: params.commitSha,
      thRepoId: `${params.group}/${params.repo}`,
    }).then((res) => {
      setTreeSummary(res.treeSummary)
      setFd(res.fd)
      setBaseInfo(res.baseInfo)

      setTimeout(()=>{
        document.querySelector("#main-box > div > section > div.ant-layout > main > div > div.ant-pro-page-container > div.ant-pro-grid-content > div > div > div > div > div.tree-file-dir > div > div.ant-tree-list > div > div > div > div > span.ant-tree-node-content-wrapper.ant-tree-node-content-wrapper-close.ant-tree-node-selected").click()
      },200)
    })
  })
  function onSelect(val: any) {
    if (!val.isLeaf) {
      return
    }
    const filePath = encodeURIComponent(val.fullPath)
    navigate(
      `/${params.group}/${params.repo}/${params.commitSha}?path=${filePath}`,
    )
    const newParams = {
      filePath,
      commitSha: params.commitSha,
      projectId: encodeURIComponent(`${params.group}/${params.repo}`),
    }
    setLoading(true)
    CoverageService.fileContent(newParams).then((res) => {
      setLoading(false)
      function getDecode(str: string) {
        return decodeURIComponent(
          atob(str)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join(''),
        )
      }
      setFileDetail({
        fileName: res.fileDetail.file_name,
        content: getDecode(res.fileDetail.content),
      })
      setFileCoverage(res.fileCoverage)
    })
  }

  return (
    <PageContainer
      title={
        <div>
          <p>qingkong-platform</p>
          <div style={{ fontSize: '14px', color: '#4f5162' }}>
            {/*<CheckCircleTwoTone twoToneColor="#52c41a" />*/}
            <span style={{}}>{baseInfo.commitMsg}</span>
            <Divider type={'vertical'} />
            <Avatar src={baseInfo.lastReportAvatar} />
            <span style={{ fontSize: '12px', fontWeight: 'normal' }}>
              {baseInfo.lastReportUsername} {t('recentReport')}
            </span>
            <Divider type={'vertical'} />

            <div
              style={{
                fontSize: '12px',
                fontWeight: 'normal',
                display: 'inline-block',
              }}
            >
              <FieldTimeOutlined />
              <span style={{ marginLeft: '8px' }}>
                {moment(baseInfo.lastTimeReport).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </div>
          </div>
        </div>
      }
    >
      <div style={{ backgroundColor: '#fff' }}>
        <CoverageReport
          loading={loading}
          treeSummary={treeSummary}
          fileDetail={fileDetail}
          fileCoverage={fileCoverage}
          onSelect={(val: any) => {
            onSelect(val)
          }}
        />
      </div>
    </PageContainer>
  )
}

export default RepoCoverageReport
