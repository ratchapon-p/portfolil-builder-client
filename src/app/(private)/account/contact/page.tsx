'use client'
import React from 'react'
import { Form, Input, Button } from 'antd'

type ContactFormType = {
  email: string
  facebook: string
  line: string
  tel: string
  github: string
  linkedin: string
}

function ContactPage(): JSX.Element {
  const [form] = Form.useForm<ContactFormType>()

  const onFinish = (values: ContactFormType) => {
    // 🛑 API implementation intentionally excluded
    console.log('Contact form submitted', values)
  }

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto', padding: 0 }}>
      <h2 style={{ fontSize: 24, fontWeight: '500', marginBottom: 16 }}>Contact Information</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="facebook" label="Facebook">
          <Input />
        </Form.Item>
        <Form.Item name="line" label="Line">
          <Input />
        </Form.Item>
        <Form.Item name="tel" label="Phone Number">
          <Input />
        </Form.Item>
        <Form.Item name="github" label="GitHub">
          <Input />
        </Form.Item>
        <Form.Item name="linkedin" label="LinkedIn">
          <Input />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right',marginTop:'20px' }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ContactPage
