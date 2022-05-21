import { PageContainer } from '@ant-design/pro-layout'
import { Button, Divider, Spin } from 'antd'
import React, { useRef, useState } from 'react'
import './index.less'
import { useMount, useUnmount } from 'ahooks'
import * as echarts from 'echarts'
import ProTable, { ProColumns } from '@ant-design/pro-table'
import { CoverageService } from '../../services/CoverageService'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ReportDetail from './ReportDetail'

const Repo = () => {
  const [dataSource, setDataSource] = useState([])
  const [reportDetailVisible, setReportDetailVisible] = useState(false)
  const [selectCommit, setSelectCommit] = useState('')
  const [summarySpinning, setSummarySpinning] = useState(false)
  const [summaryData, setSummaryData] = useState({
    gongGeData: [...[0, 1, 2, 3].map((item) => ({ label: '-', value: '-' }))],
    chartData: [],
  })
  const content = <div></div>
  const chartRef = useRef(null)
  const navigate = useNavigate()
  const lLocation = useLocation()
  const { group, repo } = useParams()
  useMount(() => {
    setSummarySpinning(true)
    CoverageService.repoSummary({
      id: encodeURIComponent(`${group}/${repo}`),
    }).then((res) => {
      setSummarySpinning(false)
      setSummaryData(res)
      setTimeout(() => {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(chartRef.current)
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: '最近几次commit覆盖率情况',
          },
          tooltip: {},
          legend: {
            // data: ['销量']
          },
          xAxis: {
            data: [],
          },
          yAxis: {},
          grid: {
            bottom: '15%',
          },
          series: [
            {
              label: {
                show: true,
                position: 'top',
              },
              // name: '销量',
              type: 'bar',
              data: [],
            },
          ],
        }

        const chartData = res.chartData

        for (let i = 0; i < chartData.length; i++) {
          option.xAxis.data.push(chartData[i].commitSha.slice(0, 8))
          option.series[0].data.push(chartData[i].coverage)
        }
        console.log(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
        window.listener = function () {
          console.log('重！！！')
          myChart.resize()
        }
        window.addEventListener('resize', window.listener)
      }, 100)
    })
  })
  useUnmount(() => {
    console.log('取消监听')
    window.removeEventListener('resize', window.listener)
  })
  const columns: ProColumns<any>[] = [
    {
      title: 'Commit Sha',
      dataIndex: 'commitSha',
      render(_: any, tableListItem) {
        return (
          <a
            onClick={() => {
              navigate(`${lLocation.pathname}/${_}`)
            }}
          >
            {_}
          </a>
        )
      },
    },
    {
      title: 'Commit Message',
      dataIndex: 'commitMsg',
    },
    {
      title: '上报次数',
      dataIndex: 'times',
    },
    {
      title: '最近一次上报',
      dataIndex: 'lastTimeReport',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      render(_, tableListItem) {
        return (
          <div>
            <a
              onClick={() => {
                navigate(`/${group}/${repo}/${tableListItem.commitSha}`)
              }}
            >
              详情
            </a>
            <Divider type={'vertical'} />
            <a
              onClick={() => {
                setReportDetailVisible(true)
                setSelectCommit(tableListItem.commitSha)
              }}
            >
              日志
            </a>
          </div>
        )
      },
    },
  ]

  return (
    <PageContainer
      title={<div style={{ width: '100%' }}>{repo}</div>}
      content={content}
      tabList={[
        {
          tab: '上报',
          key: 'base',
        },
      ]}
      extraContent={<div></div>}
      extra={[]}
    >
      <div
        style={{
          paddingTop: '20px',
        }}
      >
        <div>
          <p className={'title'}>概览</p>
          <Spin spinning={summarySpinning}>
            <div className={'summary'}>
              <div className={'summary-left'}>
                {summaryData.gongGeData.map((item) => {
                  return (
                    <div className="item">
                      <span className="label">{item.label}</span>
                      <span className="value">{item.value}</span>
                    </div>
                  )
                })}
              </div>
              <div className={'summary-right'}>
                <div
                  ref={chartRef}
                  style={{ width: '100%', height: '100%' }}
                ></div>
              </div>
            </div>
          </Spin>

          <p className={'title'}>裁决</p>
          <div>
            <ProTable<any>
              columns={columns}
              request={(params, sorter, filter) => {
                return CoverageService.listCoverageCommit({
                  id: encodeURIComponent(`${group}/${repo}`),
                }).then((res) => {
                  setDataSource(res)
                  return {
                    data: res,
                    success: true,
                  }
                })
              }}
              rowKey="commitSha"
              pagination={{
                showQuickJumper: true,
              }}
              search={false}
              dateFormatter="string"
            />
            <ReportDetail
              closeVisible={() => {
                setReportDetailVisible(false)
              }}
              visible={reportDetailVisible}
              dataSource={dataSource}
              selectCommit={selectCommit}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default Repo
