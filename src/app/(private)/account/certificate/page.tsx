"use client";
import { get } from "@/utils/httpMethod";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Image,
  message,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "../../accountPortBuilder.css";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

type ICertificate = {
  id: number;
  name: string;
  description?: string;
  receivedDate: string;
  expireDate?: string;
  certificationImage?: string;
  certificationLink?: string;
};

function CertificatePage() {
  const [form] = Form.useForm();
  const [certificateList, setCertificateList] = useState<ICertificate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<Partial<ICertificate>>({});

  const getCertificatesList = async () => {
    const url = "/certificate/list/1"; 
    const response = await get(url);
    if (response.success) {
      setCertificateList(response.result.data);
    }
  };

  const getCertificateDetail = async (id: number) => {
    const url = `/certificate/${id}`;
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
    await getCertificateDetail(id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFormData({});
  };

  useEffect(() => {
    getCertificatesList();
  }, []);

  useEffect(() => {
    if (formData && modalType === "edit") {
      form.setFieldsValue({
        ...formData,
        receivedDate: formData.receivedDate ? dayjs(formData.receivedDate) : null,
        expireDate: formData.expireDate ? dayjs(formData.expireDate) : null,
      });
    }
  }, [formData]);

  const onFinish = (values: any) => {
    const payload = {
      ...formData,
      ...values,
      receivedDate: values.receivedDate?.format("YYYY-MM-DD"),
      expireDate: values.expireDate?.format("YYYY-MM-DD"),
    };

    if (modalType === "create") {
      payload.id = Date.now();
      setCertificateList((prev) => [...prev, payload as ICertificate]);
      message.success("Added new certificate");
    } else if (modalType === "edit" && payload.id) {
      setCertificateList((prev) =>
        prev.map((c) => (c.id === payload.id ? payload : c))
      );
      message.success("Updated certificate");
    }

    setIsModalOpen(false);
    form.resetFields();
    setFormData({});
  };

  const handleDelete = (id: number) => {
    setCertificateList((prev) => prev.filter((c) => c.id !== id));
    message.success("Deleted certificate");
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

      {certificateList.map((item) => (
        <div key={item.id} className="content-box">
          <div className="content-box-details">
            <div className="role">
              {item.certificationLink ? (
                <a href={item.certificationLink} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </div>
            <div className="description">{item.description}</div>
            <div className="date">
              {dayjs(item.receivedDate).format("DD MMM YYYY")}{" "}
              {item.expireDate && ` - ${dayjs(item.expireDate).format("DD MMM YYYY")}`}
            </div>
            {item.certificationImage && (
              <div style={{ marginTop: 8 }}>
                <Image
                  src={item.certificationImage}
                  width={150}
                  alt="certificate"
                />
              </div>
            )}
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
        title={modalType === "create" ? "Add Certificate" : "Edit Certificate"}
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
            rules={[{ required: true, message: "Please input certificate name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="receivedDate"
            label="Received Date"
            rules={[{ required: true, message: "Please select received date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="expireDate" label="Expire Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="certificationImage" label="Image URL">
            <Input />
          </Form.Item>

          <Form.Item name="certificationLink" label="Link">
            <Input />
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

export default CertificatePage;
