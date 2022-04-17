import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 240,
  },
  {
    title: '角色标识',
    dataIndex: 'roleCode',
    width: 240,
    customRender: ({ text }) => {
      return h(Tag, { color: 'blue' }, () => text);
    },
  },
  {
    title: '角色描述',
    align: 'left',
    dataIndex: 'roleDesc',
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  //   width: 250,
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleCode',
    label: '角色标识',
    required: true,
    component: 'Input',
  },
  {
    label: '角色描述',
    field: 'roleDesc',
    component: 'InputTextArea',
    colProps: {
      span: 24,
    },
  },
  // {
  //   label: ' ',
  //   field: 'menu',
  //   slot: 'menu',
  //   component: 'Input',
  // },
];
