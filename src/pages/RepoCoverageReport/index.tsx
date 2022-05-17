import {PageContainer} from "@ant-design/pro-layout";
import {CheckCircleTwoTone, FieldTimeOutlined} from "@ant-design/icons";
import {Avatar, Divider} from "antd";
import {CoverageService} from "../../services/CoverageService";
import {useEffect, useState} from "react";
import CoverageReport from "../../components/CanyonReport";
import {useNavigate, useParams} from "react-router-dom";

const RepoCoverageReport = () => {

  // 数据准备 根据commit获取commitMsg、头像、用户名、最后一次上报时间
  const [fd,setFd] = useState<any>({})
  const navigate = useNavigate()
  const params = useParams();
  const [fileCoverage,setFileCoverage] = useState<any>([])
  const [treeSummary,setTreeSummary] = useState<any>([])
  const [loading,setLoading] = useState<any>(false)
  const [fileDetail,setFileDetail] = useState<any>({
    fileName:'.js',
    content:''
  })


  const [baseInfo,setBaseInfo] = useState<any>({})

  console.log(params,'params')
  useEffect(()=>{
    CoverageService.retrieveACoverageForAProjectService({
      commitSha:params.commitSha,
      thRepoId: `${params.group}/${params.repo}`
    }).then(res=>{
      setTreeSummary(res.treeSummary)
      setFd(res.fd)
      setBaseInfo(res.baseInfo)
    })
  },[])
  function onSelect(val:any) {
    if (!val.isLeaf){
      return
    }
    const filePath = encodeURIComponent(val.fullPath)
    // console.log(params)
    navigate(`/${params.group}/${params.repo}/${params.commitSha}?path=${filePath}`)


    const newParams = {
      filePath,
      commitSha:params.commitSha,
      projectId:params.id
    }
    setLoading(true)
    CoverageService.fileContent(newParams).then(res=>{
      console.log(res,'11233')
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
    <div style={{fontSize:'14px',color:'#4f5162'}}>
      {/*<CheckCircleTwoTone twoToneColor="#52c41a" />*/}
      <span style={{}}>{baseInfo.commitMsg}</span>
      <Divider type={'vertical'}/>
      <Avatar src={baseInfo.lastReportAvatar} />
      <span style={{fontSize:'12px',fontWeight:'normal'}}>{baseInfo.lastReportUsername} 最近上报1</span>
      <Divider type={'vertical'}/>

      <div style={{fontSize:'12px',fontWeight:'normal',display:'inline-block'}}>
        <FieldTimeOutlined />
        <span style={{marginLeft:'8px'}}>{baseInfo.lastTimeReport}</span>
      </div>
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
