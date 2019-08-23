
import $http from '@comm/api/http-service.js'
import { getToken, removeToken} from '@/utils/auth'
// const serviceUrl = 'http://172.18.0.60:2001'
// const serviceUrl_hui = 'http://172.18.0.231:2001'
const projectId = sessionStorage.getItem('projectId')
const serviceUrl = 'http://ccoapi-ccsyun-portal.m8.com'
//const serviceUrl = 'http://172.18.0.60:2001';
 const baseUrl = 'http://172.18.0.231:2001';
//const baseUrl="http://m8-gateway-admin-m8cmp-sdp.tongfuyun-test.com";


const queryData = function(params){
	let header = {
		 Authorization:'Bearer ' + getToken(),
		//"Content-Type": "application/x-www-form-urlencoded"
	}
	let httpType = params.httpType;
	let url = params.serviceUrl;
	let noLoading = params.noLoading
	delete params.httpType
	delete params.serviceUrl
	delete params.noLoading

	return $http(httpType,url,params,header,noLoading)

}

const project = {
	//获取项目列表
	getProjects(custId,search,page=1){
		let arr = [{custId}]
		let params = {
			httpType:'get',
			serviceUrl:window.UrlConfig.getProjectList.REPLACE(arr),
			page:page,
			custId:custId,
			name:search,
			limit:10,
			
		}
		return queryData(params)
	},//获取项目管理列表
		getProjectManage(custId,search,page=1){
		let arr = [{custId}]
		let params = {
			httpType:'get',
			serviceUrl:window.UrlConfig.getProjectManage.REPLACE(arr),
			page:page,
			custId:custId,
			name:search,
			limit:10,
			
		}
		return queryData(params)
	},//项目id，获取项目管理者(管理员)
		getProjectManageDetail(custId,cmpProjectId){
			let arr = [{custId},{cmpProjectId}]
			let params = {
				httpType:'get',
				serviceUrl:window.UrlConfig.getProjectManageDetail.REPLACE(arr),
				custId:custId,
				cmpProjectId:cmpProjectId
				
			}
			return queryData(params)
		},//项目id，获取项目非管理员成员信息列表（管理员）
		getProjectManageBaseList(custId,cmpProjectId){
			let arr = [{custId},{cmpProjectId}]
			let params = {
				httpType:'get',
				serviceUrl:window.UrlConfig.getProjectManageBaseList.REPLACE(arr),
				custId:custId,
				cmpProjectId:cmpProjectId,
				limit:100
				
			}
			return queryData(params)
		},//项目添加管理员(管理员)
		submitManage(custId,cmpProjectId,cmpUserId){
			let arr = [{custId},{cmpProjectId}]
			let params = {
				httpType:'post',
				serviceUrl:window.UrlConfig.submitManage.REPLACE(arr),
				custId:custId,
				cmpProjectId:cmpProjectId,
				cmpUserId:cmpUserId
				
			}
			return queryData(params)
		},//删除项目管理员（管理员）
		deleteManage(custId,cmpProjectId,cmpUserId){
			
			console.log(window.UrlConfig.deleteManage)
			let arr = [{custId},{cmpProjectId}]
			let params = {
				httpType:'delete',
				serviceUrl:window.UrlConfig.deleteManage.REPLACE(arr)+"?cmpUserId="+cmpUserId,
				custId:custId,
				cmpProjectId:cmpProjectId,
				cmpUserId:cmpUserId
				
			}
			return queryData(params)
		},
	//获取项目详细信息
	getProjectInfo(custId,cmpProjectIds,gitIds){
		
		let arr = [{custId}]
		let params = {
			httpType:'get',
			serviceUrl:window.UrlConfig.getProjectInfo.REPLACE(arr),
			cmpProjectIds:cmpProjectIds.join(','),
			gitIds:gitIds.join(','),
			noLoading:true
			
		}
		return queryData(params)
	},
	//新增项目
	addProject(addData){
		let arr=[{ custId:addData.custId}];
		let params = {
			httpType:'post',
			serviceUrl:window.UrlConfig.addProject.REPLACE(arr),
			...addData
			// page:1
			// per_page:2
		}
		return queryData(params)
	}
}

const wiki = {
	// 获取wikis列表
	getWikis(slug){
		let id = sessionStorage.getItem('projectId')
		let params = {
			httpType:'get',
			serviceUrl:window.UrlConfig.getWikis,
			id:id,
			slug:slug
		}
		if(!slug){
			delete params.slug
		}
		return queryData(params)
	},
	//新增wiki
	addWiki(wikisEntity){
		wikisEntity.id = sessionStorage.getItem('projectId')
		let params = {
			httpType:'post',
			serviceUrl:window.UrlConfig.addWiki,
			...wikisEntity
		}

		return queryData(params)
	},
	//删除wiki
	deleteWiki(slug){
		let id = sessionStorage.getItem('projectId')
		let arr=[{ slug:slug }];
		let params = {
			httpType:'delete',
			serviceUrl:window.UrlConfig.deleteWiki.REPLACE(arr) + '?id='+id,
			id:id,
			slug:slug
		}
		return queryData(params)
	},
	//获取wiki详情
	getWikiDetail(slug){
		let id = sessionStorage.getItem('projectId')
		let arr=[{ slug:slug }];
		let params = {
			httpType:'get',
			serviceUrl:window.UrlConfig.getWikiDetail.REPLACE(arr),
			id:id,
			slug:slug
		}
		return queryData(params)
	},
	//编辑wiki
	editWiki(wikisEntity){
		let id = sessionStorage.getItem('projectId')
		wikisEntity.id = id
		let arr=[{ slug:wikisEntity.slug }];
		let params = {
			httpType:'put',
			serviceUrl:window.UrlConfig.editWiki.REPLACE(arr),
			...wikisEntity
		}

		return queryData(params)
	}
}
/*****************************/
let arr=[{ projectId:projectId }];
const file = {
	getData(obj){/**********获取数据列表************/
        let arr=[{ projectId:sessionStorage.getItem('projectId') }];
        let params = {
            httpType:'get',
            serviceUrl:UrlConfig.getTableData.REPLACE(arr),
			...obj,
        }
        return queryData(params)
	},
	setFile(obj,method){//新增文件夹
        let arr=[{ projectId:sessionStorage.getItem('projectId') }];
        let params = {
            httpType:method,
            serviceUrl:UrlConfig.addMkdir.REPLACE(arr),
            ...obj,
        }
        return queryData(params)
	},
	updateFile(obj){//修改文件名
        let arr=[{ projectId:sessionStorage.getItem('projectId') }];
        let params = {
            httpType:'put',
            serviceUrl:UrlConfig.renameFile.REPLACE(arr)+"?file_path="+obj.file_path+"&newfileName="+obj.newfileName,
			...obj,
		}
        return queryData(params)
	},
	deleteFile(path){//删除目录
        let arr=[{ projectId:sessionStorage.getItem('projectId') }];
        let params = {
            httpType:'delete',
            serviceUrl:UrlConfig.deleteFile.REPLACE(arr),
            branch:'master',
            commit_message:'删除文件',
            file_path:path,
        };
        return queryData(params)
	},
	uploadFile(obj){//上传文件
        let arr=[{ projectId:sessionStorage.getItem('projectId') }];
        let params = {
            httpType:'post',
            serviceUrl:UrlConfig.upFlie.REPLACE(arr),
			...obj
        };
        return queryData(params)
	},
	getFile(obj){//获取文件详情
        let arr=[{ projectId:sessionStorage.getItem('projectId') }];
        let params = {
            httpType:'get',
            serviceUrl:UrlConfig.deleteFile.REPLACE(arr),
            ...obj,
        }
        return queryData(params)
	},
	getDownFile(obj){//获取下载文件详情
        let arr=[{ projectId:sessionStorage.getItem('projectId') }];
        let params = {
            httpType:'get',
            serviceUrl:UrlConfig.downFile.REPLACE(arr),
			...obj
        }
        return queryData(params)
	},


}

const mileTones = {
	//获取里程碑列表
	getMilestones(){
		let id = sessionStorage.getItem('projectId')
		let params = {
		    httpType:'get',
		    serviceUrl:UrlConfig.getMilestones,
			project_id:id,
			// title:title
		};
		return queryData(params)
	},
	//新增里程碑
	addMilestone(miletones){
		miletones.project_id = sessionStorage.getItem('projectId')
		let params = {
		    httpType:'post',
		    serviceUrl:UrlConfig.addMilestone,
			...miletones
		};
		return queryData(params)
	},
	//获取里程碑下所有任务
	getMileTask(id){
		let params = {
		    httpType:'get',
		    serviceUrl:UrlConfig.getMileTask,
			id:id,
			project_id:sessionStorage.getItem('projectId')
		};
		return queryData(params)
	},
	//获取里程碑详细信息
	getMilestoneDetail(id){
		let arr=[{ id:id },{project_id:sessionStorage.getItem('projectId')}];
		let params = {
		    httpType:'get',
		    serviceUrl:UrlConfig.getMilestoneDetail.REPLACE(arr),
		};
		return queryData(params)
	},
	//删除里程碑
	deleteMilestone(id){
		let arr=[{ milestoneid:id }];
		let params = {
		    httpType:'delete',
		    serviceUrl:UrlConfig.getMilestoneDetail.REPLACE(arr),
		};
		return queryData(params)
	},
	//里程碑修改
	editMilestone(id,iid,milestoneinfo){
		milestoneinfo.id = id;
		milestoneinfo.iid = iid;

		milestoneinfo.project_id = sessionStorage.getItem('projectId');

		let arr = [{ milestoneid:id }]
		let params = {
		    httpType:'put',
		    serviceUrl:UrlConfig.editMilestone.REPLACE(arr),
			...milestoneinfo
		};
		return queryData(params)
	},
	//关闭里程碑
	closeMilestone(id){
		let params = {
		    httpType:'put',
		    serviceUrl:UrlConfig.closeMilestone,
			project_id:sessionStorage.getItem('projectId'),
			id:id
		};
		return queryData(params)
	},
	//重新打开里程碑
	reopenMilestone(id){
		let params = {
		    httpType:'put',
		    serviceUrl:UrlConfig.reopenMilestone,
			project_id:sessionStorage.getItem('projectId'),
			id:id
		};
		return queryData(params)
	},
	//获取里程碑燃尽图
	miletonesBurndown(){
		let project_id = sessionStorage.getItem('projectId');
		let params = {
		    httpType:'get',
		    serviceUrl:UrlConfig.miletonesBurndown.REPLACE([{project_id}]),
			// title:title

		};
		return queryData(params)
	}

}

export default {
	...project,
	...wiki,
	...file,
	...mileTones
}
