<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #roleSelect="{ model, field }">
        <a-select
          :options="options"
          mode="multiple"
          max-tag-count="10"
          v-model:value="model[field]"
          :allowClear="false"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { userFormSchema } from './user.data';
  import { RoleListItem, UserListItem, UserModel } from '/@/api/genshinImpact/model/systemModel';
  import { saveUser, updateUser } from '/@/api/genshinImpact/system';
  import { Select } from 'ant-design-vue';
  import { getAllRoleList } from '/@/api/genshinImpact/system';
  import { encryptByMd5 } from '/@/utils/cipher';

  export default defineComponent({
    name: 'UserModal',
    components: { BasicModal, BasicForm, [Select.name]: Select },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const roleList = ref<RoleListItem[]>([]);
      const options = ref<Recordable[]>([]); // 角色selectOption 节点
      const updateRecord = ref<UserListItem>();

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: userFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        // 手动构造 selectOption 节点
        roleList.value = (await getAllRoleList()) as any as RoleListItem[];
        unref(roleList).forEach((item) => {
          options.value.push({ label: `${item.roleName}`, value: item.roleId });
        });

        updateSchema([
          {
            field: 'password',
            show: !unref(isUpdate),
          },
          {
            field: 'lockFlag',
            defaultValue: '0',
          },
        ]);

        if (unref(isUpdate)) {
          data.record.role = data.record.roleList.map((item) => item.roleId); // 角色数据处理
          setFieldsValue({
            ...data.record,
          });
          updateRecord.value = data.record;
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });

          let userParam: UserModel = {
            ...updateRecord.value,
            ...values,
          };

          if (unref(isUpdate)) {
            userParam.password = undefined; // 更新排除密码
            await updateUser(userParam);
          } else {
            userParam.password = encryptByMd5(userParam.password!);
            await saveUser(userParam);
          }

          closeModal();
          emit('success', `用户 [${values.username}] ${unref(isUpdate) ? '编辑' : '新增'}成功!`);
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit, options };
    },
  });
</script>
