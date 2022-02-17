export declare namespace API {
  type CurrentUser = {
    name?: string
    avatar?: string
    userid?: string
    email?: string
    signature?: string
    title?: string
    group?: string
    tags?: { key?: string; label?: string }[]
    notifyCount?: number
    unreadCount?: number
    country?: string
    access?: string
    geographic?: {
      province?: { label?: string; key?: string }
      city?: { label?: string; key?: string }
    }
    address?: string
    phone?: string
  }

  type LoginResult = {
    status?: string
    type?: string
    currentAuthority?: string
  }

  type PageParams = {
    current?: number
    pageSize?: number
  }

  type RuleListItem = {
    key?: number
    disabled?: boolean
    href?: string
    avatar?: string
    name?: string
    owner?: string
    desc?: string
    callNo?: number
    status?: number
    updatedAt?: string
    createdAt?: string
    progress?: number
  }

  type RuleList = {
    data?: RuleListItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type FakeCaptcha = {
    code?: number
    status?: string
  }

  type LoginParams = {
    username?: string
    password?: string
    autoLogin?: boolean
    type?: string
  }

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string
    /** 业务上的错误信息 */
    errorMessage?: string
    /** 业务上的请求是否成功 */
    success?: boolean
  }

  type NoticeIconList = {
    data?: NoticeIconItem[]
    /** 列表的内容总数 */
    total?: number
    success?: boolean
  }

  type NoticeIconItemType = 'notification' | 'message' | 'event'

  type NoticeIconItem = {
    id?: string
    extra?: string
    key?: string
    read?: boolean
    avatar?: string
    title?: string
    status?: string
    datetime?: string
    description?: string
    type?: NoticeIconItemType
  }

  //////////////////////////////
  interface Response {
    ResponseStatus: {
      Timestamp: string
      Ack: 'Success' | 'Failure'
      Errors: []
    }
    responseCode: number
    success: boolean
  }

  type EventReportInfoReqData = {
    deptId: string
  }

  type EventReportInfoResData = {
    Success: true
    Source: ReportInfo
  }
  type ReportInfo = {
    Total: number
    Active: number
    Pending: number
    Hangs: number
    ByDesign: number
    ToConfirmed: number
    Complete: number
    Abnormal: number
    UnAbnormal: number
    Publishing: number
    Closed: number
    WaitComfirm: number
    CountTestCase: number
  }

  type EventTrendReqData = {
    startDate: string
    endDate: string
    userName: string
  }
  interface EventTrendResData extends Response {
    countList: {
      dateStr: string
      count: number
    }[]
  }

  type EventRootReasonReqData = {
    type: string
    startDate: string
    endDate: string
    userName: string
  }

  interface EventRootReasonResData extends Response {
    data: {
      dateStr: string
      reasonData: { count: number; rootReason: string }[]
    }[]
  }
  interface EventPersonAvgReqData extends EventRootReasonReqData {}
  interface EventPersonAvgResData extends Response {
    data: {
      user: string
      userName: string
      countList: {
        count: number
        dateStr: string
      }[]
    }[]
  }

  type EventPerPersonTimeConsumReqData = {
    startDate: string
    endDate: string
    userName: string
  }
  interface EventPerPersonTimeConsumResData extends Response {
    personTimeConsumList: PersonTimeConsum
    teamTimeConsum: number
  }
  type PersonTimeConsum = {
    timeConsum: number
    user: string
    userName: string
  }[]

  type EventClassStatisticReqData = {
    startDate: string
    endDate: string
    userName: string
  }

  interface EventClassStatisticResData extends Response {
    data: {
      eventClass: string // 一级分类名称
      totalCount: number
      businessModuleStatisticList: {
        eventBusinessModule: string // 二级分类编号
        eventBusinessModuleStr: string // 二级分类名称
        totalCount: number
        detailList: {
          // 根因列表
          count: number // 根因值
          rootReason: string // 根因名称
          eventList: {
            //弹窗详细列表信息
            createDate: string
            eventStatus: string
            id: number
            operationUser: string
            priority: number
            secondary: string
            submitUser: string
            title: string
            type: string
          }[]
        }[]
      }[]
    }[]
    rootReasonList: string[] // 根因种类
  }
}
