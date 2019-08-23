export default {
    "GitlabLogin": Vservice.CcsyunService + "/gitlab-login",//登录gitlab
    "PaasLogin": Vservice.PaasGetwayService + "/oauth/authorize",//登录Paas
    'ProjectList': Vservice.CcsyunService + '/projects',
    "TaskList": Vservice.CcsyunService + '/task',
    "TaskDueCount": Vservice.CcsyunService + '/task/statistics/DueCount',
    "EnteventList": Vservice.CcsyunService+'/entevent/list',
    "TasksComplete":Vservice.RestService + 'tasks/{taskId}/action/complete',
    "TaskListNopage": Vservice.CcsyunService + '/task/nopage',
    "DynamicList": Vservice.CcsyunService + '/activity',
    "MilestoneList": Vservice.CcsyunService + '/milestones',
    "AssignTask": Vservice.CcsyunService + "/task/assignto",
    "CloseTask": Vservice.CcsyunService + "/task/close",
    "reopenTask": Vservice.CcsyunService + "/task/reopen",
    "group": Vservice.CcsyunService + '/groups',
    "warehouseList": Vservice.CcsyunService + '/repository',
    "externalRepository" :Vservice.CcsyunService + '/external/repository',
    "namespaces": Vservice.CcsyunService + '/namespaces',
    "warehouseDetail": Vservice.CcsyunService + '/repository/{warehouseId}',
    "warehouseTree": Vservice.CcsyunService + '/repository/{warehouseId}/tree',
    'branchList': Vservice.CcsyunService + '/repository/{warehouseId}/branches/nopage',
    'commitList': Vservice.CcsyunService + '/repository/{warehouseId}/commits',
    'branch': Vservice.CcsyunService + '/repository/{warehouseId}/branches',
    'hooks': Vservice.CcsyunService + '/repository/{warehouseId}/hooks',
    'tags': Vservice.CcsyunService + '/repository/{warehouseId}/tags',
    'member': Vservice.CcsyunService + '/member/projects',
    'addProjectMember': Vservice.CcsyunService + '/customers/{custId}/projectteams/addCustUserToDept',
    'memberOverview': Vservice.CcsyunService + '/member/overview',
    'bugs': Vservice.CcsyunService + '/bugs',
    "assignBug": Vservice.CcsyunService + "/bugs/assignto",
    "closeBug": Vservice.CcsyunService + "/bugs/close",
    "reopenBug": Vservice.CcsyunService + "/bugs/reopen",
    // 'getProjectList': Vservice.CcsyunService + "/projects",//获取项目列表
    'getProjectList': Vservice.CcsyunService + "/customers/{custId}/projectteams",//获取项目列表
    'getProjectManage': Vservice.CcsyunService + "/customers/{custId}/projectteams/projectTeamsManage",//项目管理列表
    'getProjectManageDetail':Vservice.CcsyunService+"/customers/{custId}/projectteams/projectTeamsManage/{cmpProjectId}",//项目id，获取项目管理者(管理员)
	'getProjectManageBaseList': Vservice.CcsyunService + "/customers/{custId}/projectteams/projectTeamsManage/{cmpProjectId}/users",//项目id，获取项目非管理员成员信息列表（管理员）
	'submitManage': Vservice.CcsyunService + "/customers/{custId}/projectteams/projectTeamsManage/{cmpProjectId}/users",//项目添加管理员(管理员)
	'deleteManage': Vservice.CcsyunService + "/customers/{custId}/projectteams/projectTeamsManage/{cmpProjectId}/users",//删项目中管理员信息（管理员）
    'getProjectDetail': Vservice.CcsyunService + '/projects/{id}',//获取项目详情
	'getProjectInfo':Vservice.CcsyunService + '/projects/{custId}/projectDetail',//获取项目信息(人员,任务,主机数量)
    'editProject': Vservice.CcsyunService + '/customers/{custId}/projectteams',//编辑项目
    'addProject': Vservice.CcsyunService + "/customers/{custId}/projectteams",//新增项目
    "DynamicProjectList": Vservice.CcsyunService + '/activity/project/{id}',//获取项目动态
    'RepositoryCommitsStatistics': Vservice.CcsyunService + '/repository/{id}/commits/statistics',//获取仓库提交统计数据
	'healthChart':'http://console.apiserver.tongfuyun-test.com/m8healthcheck',

    'getWikis': Vservice.CcsyunService + "/wikis/nopage",//获取wiki列表
    'addWiki': Vservice.CcsyunService + "/wikis",//新增wiki
    'deleteWiki': Vservice.CcsyunService + "/wikis/{slug}",//删除wiki
    'getWikiDetail': Vservice.CcsyunService + "/wikis/{slug}",//获取单个wiki详情
    'editWiki': Vservice.CcsyunService + "/wikis/{slug}",//编辑wiki
    'companyInfo': Vservice.CcsyunService + "/enterprise/{custId}",//获取企业信息
    'companyCode': Vservice.CcsyunService + "/enterprise/{objectCode}/view",//获取详细企业信息

    'getTableData': Vservice.CcsyunService + "/repository/{projectId}/tree",//获取table列表数据
    'addMkdir': Vservice.CcsyunService + "/repository/{projectId}/files",//新增文件目录
    'renameFile': Vservice.CcsyunService + "/repository/{projectId}/files/update/filename",//修改文件名
    'deleteFile': Vservice.CcsyunService + "/repository/{projectId}/files",//删除文件/目录
    'upFlie': Vservice.CcsyunService + "/repository/{projectId}/commits",//上传文件
    'sourceFile': Vservice.CcsyunService + "/repository/{projectId}/blobs/{sha}/raw",//获取原文件内容
    'downFile': Vservice.CcsyunService + "/repository/{projectId}/files/download",//获取下载文件内容
    'fileUpload': Vservice.CcsyunService + "/fileUpload",
    'repoFileUpload': Vservice.CcsyunService + "/repoFileUpload",

    'getMilestones': Vservice.CcsyunService + "/milestones",//获取里程碑列表
    'addMilestone': Vservice.CcsyunService + "/milestones",//新增里程碑
    'getMileTask': Vservice.CcsyunService + "/milestones/listtask", //获取里程碑下所有任务
    'getMilestoneDetail': Vservice.CcsyunService + '/milestones/projects/{project_id}/milestoneid/{id}', //获取里程碑详细信息
    'deleteMilestone': Vservice.CcsyunService + '/milestones/{milestoneid}', //删除里程碑
    'editMilestone': Vservice.CcsyunService + '/milestones/{milestoneid}', //编辑里程碑,
    'closeMilestone': Vservice.CcsyunService + '/milestones/close', //关闭里程碑,
    'reopenMilestone': Vservice.CcsyunService + '/milestones/reopen', //重新打开里程碑
    'miletonesBurndown': Vservice.CcsyunService + '/milestones/burndown/{project_id}',//获取里程碑燃尽图

    'companyUser': Vservice.CcsyunService + '/companyUser',//企业用户
    'customers': Vservice.CcsyunService + '/customers/{custId}/users',//企业用户
    'batchUsers': Vservice.CcsyunService + '/customers/{custId}/users/batchUsers',
    'customersRole': Vservice.CcsyunService + '/customers/{custId}/users/roles',//企业用户
    'instance': Vservice.CcsyunService + '/instances',//产品实例
    "ssh": Vservice.CcsyunService + '/keys',
    'projectMember':Vservice.CcsyunService + '/customers/{custId}/projectteams/{id}/users',
    'gitUser':Vservice.CcsyunService + '/gitUser/current',
    "notes":Vservice.CcsyunService + '/tasknotes',//bug-task 备注
    "tasknotesNopage":Vservice.CcsyunService + '/tasknotes/nopage',//任务动态
    "repositoryDown":Vservice.CcsyunService + '/repository/{warehouseId}/archive',
    'updateCustUserInDept': Vservice.CcsyunService + '/customers/{custId}/projectteams/updateCustUserInDept',
    'readFile': Vservice.CcsyunService + "/projects/{projectPath}/loadfile",
    'readFileProject': Vservice.CcsyunService + "/project/readwithnotoken",
    'readFileRepository': Vservice.CcsyunService + "/repository/readwithnotoken",
    'activityUser': Vservice.CcsyunService + "/activity/user"

};


