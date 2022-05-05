import {PageContainer} from "@ant-design/pro-layout";
import {Button} from "antd";
import React, {useRef} from "react";
import './index.less'
import {useMount} from "ahooks";
import * as echarts from "echarts";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {TableListItem} from "../Dashboard";
import {CoverageService} from "../../services/CoverageService";
import {useLocation, useNavigate} from "react-router-dom";

const Repo = () => {
  const content = (
<div></div>
  );
  const chartRef = useRef(null)
  const history = useNavigate()
  const lLocation = useLocation()
  useMount(()=>{
    setTimeout(()=>{
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(chartRef.current)

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '最近几次commit覆盖率情况'
        },
        tooltip: {},
        legend: {
          // data: ['销量']
        },
        xAxis: {
          data: ['0', '1', '2', '3', '4', '5']
        },
        yAxis: {},
        grid:{
          bottom :'15%',
        },
        series: [
          {
            // name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },100)
  })
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '项目ID',
      dataIndex: 'id',
    },
    {
      title: 'commitSha',
      dataIndex: 'commitSha',
      render(_:any,tableListItem){
        return <a onClick={()=>{
          console.log(lLocation,'lLocation')
          history(`${lLocation.pathname}/${_}/root`)
        }}>{_}</a>
      }
    },
  ]

  return         (
      <PageContainer
          title={<div style={{width:'100%'}}>
            canyon-application
          </div>}
          content={content}
          tabList={[
            {
              tab: '上报',
              key: 'base',
            }
          ]}
          extraContent={
        <div></div>
          }
          extra={[]}
          footer={[
            <Button key="3">重置</Button>,
            <Button key="2" type="primary">
              提交
            </Button>,
          ]}
      >
        <div
            style={{
              paddingTop:'20px'
            }}
        >
          <div>

            <p className={'title'}>概览</p>
            <div className={'summary'}>
              <div className={'summary-left'}>
                <div className="item">
                  <span className="label">总共上报</span>
                  <span className="value">19</span>
                </div>
                <div className="item">
                  <span className="label">平均覆盖率</span>
                  <span className="value">80%</span>
                </div>
                <div className="item">
                  <span className="label">最近一次上报</span>
                  <span className="value">29 天前</span>
                </div>
                <div className="item">
                  <span className="label">最近一次覆盖率</span>
                  <span className="value">30%</span>
                </div>
              </div>
              <div className={'summary-right'}>
                <div ref={chartRef} style={{width:'100%',height:'100%'}}>

                </div>
              </div>
            </div>
            <p className={'title'}>裁决</p>
            <div>
              <ProTable<TableListItem>
                  columns={columns}
                  request={(params, sorter, filter) => {
                    return CoverageService.listCoverageCommit({id:encodeURIComponent('canyon999/canyon-demo2'),commitSha:'1233'}).then((res) => {
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
            </div>
          </div>
        </div>
      </PageContainer>
  )
}

export default Repo
