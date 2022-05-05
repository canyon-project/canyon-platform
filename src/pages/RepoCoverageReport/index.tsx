import {PageContainer} from "@ant-design/pro-layout";
import {CheckCircleTwoTone} from "@ant-design/icons";
import {Avatar, Divider} from "antd";
import {CoverageService} from "../../services/CoverageService";
import {useEffect, useState} from "react";
import CoverageReport from "canyon-report";
import {useNavigate, useParams} from "react-router-dom";

const RepoCoverageReport = () => {

  // 数据准备 根据commit获取commitMsg、头像、用户名、最后一次上报时间



  // const fd =
  const [fd,setFd] = useState<any>({})
  const history = useNavigate()
  const params = useParams();
  console.log(params,'params')
  const {id,commitSha,catalogue} = params
  const [fileCoverage,setFileCoverage] = useState<any>([])
  const [treeSummary,setTreeSummary] = useState<any>([])
  const [loading,setLoading] = useState<any>(false)
  const [fileDetail,setFileDetail] = useState<any>({
    fileName:'.js',
    content:''
  })

  useEffect(()=>{
    CoverageService.retrieveACoverageForAProjectService({
      commitSha:commitSha,
    }).then(res=>{
      setTreeSummary(res.treeSummary)
      setFd(res.fd)
    })
  },[])

  function onSelect(val:any) {
    if (!val.isLeaf){
      return
    }
    const filePath = encodeURIComponent(val.fullPath)
    history(`/canyon999/canyon-demo2/6b13682b6f3f586739c7aa5f48140b721385c910?path=${filePath}`)

    const params = {
      filePath,
      commitSha,
      projectId:id
    }
    setLoading(true)
    CoverageService.fileContent(params).then(res=>{
      setLoading(false)
      function getDecode(str:string){
        return decodeURIComponent(atob(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      }
      setFileDetail({
        fileName:res.fileDetail.file_name,
        content:getDecode(res.fileDetail.content)
      })
      setFileCoverage(res.fileCoverage)
    })
  }



  return <PageContainer title={<div>
    <p>qingkong-platform</p>
    <div>
      <CheckCircleTwoTone twoToneColor="#52c41a" />
      <span>删除rep</span>
      <Divider type={'vertical'}/>
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <span>wr_zhang25 laset report</span>
    </div>
  </div>}>
    <div style={{backgroundColor:'#fff'}}>
      <CoverageReport
          loading={loading}
          treeSummary={treeSummary}
          fileDetail={fileDetail}
          fileCoverage={fileCoverage}
          onSelect={(val:any)=>{onSelect(val)}}/>
    </div>

  </PageContainer>
}

export default RepoCoverageReport
