"use client";
import { get } from "@/utils/httpMethod";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Image,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "../../accountPortBuilder.css";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

type ISkill = {
  id: number;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  skillImage?: string;
};

function SkillPage() {
  const [form] = Form.useForm();
  const [skillList, setSkillList] = useState<ISkill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<Partial<ISkill>>({});

  const getSkillList = async () => {
    const url = "/skill/list/1"; // เปลี่ยน path เป็น skill
    const response = await get(url);
    if (response.success) {
      setSkillList(response.result.data);
    }
  };

  const getSkillDetail = async (id: number) => {
    const url = `/skill/${id}`;
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
    await getSkillDetail(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFormData({});
  };

  useEffect(() => {
    getSkillList();
  }, []);

  useEffect(() => {
    if (formData && modalType === "edit") {
      form.setFieldsValue(formData);
    }
  }, [formData]);

  const onFinish = (values: any) => {
    const payload = {
      ...formData,
      ...values,
    };

    if (modalType === "create") {
      payload.id = Date.now();
      setSkillList((prev) => [...prev, payload as ISkill]);
      message.success("Added new skill");
    } else if (modalType === "edit" && payload.id) {
      setSkillList((prev) =>
        prev.map((s) => (s.id === payload.id ? payload : s))
      );
      message.success("Updated skill");
    }

    setIsModalOpen(false);
    form.resetFields();
    setFormData({});
  };

  const handleDelete = (id: number) => {
    setSkillList((prev) => prev.filter((s) => s.id !== id));
    message.success("Deleted skill");
  };

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

      {skillList.map((item) => (
        <div key={item.id} className="content-box">
          <div className="content-box-details" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {item.skillImage && (
              <Image
                src={item.skillImage}
                alt={item.name}
                width={60}
                height={60}
                style={{ objectFit: 'contain', borderRadius: 8 }}
                preview={false}
              />
            )}

            <div>
              <div className="role" style={{ fontSize: 16, fontWeight: 500 }}>{item.name}</div>
              <div className="description" style={{ color: '#555' }}>Level: {item.level}</div>
            </div>
          </div>
          <div className="edit-content-box">
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => handleEdit(item.id)}
            >
              Edit
            </Button>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      <Modal
        open={isModalOpen}
        title={modalType === "create" ? "Add Skill" : "Edit Skill"}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input skill name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="level"
            label="Level"
            rules={[{ required: true, message: "Please select skill level" }]}
          >
            <Select placeholder="Select skill level">
              <Select.Option value="Beginner">Beginner</Select.Option>
              <Select.Option value="Intermediate">Intermediate</Select.Option>
              <Select.Option value="Advanced">Advanced</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="skillImage" label="Image URL">
            <Input placeholder="https://example.com/image.png" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {modalType === "create" ? "Add" : "Save"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default SkillPage;
