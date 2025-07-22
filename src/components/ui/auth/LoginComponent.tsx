"use client";
import "./Auth.css";
import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { post } from "@/utils/httpMethod";
const { Title } = Typography;

function LoginComponent() {
  const [form] = Form.useForm();
  const onFinish = async(values: { email: string; password: string }) => {
    console.log("Login info:", values);
    try {
      const url = '/user/login'
      const response = await post(url, values);
      console.log(response,'<<RESRESRSE');
      message.success(`Logged in as ${values.email}`);

    } catch (error : any) {
      console.log(error,'<<Error');
      message.error(error);
    }
    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #f0f0f0",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Login
      </Title>

      <Form
        form={form}
        layout="vertical"
        name="login-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="your.email@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginComponent;
