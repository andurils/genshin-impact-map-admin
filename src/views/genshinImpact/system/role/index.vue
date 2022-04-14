<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  // import { reactive, ref, unref, computed } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getAllRoleList } from '/@/api/demo/system';
  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';
  import { columns } from './role.data';

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '角色列表',
    titleHelpMessage: '角色菜单权限分配',
    api: getAllRoleList,
    columns,
    // formConfig: {
    //   labelWidth: 120,
    //   schemas: searchFormSchema,
    // },
    loading: true, // 开启loading
    canResize: false, // 自适应高度
    // useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  // function handleCreate() {
  //   openDrawer(true, {
  //     isUpdate: false,
  //   });
  // }

  async function handleCreate() {
    const roleList = await getAllRoleList();
    console.log(roleList);
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    console.log(record);
  }

  function handleSuccess() {
    reload();
  }
</script>
