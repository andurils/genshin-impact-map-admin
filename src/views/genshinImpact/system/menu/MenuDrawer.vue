<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { getMenuTreeList, saveMenu, updateMenu } from '/@/api/demo/system';
  import { MenuEditParams } from '/@/api/demo/model/systemModel';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const updateRecord = ref<MenuEditParams>();

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          // 字段赋值 处理
          data.record.menuId = data.record.id;
          data.record.parentId = data.record.parentId === -1 ? null : data.record.parentId;

          setFieldsValue({
            ...data.record,
          });

          // 设置默认值
          updateSchema([
            {
              field: 'type',
              defaultValue: data.record.type,
            },
            {
              field: 'keepAlive',
              defaultValue: data.record.keepAlive,
            },
          ]);

          updateRecord.value = data.record;
        }

        let treeData = await getMenuTreeList();
        //  选择父级菜单 移除本节点及子节点
        if (unref(isUpdate) && updateRecord.value) {
          const { menuId } = updateRecord.value as MenuEditParams;
          deleteTreeNode(treeData, menuId);
          console.log(treeData);
        }

        updateSchema({
          field: 'parentId',
          componentProps: { treeData },
          // defaultValue: 7000, // 默认值选中
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });

          const menuParam: MenuEditParams = {
            ...updateRecord.value,
            ...values,
          };
          menuParam.parentId = menuParam.parentId ?? -1;
          // 按钮类型
          if (menuParam.type === '1') {
            menuParam.icon = '';
            menuParam.path = '';
            menuParam.keepAlive = undefined;
          }
          console.log('create', menuParam);

          if (unref(isUpdate)) {
            await updateMenu(menuParam);
          } else {
            await saveMenu(menuParam);
          }
          emit('success', `菜单 [${menuParam.name}] ${unref(isUpdate) ? '编辑' : '新增'}成功!`);
          closeDrawer();
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      function deleteTreeNode(treeData, targetId) {
        treeData.forEach((item, index) => {
          if (item.id === targetId) {
            treeData.splice(index, 1);
          }
          if (item.children) {
            deleteTreeNode(item.children, targetId);
          }
        });
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
