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
              tooltip: '编辑角色信息',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ion:layers-outline',
              tooltip: '分配角色菜单',
              onClick: handleRoleMenuSet.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此角色',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleMenuDrawer @register="registerDrawer" @success="handleRoleMenuSuccess" />
    <RoleModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { deleteRole, getAllRoleList } from '/@/api/genshinImpact/system';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import RoleModal from './RoleModal.vue';
  import RoleMenuDrawer from './RoleMenuDrawer.vue';
  import { columns } from './role.data';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload }] = useTable({
    title: '角色列表',
    titleHelpMessage: '角色菜单权限分配',
    api: getAllRoleList,
    columns,
    loading: true, // 开启loading
    canResize: false, // 自适应高度
    // pagination: false, // 开启分页
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    actionColumn: {
      width: 200,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleRoleMenuSet(record: Recordable) {
    openDrawer(true, {
      record,
    });
  }

  async function handleDelete(record: Recordable) {
    const { roleId, roleName } = record;
    const isDeleted = await deleteRole(roleId);
    // 请求错误 返回false axios内部处理,在此逻辑不做处理
    if (isDeleted) {
      createMessage.success(`角色 [${roleName}] 删除成功!`);
      reload();
    }
  }

  function handleSuccess(msg: string) {
    createMessage.success(msg);
    reload();
  }
  function handleRoleMenuSuccess(msg: string) {
    createMessage.success(msg);
    console.log(`handleRoleMenuSuccess`);
  }
</script>
