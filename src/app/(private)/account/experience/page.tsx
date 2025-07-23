"use client";
import { get } from "@/utils/httpMethod";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "../../accountPortBuilder.css";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

type IExperience = {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: number;
  isDelete: number;
  id: number;
  userId: number;
};

function ExperiencePage() {
  const [form] = Form.useForm();
  const [experienceList, setExperienceList] = useState<IExperience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<Partial<IExperience>>({});

  const getExperiencesList = async () => {
    const url = "/experience/list/1";
    const response = await get(url);
    if (response.success) {
      setExperienceList(response.result.data);
    }
  };

  const getExperienceDetail = async (id: number) => {
    const url = `/experience/${id}`;
    const response = await get(url);
    if (response.success) {
      setFormData(response.data);
    }
  };

  const handleAdd = () => {
    setModalType("create");
    form.resetFields() 
    setFormData({})
    setIsModalOpen(true);
  };

  const handleEdit = async(id: number) => {
    setModalType("edit");
    await getExperienceDetail(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields() 
    setFormData({})
  };

  useEffect(() => {
    getExperiencesList();
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
          <PlusOutlined />
          Add
        </Button>
      </div>
      {experienceList.map((item) => (
        <div key={item.id} className="content-box">
          <div className="content-box-details">
            <div className="role">{item.role}</div>
            <div className="company-location">
              {item.company} - {item.location}
            </div>
            <div className="date">
              {item.startDate
                ? dayjs(item.startDate, "YYYY-MM-DD").format("DD MMM YYYY")
                : ""}{" "}
              -{" "}
              {item.endDate
                ? dayjs(item.endDate, "YYYY-MM-DD").format("DD MMM YYYY")
                : ""}
            </div>
            <div className="description">{item.description}</div>
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
        title={modalType === "create" ? "Add Experience" : "Edit Experience"}
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
            setFormData({})
            setIsModalOpen(false);
          }}
        >
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="company"
            label="Company"
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

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ExperiencePage;
