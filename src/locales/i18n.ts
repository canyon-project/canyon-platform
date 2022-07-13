import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en_US: {
    translation: {
      repoId: 'Repo Id',
      repoName: 'Repo Name',
      reportTimes: 'Report Times',
      lastTimeReport: 'Last Time Report',
      operation: 'Operation',
      detail: 'Detail',
      repoList: 'Repo List',
      report: 'Report',
      totalTimes: 'Total Report Times',
      averageCoverage: 'Average Coverage',
      lastReportTime: 'Last Agg Time',
      lastCommitCoverage: 'Last Report Coverage',
      recentCommitCoverage: 'Recent Commit Coverage',
      instrumentCwd: 'Instrument CWD',
      reporter: 'Reporter',
      reportTime: 'Report Time',
      overview: 'Overview',
      log: 'Log',
      coverage: 'Coverage',
      recentReport:'Recent Report',
      coverageDetails:'Coverage Details',
      reportLog:'Report Log',
      登录: 'SIGN IN',
      文档: 'DOCS',
      开始使用: 'GET STARTED',
    },
  },
  zh_CN: {
    translation: {
      repoId: '仓库 ID',
      repoName: '仓库名称',
      登录: '登录',
      文档: '文档',
      开始使用: '开始使用',
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'en_US', //设置当前语言

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
