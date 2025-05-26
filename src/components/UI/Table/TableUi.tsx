import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Avatar, Button, Row, Col, Card, Radio } from 'antd';
import type { TableProps } from 'antd';
import { TableOutlined, UnorderedListOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
interface ApiDataType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}



const TableUi: React.FC = ({ filteredData, onEdit, onDelete, loading }: any) => {
  // return <></>
  const columns: TableProps<ApiDataType>['columns'] = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <Avatar src={avatar} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle" >
          <Button type='primary' onClick={() => onEdit(record)}>Edit</Button>
          <Button type='primary' danger onClick={() => onDelete(record)} >Delete</Button>
        </Space>
      ),
    },
  ];
  const [position, setPosition] = useState<'table' | 'grid'>('table');


  return (
    <div>
      {/* Toggle Button */}
      <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} style={{ marginBottom: 10 }}>
        <Radio.Button value="table"><TableOutlined /> table</Radio.Button>
        <Radio.Button value="grid"><UnorderedListOutlined /> Grid</Radio.Button>
      </Radio.Group>
      {/* Conditionally Render Table or Card View */}
      {position === 'table' ? (
        <Table<ApiDataType>
          size="small"
          columns={columns}
          loading={loading}
          dataSource={filteredData}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredData.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
              <div className="card-container">
                <Card
                  title={''}
                  className="custom-card"
                  bordered
                  hoverable
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar src={item.avatar} size={64} style={{ marginBottom: 16 }} />
                    <h3>{item.first_name}  {item.last_name}</h3>
                    {item.email && <p>{item.email}</p>}
                  </div>

                </Card>
                <div className="card-overlay">
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => onEdit(item)}
                    icon={<EditOutlined />}
                    style={{ marginRight: 8 }}
                  />
                  <Button
                    type="primary"
                    danger
                    shape="circle"
                    onClick={() => onDelete(item)}
                    icon={<DeleteOutlined />}
                  />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )
      }
    </div >
  )
}
export default TableUi