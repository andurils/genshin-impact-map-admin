// import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch, Tag } from 'ant-design-vue';
// import { setRoleStatus } from '/@/api/demo/system';
import { useMessage } from '/@/hooks/web/useMessage';
import { getAllRoleList } from '/@/api/genshinImpact/system';

export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'userId',
    width: 80,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '角色',
    dataIndex: 'roleList',
    width: 200,
    customRender: ({ record }) => {
      if (record.roleList.lenght === 0) return '';
      return h(
        'span',
        record.roleList.map(function (item) {
          return h(Tag, { color: 'blue' }, () => item.roleName);
        }),
      );
    },
  },
  // {
  //   title: '是否锁定',
  //   dataIndex: 'lockFlag',
  //   width: 200,
  // },

  {
    title: '状态',
    dataIndex: 'lockFlag',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.lockFlag === '0',
        checkedChildren: '已启用',
        unCheckedChildren: '已锁定',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          console.log(checked);
          // record.pendingStatus = true;
          // const newStatus = checked ? '0' : '9';
          // const { createMessage } = useMessage();
          // setRoleStatus(record.id, newStatus)
          //   .then(() => {
          //     record.status = newStatus;
          //     createMessage.success(`已成功修改角色状态`);
          //   })
          //   .catch(() => {
          //     createMessage.error('修改角色状态失败');
          //   })
          //   .finally(() => {
          //     record.pendingStatus = false;
          //   });
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const userFormSchema: FormSchema[] = [
  {
    field: 'divider-linked',
    component: 'Divider',
    label: '基础信息',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
    colProps: {
      span: 16,
    },
  },
  {
    field: 'divider-pwd',
    component: 'Divider',
    label: '密码设置',
    colProps: {
      span: 24,
    },
  },
  // {
  //   field: 'password',
  //   label: '密码',
  //   component: 'InputPassword',
  //   required: true,
  //   // ifShow: false,
  // },
  {
    field: 'divider-role',
    component: 'Divider',
    label: '角色设置',
    helpMessage: ['多选可空'],
    colProps: {
      span: 24,
    },
  },
  {
    field: 'role',
    component: 'Select',
    label: '用户角色',
    slot: 'roleSelect',
    defaultValue: [1, 3],
    colProps: {
      span: 22,
    },
  },
  // {
  //   field: 'role',
  //   component: 'ApiSelect',
  //   label: '用户角色',
  //   // defaultValue: [29, 3],
  //   componentProps: {
  //     mode: 'multiple',
  //     // more details see /src/components/Form/src/components/ApiSelect.vue
  //     api: getAllRoleList,
  //     params: {
  //       id: 1,
  //     },
  //     resultField: 'data',
  //     labelField: 'roleName',
  //     valueField: 'roleId',
  //     // not request untill to select
  //     immediate: false,
  //     onChange: (e) => {
  //       console.log('selected:', e);
  //     },
  //     // atfer request callback
  //     onOptionsChange: (options) => {
  //       console.log('get options', options.length, options);
  //     },
  //   },
  //   colProps: {
  //     span: 22,
  //   },
  // },

  // {
  //   field: 'password',
  //   label: '密码',
  //   component: 'InputPassword',
  //   required: true,
  //   ifShow: false,
  // },

  // {
  //   field: 'disclosure',
  //   component: 'Select',
  //   label: ' ',
  //   colProps: {
  //     span: 8,
  //   },
  //   show: ({ model }) => {
  //     return model.disclosure === '2';
  //   },
  //   componentProps: {
  //     placeholder: '公开给',
  //     mode: 'multiple',
  //     options: [
  //       {
  //         label: '同事1',
  //         value: '1',
  //       },
  //       {
  //         label: '同事2',
  //         value: '2',
  //       },
  //       {
  //         label: '同事3',
  //         value: '3',
  //       },
  //     ],
  //   },
  // },
  // {
  //   field: 'password',
  //   label: '密码',
  //   component: 'Select',
  //   required: true,
  //   ifShow: false,
  // },
];
