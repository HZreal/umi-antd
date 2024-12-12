import { queryUserList } from '@/services/demo/UserController';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import React, { useRef } from 'react';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    tip: '名称是唯一的 key',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
    },
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    valueType: 'text',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    hideInForm: true,
    valueEnum: {
      0: { text: '男', status: 'MALE' },
      1: { text: '女', status: 'FEMALE' },
    },
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
  },
];

const MyHello: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();

  return (
    <PageContainer
      header={{
        title: 'My Hello',
      }}
    >
      <ProTable<API.UserInfo>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryUserList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
          return {
            data: data?.list || [],
            success,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            console.log('  ---->  ', selectedRows.length);
          },
        }}
      />
    </PageContainer>
  );
};

export default MyHello;
