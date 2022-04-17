import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import isEmpty from 'lodash-es/isEmpty';
// import { Icon } from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 200,
  },
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
    fixed: 'left',
  },
  {
    title: '菜单类型',
    dataIndex: 'type',
    width: 100,
    customRender: ({ text }) => {
      return text === '0' ? '菜单' : '按钮';
    },
  },
  {
    title: '图标',
    dataIndex: 'icon',
    align: 'left',
    width: 150,
  },

  // {
  //   title: '图标',
  //   dataIndex: 'icon',
  //   width: 50,
  //   customRender: ({ record }) => {
  //     return h(Icon, { icon: record.icon });
  //   },
  // },
  {
    title: '前端路由路径',
    dataIndex: 'path',
    align: 'left',
    width: 260,
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    align: 'left',
    width: 180,
    customRender: ({ text }) => {
      return !isEmpty(text) ? h(Tag, { color: 'green' }, () => text) : '';
    },
  },
  {
    title: '是否缓存',
    dataIndex: 'keepalive',
    width: 80,
    customRender: ({ record }) => {
      // 按钮不显示
      if (record.type === '1') {
        return '';
      }

      const status = record.keepAlive;
      const enable = ~~status === 1; // ~~ 利用两个按位取反的符号，进行类型的转换，转换成数字符号。
      const color = enable ? 'green' : 'red';
      const text = enable ? '是' : '否';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 80,
  },
];

// 菜单类型,0:菜单 1:按钮
const isMenu = (type: string) => type === '0';
// const isButton = (type: string) => type === '1';

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '菜单', value: '0' },
        { label: '按钮', value: '1' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },

  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => isMenu(values.type),
  },

  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
  },
  {
    field: 'keepAlive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '否', value: '0' },
        { label: '是', value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    colProps: { lg: 24, md: 24 },
  },
];
