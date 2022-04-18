<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <!-- <div class="mb-4">
      <a-button @click="handleSetCheckData" class="mr-2"> 设置勾选数据 </a-button>
      <a-button @click="handleGetCheckData" class="mr-2"> 获取勾选数据 </a-button>
    </div> -->
    <div class="overflow-hidden bg-white">
      <BasicTree
        ref="treeRef"
        toolbar
        checkable
        search
        :clickRowToExpand="true"
        :treeData="treeData"
        :fieldNames="{ key: 'id', title: 'name' }"
        @select="handleSelect"
      />
    </div>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, toRaw } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree';

  import { getMenuTreeList, getRoleMenuList, saveRoleMenus } from '/@/api/genshinImpact/system';
  import { RoleEditParams, RoleMenuModel } from '/@/api/genshinImpact/model/systemModel';

  export default defineComponent({
    name: 'RoleMenuDrawer',
    components: { BasicDrawer, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const treeData = ref<TreeItem[]>([]);
      const roleRecord = ref<RoleEditParams>();

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        roleRecord.value = data.record;

        // 填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          // TODO  parentId 菜单列表过滤
          treeData.value = (await getMenuTreeList({
            // parentId: 1000,
          })) as any as TreeItem[];
        }

        const { roleId } = unref(roleRecord) as RoleEditParams;
        const roleMenuIds = await getRoleMenuList(roleId!);
        // 更新已分配菜单选中状态
        handleSetCheckData(roleMenuIds);
      });

      const getTitle = computed(() => `菜单分配-角色[${unref(roleRecord)?.roleName}]`);

      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });

          const { roleId, roleName } = unref(roleRecord) as RoleEditParams;
          let checkedMenuIds = toRaw(handleGetCheckData()) as KeyType[];

          console.log(checkedMenuIds.join());
          const roleMenuParam: RoleMenuModel = {
            roleId: roleId!,
            menuIds: checkedMenuIds.join(),
          };
          await saveRoleMenus(roleMenuParam);
          closeDrawer();
          emit('success', `角色[${roleName}]菜单分配成功！`);
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }
      function handleSelect(keys) {
        console.log(keys);
      }

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      function handleSetCheckData(menuIds: number[] = []) {
        getTree().setCheckedKeys(menuIds);
      }

      function handleGetCheckData() {
        const keys = getTree().getCheckedKeys();
        return keys;
      }

      return {
        treeRef,
        treeData,
        registerDrawer,
        getTitle,
        handleSubmit,
        handleSelect,
        handleSetCheckData,
        handleGetCheckData,
      };
    },
  });
</script>
