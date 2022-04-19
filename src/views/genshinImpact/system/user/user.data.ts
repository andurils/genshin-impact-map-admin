import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

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

  {
    title: '状态',
    dataIndex: 'lockFlag',
    width: 120,
    customRender: ({ record }) => {
      const checked = record.lockFlag === '0';
      const color = checked ? 'green' : 'red';
      const text = checked ? '启用' : '锁定';
      return h(Tag, { color: color }, () => text);
    },
  },
  // {
  //   title: '状态',
  //   dataIndex: 'lockFlag',
  //   width: 120,
  //   customRender: ({ record }) => {
  //     if (!Reflect.has(record, 'pendingStatus')) {
  //       record.pendingStatus = false;
  //     }
  //     return h(Switch, {
  //       checked: record.lockFlag === '0',
  //       checkedChildren: '已启用',
  //       unCheckedChildren: '已锁定',
  //       loading: record.pendingStatus,
  //       onChange(checked: boolean) {
  //         // console.log(checked);
  //         record.pendingStatus = true;
  //         const newStatus = checked ? '0' : '9';
  //         const { createMessage } = useMessage();

  //         const userParam: UserModel = {
  //           ...(record as UserListItem),
  //         };
  //         userParam.lockFlag = newStatus;
  //         userParam.password = undefined; // 更新排除密码

  //         updateUser(userParam)
  //           .then(() => {
  //             record.lockFlag = newStatus;
  //             createMessage.success(`已成功修改角色状态`);
  //           })
  //           .catch(() => {
  //             createMessage.error('修改角色状态失败');
  //           })
  //           .finally(() => {
  //             record.pendingStatus = false;
  //           });
  //       },
  //     });
  //   },
  // },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'lockFlag',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '锁定', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const userFormSchema: FormSchema[] = [
  // {
  //   field: 'divider-linked',
  //   component: 'Divider',
  //   label: '基础信息',
  //   helpMessage: ['角色多选可空', '密码只在创建时填写'],
  //   colProps: {
  //     span: 24,
  //   },
  // },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
    colProps: {
      span: 22,
    },
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    show: false,
    colProps: {
      span: 22,
    },
  },
  {
    field: 'lockFlag',
    label: '状态',
    component: 'RadioButtonGroup',
    // defaultValue: '0', // 0:正常,9:已锁定
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '锁定', value: '9' },
      ],
    },
  },
  {
    field: 'role',
    component: 'Select',
    label: '角色',
    slot: 'roleSelect',
    required: true,
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
];

export const pwdRestFormSchema: FormSchema[] = [
  {
    field: 'passwordNew',
    label: '新密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '新密码',
    },
    rules: [
      {
        required: true,
        message: '请输入新密码',
      },
    ],
    colProps: {
      span: 22,
    },
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',
    colProps: {
      span: 22,
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('不能为空');
            }
            if (value !== values.passwordNew) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
