"use client";

import { Button, DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { get } from "@/utils/httpMethod";
import "../../accountPortBuilder.css";

interface IEducation {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpax: number;
  isDelete: number;
  id: number;
  userId: number;
}

function EducationPage() {
  const [form] = Form.useForm();
  const [educationList, setEducationList] = useState<IEducation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<Partial<IEducation>>({});
  const getEducationsList = async () => {
    const url = "/education/list/1";
    const response = await get(url);
    if (response.success) {
      setEducationList(response.result.data);
    }
  };

  const getEducationDetail = async (id: number) => {
    const url = `/education/${id}`;
    const response = await get(url);
    if (response.success) {
      setFormData(response.data);
    }
  };

  const handleAdd = () => {
    setModalType("create");
    form.resetFields();
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = async (id: number) => {
    setModalType("edit");
    await getEducationDetail(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFormData({});
  };

  useEffect(() => {
    getEducationsList();
  }, []);

  useEffect(() => {
    if (formData && modalType === "edit") {
      form.setFieldsValue({
        ...formData,
        startDate: formData.startDate ? dayjs(formData.startDate) : null,
        endDate: formData.endDate ? dayjs(formData.endDate) : null,
      });
    }
  }, [formData]);

  return (
    <div>
      <div
        className="add-button"
        style={{ marginBottom: "25px", display: "flex", justifyContent: "end" }}
      >
        <Button type="primary" onClick={handleAdd}>
          <PlusOutlined /> Add
        </Button>
      </div>

      {educationList.map((item) => (
        <div key={item.id} className="content-box">
          <div className="content-box-details">
            <div className="role">{item.degree}</div>
            <div className="company-location">
              {item.institution} - {item.location}
            </div>
            <div className="date">
              {dayjs(item.startDate).format("DD MMM YYYY")} -{" "}
              {dayjs(item.endDate).format("DD MMM YYYY")}
            </div>
            <div className="description">GPAX: {item.gpax}</div>
          </div>
          <div className="edit-content-box">
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => handleEdit(item.id)}
            >
              Edit
            </Button>
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </div>
        </div>
      ))}

      <Modal
        open={isModalOpen}
        title={modalType === "create" ? "Add Education" : "Edit Education"}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={(values) => {
            const payload = {
              ...values,
              startDate: values.startDate.format("YYYY-MM-DD"),
              endDate: values.endDate.format("YYYY-MM-DD"),
            };
            console.log("Submit:", payload);
            // คุณสามารถส่ง payload ไปยัง create หรือ update API ได้ที่นี่
            setFormData({});
            setIsModalOpen(false);
          }}
        >
          <Form.Item name="degree" label="Degree" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="institution"
            label="Institution"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="endDate" label="End Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="gpax" label="GPAX">
            <Input type="number" step="0.01" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              {" "}
              Cancel{" "}
            </Button>
            <Button type="primary" htmlType="submit">
              {" "}
              Save{" "}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EducationPage;
