<template>
	<div class=" content-min-width" style="min-width: 1000px;">
    <!-- 左侧菜单 -->
    <!-- <slide-bar title="所有项目" :menus="menus" :active.sync="active"></slide-bar> -->
    <!--*******表单数据***************-->
    <div class="table-data">
		<header>
			<div class="container-title" >全部项目</div>
			<div flex="main:left cross:center" class="mt15 someBtn">
				
				<div class="mr10">
					 <el-select @change="getProjectManage(1)" v-model="sort">
						<el-option label="最近创建" value="最近创建"></el-option>
						<el-option label="最早创建" value="最早创建"></el-option>
						<el-option label="最近更新" value="最近更新"></el-option>
						<el-option label="最早更新" value="最早更新"></el-option>
						<el-option label="名称,升序" value="名称,升序"></el-option>
						<el-option label="名称,降序" value="名称,降序"></el-option>
					</el-select>
				</div>
				<div>
					<el-input 
						@keyup.enter.native="getProjectManage(1)"
						clearable 
						v-model="search" 
						style="width: 200px;" 
						placeholder="按名称过滤" 
						class="input-with-select">
							<el-button  slot="append" @click="getProjectManage(1)" class="defaultBtn btn-secondary" icon="el-icon-search">搜索</el-button>
					</el-input>
				</div>
				<div class="ml15">
					共 {{totalCount}}个项目
				</div>
			</div>
		</header>
		
		<section>
			 <div class="flex-box mt15" flex="main:justify cross:center" v-for="(project,index) in tableData" :key="index">
			  <div  class="left-box" flex="cross:center ">
				<div class="member_circle mr10">{{project.name[0].toLocaleUpperCase()}}</div>
				<div class="project-des">
					<el-tooltip class="item" effect="dark" :content="project.name" placement="bottom">
						<div flex="cross:center">
							<a href="javascript:;" @click="toDetail(project)" class="ellipsis project-name">{{project.name}}</a>
							<!-- <b>管理者</b> -->
						</div>
						
					</el-tooltip>
					<el-tooltip class="item" effect="dark" :content="project.desc" placement="bottom">
						<span class="project-description">{{project.desc}}</span>
					</el-tooltip>
				</div>
			  </div>
				<div flex="main:center">
					<div>
						<div>创建时间: {{project.createTime | parseTime}}</div>
						<div class="mt10">更新时间: {{project.updateTime | parseTime}}</div>
					</div>
				</div>
			</div>
			<div flex="main:right" class="mb20">
				<el-pagination
				  @current-change="getProjectManage"
				  :page-sizes="[10]"
				  :page-size="10"
				  :current-page.sync="pageIndex"
				  layout="sizes, prev, pager, next"
				  :total="totalCount">
				</el-pagination>
			</div>
			
		</section>
	</div>
	</div>
</template>

<script>
	import service from './../project/js/service.js'
	import { mapGetters } from 'vuex'
	import { parseTime } from '@comm/filters/index.js'
	export default {
        components:{},
			filters:{
				parseTime:function(time){
					return parseTime(new Date(time).getTime(),'{y}-{m}-{d} {h}:{i}:{s}')
				}
			},
        data(){
            return{
                tableData:[],//表格数据
                pageIndex: 1,//当前页
                pageSize:10,//每页条数
                totalCount:0,//总条数
				
				
				sort:'最近创建',
				search:''
            }
        },
		computed:{
			...mapGetters(['customerId'])
		},
        created(){
			this.getProjectManage()
			
        },
        methods:{
			//获取项目列表
			async getProjectManage(page=1){
				this.pageIndex = page
				let res = await service.getProjectManage(this.customerId,$.trim(this.search),page);
				
				
				res.data.list = res.data.list.filter(item => item.gitId )
				let sortFied = 'createTime';
				if(this.sort === '最近更新' || this.sort === '最早更新'){
						sortFied = 'updateTime'
				}
				//按名称排序
				if(this.sort === '名称,升序'){
					res.data.list.sort((a,b)=>{
						return a.name.localeCompare(b.name)
					})
				}else if(this.sort === '名称,降序'){
					res.data.list.sort((a,b)=>{
						return b.name.localeCompare(a.name)
					})
				}
				//按时间排序
				else{
					res.data.list.sort((a,b)=>{
						let time_a = new Date(a[sortFied]).getTime()
						let time_b = new Date(b[sortFied]).getTime()
						
						if(this.sort === '最近更新' || this.sort === '最近创建'){
							return time_b - time_a
						}else{
							return time_a - time_b
						}
					})
				}
				this.tableData = res.data.list
				this.totalCount = res.data.totalCount	
				
			},
			
			//跳转到项目详情页面
			toDetail(item){
				console.log(11111,item.id)
				this.$router.push({
					path:'enterprise',
					query:{
						type:'projectManage',
						page:'detail',
						id:item.id
					}
				})
			}
        }


    }
</script>

<style type="stylesheet/scss" lang="scss" scoped>
  .app-container{
    height: calc(100vh - 50px);
    position: relative;
  }
	.project-description{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		max-width: 200px;
	}
	.project-name{
		max-width:200px
	}
  .table-data{
    header{
      .container-title{
        font-size: 18px;
        font-weight: bold;
      }
      .someBtn{
        padding-bottom: 20px;
        border-bottom:1px solid #ddd
      }
    }
    .flex-box{
      border-bottom:1px solid #edf0f5;
      padding: 10px 0;
      .left-box{
        min-width: 30%;
        min-height: 50px;
        .svg-border{
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 1px solid #438FFC;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          border-radius: 100%;
          line-height: 40px;

        }
        .project-des{
          display: inline-block;
          margin-left: 10px;
          font-size: 14px;
          line-height: 1.5;
          a{
            display: inline-block;
            color:#438FFC;
            line-height: 1.5;
            
          }
		  b{
		    font-size: 12px;
		    border: 1px solid #438FFC;
		    -webkit-border-radius: 12px;
		    -moz-border-radius: 12px;
		    border-radius: 12px;
		    padding: 2px 6px;
		    color: #475366;
		    font-weight: normal;
			margin-left: 5px
		  }
          span{
            display: block;
            color: #475366;
          }
        }
      }
      .items-list{
        margin-top: 10px;
        span{
          margin-right: 15px;
          font-size: 14px;
          color: #475366;
          cursor: pointer;
        }
      }

    }
  }
</style>
