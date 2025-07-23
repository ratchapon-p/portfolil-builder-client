'use client'
import React, { useState } from 'react'
import { Row, Col,Form, Input, Button, Upload, message } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile } from 'antd/es/upload/interface'

type ProfileFormType = {
  firstName: string
  lastName: string
  tag: string
  bio: string
  userProfileImage: File | null
}

function ProfilePage(): JSX.Element {
  const [form] = Form.useForm<ProfileFormType>()
  const [file, setFile] = useState<File | null>(null)

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
    if (!isImage) {
      message.error('You can only upload JPG/PNG file!')
    }
    return isImage || Upload.LIST_IGNORE
  }

  const handleChange = (info: UploadChangeParam) => {
    const uploadedFile = info.file.originFileObj
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const onFinish = (values: Omit<ProfileFormType, 'userProfileImage'>) => {
    const formData = new FormData()
    formData.append('firstName', values.firstName)
    formData.append('lastName', values.lastName)
    formData.append('tag', values.tag)
    formData.append('bio', values.bio)
    if (file) formData.append('userProfileImage', file)

    // 🛑 API implementation intentionally excluded
    console.log('Form Data:', formData)
  }

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto'}}>
      <h2 style={{ fontSize: 24, fontWeight: '500', marginBottom: 16 }}>Profile</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
         <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="tag" label="Tag">
          <Input />
        </Form.Item>
        <Form.Item name="bio" label="Bio">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Profile Image">
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleChange}
            showUploadList={{ showRemoveIcon: true }}
            maxCount={1}
          >
            <Button>Select Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ProfilePage
