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
  import { RoleListItem, UserModel } from '/@/api/genshinImpact/model/systemModel';
  import { saveUser, updateUser } from '/@/api/genshinImpact/system';
  import { Select } from 'ant-design-vue';
  import { getAllRoleList } from '/@/api/genshinImpact/system';

  export default defineComponent({
    name: 'UserModal',
    components: { BasicModal, BasicForm, [Select.name]: Select },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const roleList = ref<RoleListItem[]>([]);
      const options = ref<Recordable[]>([]); // 角色selectOption 节点

      // const rowId = ref('');
      const updateRecord = ref<UserModel>();

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

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
          updateRecord.value = data.record;

          // updateSchema([
          //   {
          //     field: 'pwd',
          //     show: !unref(isUpdate),
          //   },
          //   {
          //     field: 'role',
          //     componentProps: {
          //       value: ref([29, 3]),
          //     },
          //     // defaultValue: [29, 3],
          //   },
          // ]);
        }

        // const treeData = await getDeptList();
        updateSchema([
          {
            field: 'pwd',
            show: !unref(isUpdate),
          },
          // {
          //   field: 'dept',
          //   componentProps: { treeData },
          // },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });

          const userParam: UserModel = {
            ...updateRecord.value,
            ...values,
          };

          if (unref(isUpdate)) {
            await updateUser(userParam);
          } else {
            await saveUser(userParam);
          }

          console.log(values);
          closeModal();
          emit('success', {
            isUpdate: unref(isUpdate),
            values: { ...values, userId: unref(updateRecord)?.userId },
          });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit, options };
    },
  });
</script>
