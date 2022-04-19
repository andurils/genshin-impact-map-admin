<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增用户</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑用户资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ic:outline-password',
              tooltip: '密码重置',
              onClick: handlePasswordRest.bind(null, record),
            },

            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此用户',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserModal @register="registerUserModal" @success="handleSuccess" />
    <PasswordResetModal @register="registerPWDModal" @success="handlePasswordRestSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import UserModal from './UserModal.vue';
  import PasswordResetModal from './PasswordResetModal.vue';
  import { columns, searchFormSchema } from './user.data';
  // import { useGo } from '/@/hooks/web/usePage';
  import { deleteUser, getUserPageList } from '/@/api/genshinImpact/system';

  // const go = useGo();
  const { createMessage } = useMessage();
  const [registerUserModal, { openModal: openUserModal }] = useModal();
  const [registerPWDModal, { openModal: openPWDModal }] = useModal();

  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload }] = useTable({
    title: '用户列表',
    api: getUserPageList,
    rowKey: 'userId',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    showIndexColumn: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      console.log('handleSearchInfoFn', info);
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleCreate() {
    openUserModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openUserModal(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    const { userId, username } = record;
    const isDeleted = await deleteUser(userId);
    if (isDeleted) {
      createMessage.success(`用户[${username}]删除成功!`);
      reload();
    }
  }

  function handleSuccess(msg: string) {
    createMessage.success(msg);
    reload();
  }

  // 密码重置
  function handlePasswordRest(record: Recordable) {
    openPWDModal(true, {
      record,
    });
  }

  function handlePasswordRestSuccess(msg: string) {
    createMessage.success(msg);
  }
</script>
