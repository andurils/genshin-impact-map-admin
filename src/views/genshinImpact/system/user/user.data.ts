// import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
// import { setRoleStatus } from '/@/api/demo/system';
import { useMessage } from '/@/hooks/web/useMessage';

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
  // {
  //   title: '角色',
  //   dataIndex: 'roleList',
  //   width: 120,
  // },
  // {
  //   title: '是否锁定',
  //   dataIndex: 'lockFlag',
  //   width: 200,
  // },

  {
    title: '状态',
    dataIndex: 'lockFlag',
    width: 120,
    // customRender: ({ record }) => {
    //   if (!Reflect.has(record, 'pendingStatus')) {
    //     record.pendingStatus = false;
    //   }
    //   return h(Switch, {
    //     checked: record.lockFlag === '0',
    //     checkedChildren: '已启用',
    //     unCheckedChildren: '已锁定',
    //     loading: record.pendingStatus,
    //     onChange(checked: boolean) {
    //       record.pendingStatus = true;
    //       const newStatus = checked ? '0' : '9';
    //       const { createMessage } = useMessage();
    //       // setRoleStatus(record.id, newStatus)
    //       //   .then(() => {
    //       //     record.status = newStatus;
    //       //     createMessage.success(`已成功修改角色状态`);
    //       //   })
    //       //   .catch(() => {
    //       //     createMessage.error('修改角色状态失败');
    //       //   })
    //       //   .finally(() => {
    //       //     record.pendingStatus = false;
    //       //   });
    //     },
    //   });
    // },
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
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
  },
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
  // {
  //   label: '角色',
  //   field: 'role',
  //   component: 'ApiSelect',
  //   componentProps: {
  //     api: getAllRoleList,
  //     labelField: 'roleName',
  //     valueField: 'roleValue',
  //   },
  //   required: true,
  // },
];
