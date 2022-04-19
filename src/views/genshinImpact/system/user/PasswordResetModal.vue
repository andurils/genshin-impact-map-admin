<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="密码重置" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { pwdRestFormSchema } from './user.data';
  import { RoleListItem, UserListItem, UserModel } from '/@/api/genshinImpact/model/systemModel';
  import { saveUser, updateUser } from '/@/api/genshinImpact/system';
  import { Select } from 'ant-design-vue';
  import { getAllRoleList } from '/@/api/genshinImpact/system';
  import { encryptByMd5 } from '/@/utils/cipher';

  export default defineComponent({
    name: 'PasswordResetModal',
    components: { BasicModal, BasicForm, [Select.name]: Select },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const updateRecord = ref<UserListItem>();

      const [registerForm, { resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: pwdRestFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });

        data.record.role = data.record.roleList.map((item) => item.roleId); // 角色数据处理
        updateRecord.value = data.record;
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });

          let userParam: UserModel = {
            ...(updateRecord.value as UserListItem),
          };
          userParam.password = encryptByMd5(values.passwordNew); // 更新排除密码
          // console.log(values);
          await updateUser(userParam);

          closeModal();
          emit('success', `用户 [${unref(updateRecord)?.username}] 密码重置成功!`);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, handleSubmit };
    },
  });
</script>
