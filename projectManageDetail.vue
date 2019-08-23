<template>
<div>
    <div flex="main:left">
      <div flex="" >
        <div class="mr10" v-if="isAuth(PermConfig['create_wikis'])">
			
			
          <el-dialog  :visible.sync="dialogVisible" :show-close="false"
                       title="添加管理员">
					 
			<el-form ref="data_form" label-width="100px">
			    <el-form-item label="管理员：">
			        <div>
			            <el-select placeholder="请选择" v-model="selectManage">
			                <el-option
							 v-for="item in users"
							 :key="item.userId" 
							 :label="item.nickname" 
							 :value="item.userId" >
			                </el-option>
			            </el-select>
			        </div>
			
			    </el-form-item>
			
			</el-form>
 
              <div slot="footer" class="dialog-footer">
                  <el-button @click="cancel()" class="defaultBtn btn-secondary">取消</el-button>
                  <el-button @click="updateBaseSet()" class="defaultBtn" type="primary">提交</el-button>
              </div>
			 
          </el-dialog>
		  <el-button class="defaultBtn" type="primary"  @click="createUsers" icon="el-icon-plus">新建管理员</el-button>
        </div>
        <div >
          <el-button class="defaultBtn  btn-secondary " type="primary" icon="el-icon-refresh" @click="getUsers"></el-button>
        </div>
      </div>
    </div>

    <div class="">
      <el-table :data="tableData"  class='mt15'  tooltip-effect="light">
        <el-table-column prop="username" label="姓名" width='' show-overflow-tooltip ></el-table-column>
		<el-table-column prop="userId" label="ID" width='' show-overflow-tooltip ></el-table-column>
		<el-table-column prop="mobilePhone" label="电话" width='' show-overflow-tooltip ></el-table-column>
		<el-table-column prop="email" label="邮箱" width='' show-overflow-tooltip ></el-table-column>
         <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click="deleteManage(scope.row)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
	import service from './../project/js/service.js'
	import { mapGetters } from 'vuex'
	export default {
		computed:{
			...mapGetters(['customerId'])
		},
		created(){
		   this.getProjectManageDetail()
		},
		methods: {
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
			//获取管理员列表
			async getProjectManageDetail(){
				this.id = this.$route.query.id
				let res = await service.getProjectManageDetail(this.customerId,this.id)
				this.tableData = res.data
			},
			//刷新按钮，刷新列表
			getUsers(){
				this.getProjectManageDetail()
			},
			//新建管理员，获取非管理员列表
			async createUsers(){
				this.dialogVisible = true
					this.id = this.$route.query.id
					let res = await service.getProjectManageBaseList(this.customerId,this.id)
					this.users = res.data.list
			},
			//取消按钮，弹窗隐藏
			cancel(){
				 this.dialogVisible = false
				 this.selectManage = ""
			},
			//提交选中的非管理员成为管理员
			async updateBaseSet(){
				this.id = this.$route.query.id
				console.log(this.selectManage)
				let res = await service.submitManage(this.customerId,this.id,this.selectManage)
				this.selectManage = ""
				this.dialogVisible = false
				this.getProjectManageDetail()
			},
			//删除管理员，将选中的管理员删除
			async deleteManage(item){
				this.$confirm('确定删除？','提示')
					.then(async ()=>{
						this.id = this.$route.query.id
						let res = await service.deleteManage(this.customerId,this.id,item.userId)
						if(!res || res.status !== 200) return
						this.$notify.success('操作成功');
						this.getProjectManageDetail()
					})
			}
		},
		data() {
			return {
				id:'',
				tableData: [],
				dialogVisible: false,
				users:[],
				selectManage:"",
			}
		}
	}
</script>

<style>
</style>