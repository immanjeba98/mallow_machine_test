import { memo, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as commonAction from "../../redux/action/common";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, Alert, notification, Modal } from 'antd';
import { setStorage } from '../../services/helperFunctions';
import { EXIST_LOCAL_STORAGE } from '../../services/constants';
import { useNavigate } from 'react-router-dom';

const Login = ({ LoginAuth }: any) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setError(null); 
    // setLoading(true);
    
    let value = {
      email: "eve.holt@reqres.in",
      password: "cityslicka"
    }
    
    if (values.email === value.email && values.password === value.password) {
      LoginAuth(values).then((res: any) => {
        if (res?.token) {
          setStorage(EXIST_LOCAL_STORAGE.AUTHTOKEN, res?.token);
          navigate('/');
        }
        console.log("Login successful", res?.token);
      }).catch((error: any) => {
        console.error("Login failed", error);
        setError("Login failed. Please try again.");
      }).finally(() => {
        // setLoading(false);
      });
    } else {
      setError("Invalid email or password. Please check your credentials.");
      // setLoading(false);
    }
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  return (
    <Row
      justify="center"
      align="middle"
      style={{ height: '100vh', backgroundColor: '#f0f2f5' }}
    >
      <Col xs={22} sm={16} md={12} lg={10} xl={8}>
        <div
          style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              closable
              onClose={() => setError(null)}
              style={{ marginBottom: '16px' }}
            />
          )}
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email' }]}
            >
              <Input
                style={{ borderRadius: 0 }}
                prefix={<UserOutlined />}
                placeholder="Email Address"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                style={{ borderRadius: 0 }}
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Form.Item noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </div>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

const mapStatesToProps = ({ common: { loginData = [], isLoginLoader = false } }) => {
  return { loginData, isLoginLoader };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      ...commonAction,
    },
    dispatch
  );
};

export default memo(connect(mapStatesToProps, mapDispatchToProps)(Login));