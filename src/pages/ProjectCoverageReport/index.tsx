import React, {useEffect, useState} from 'react';
import {CoverageService} from "../../services/CoverageService";
import {useNavigate, useParams} from "react-router-dom";
import CoverageReport from "../../components/CanyonReport";


const ProjectCoverageReport: React.FC = () => {
  // const fd =
  const [fd,setFd] = useState<any>({})
  const history = useNavigate()
  const params = useParams();
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
      projectId:id
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
    history(`/project/${id}/commit/${commitSha}/tree/${filePath}`)

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


  return (
    <div style={{backgroundColor:'#fff',padding:'20px'}}>
      <h2>{fd.path_with_namespace}</h2>
      <CoverageReport
        loading={loading}
        treeSummary={treeSummary}
        fileDetail={fileDetail}
        fileCoverage={fileCoverage}
        onSelect={(val:any)=>{onSelect(val)}}/>
    </div>
  );
};

export default ProjectCoverageReport
