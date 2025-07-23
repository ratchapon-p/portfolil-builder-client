"use client";
import React, { useEffect, useState } from "react";
import { get } from "@/utils/httpMethod";
import { Typography, Divider, List, Image, Space } from "antd";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;

interface IProfile {
  firstName: string;
  lastName: string;
  tag?: string;
  bio?: string;
  userProfileImage?: string;
}

interface IEducation {
  id: number;
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
}

interface IExperience {
  id: number;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

interface ISkill {
  id: number;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  skillImage?: string;
}

interface ICertificate {
  id: number;
  name: string;
  description?: string;
  receivedDate: string;
  expireDate?: string;
  certificationImage?: string;
  certificationLink?: string;
}

interface IContact {
  email?: string;
  facebook?: string;
  line?: string;
  tel?: string;
  github?: string;
  linkedin?: string;
}

function PortfolioPage() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [educationList, setEducationList] = useState<IEducation[]>([]);
  const [experienceList, setExperienceList] = useState<IExperience[]>([]);
  const [skillList, setSkillList] = useState<ISkill[]>([]);
  const [certificateList, setCertificateList] = useState<ICertificate[]>([]);
  const [contact, setContact] = useState<IContact | null>(null);

  const fetchData = async () => {
    const profileRes = await get("/profile/1");
    const educationRes = await get("/education/list/1");
    const experienceRes = await get("/experience/list/1");
    const skillRes = await get("/skill/list/1");
    const certificateRes = await get("/certificate/list/1");
    const contactRes = await get("/contact/1");

    if (profileRes.success) setProfile(profileRes.data as IProfile);
    if (educationRes.success) setEducationList(educationRes.result.data as IEducation[]);
    if (experienceRes.success) setExperienceList(experienceRes.result.data as IExperience[]);
    if (skillRes.success) setSkillList(skillRes.result.data as ISkill[]);
    if (certificateRes.success) setCertificateList(certificateRes.result.data as ICertificate[]);
    if (contactRes.success) setContact(contactRes.data as IContact);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px", width: "100%" }}>
      {/* Profile */}
      {profile && (
        <>
          <Space align="center" style={{ marginBottom: 16 }}>
            {profile.userProfileImage && (
              <Image
                src={profile.userProfileImage}
                alt={`${profile.firstName} ${profile.lastName}`}
                width={100}
                height={100}
                style={{ borderRadius: "50%", objectFit: "cover" }}
                preview={false}
              />
            )}
            <div>
              <Title level={2} style={{ marginBottom: 0 }}>
                {profile.firstName} {profile.lastName}
              </Title>
              {profile.tag && <Text type="secondary">{profile.tag}</Text>}
            </div>
          </Space>
          {profile.bio && <Paragraph>{profile.bio}</Paragraph>}
          <Divider />
        </>
      )}

      {/* Education */}
      {educationList.length > 0 && (
        <>
          <Title level={3}>Education</Title>
          <List
            dataSource={educationList}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={`${item.degree} - ${item.institution}`}
                  description={`${dayjs(item.startDate).format("DD-MMM-YYYY")} - ${
                    item.endDate ? dayjs(item.endDate).format("DD-MMM-YYYY") : "Present"
                  }`}
                />
              </List.Item>
            )}
          />
          <Divider />
        </>
      )}

      {/* Experience */}
      {experienceList.length > 0 && (
        <>
          <Title level={3}>Experience</Title>
          <List
            dataSource={experienceList}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={`${item.role} @ ${item.company}`}
                  description={
                    <>
                      {dayjs(item.startDate).format("DD-MMM-YYYY")} -{" "}
                      {item.endDate ? dayjs(item.endDate).format("DD-MMM-YYYY") : "Present"}
                      <br />
                      {item.description}
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Divider />
        </>
      )}

      {/* Skills */}
      {skillList.length > 0 && (
        <>
          <Title level={3}>Skills</Title>
          <Space wrap>
            {skillList.map((skill) => (
              <div key={skill.id} style={{ textAlign: "center" }}>
                {skill.skillImage && (
                  <Image
                    src={skill.skillImage}
                    alt={skill.name}
                    width={50}
                    height={50}
                    style={{ objectFit: "contain", marginBottom: 14 }}
                    preview={false}
                  />
                )}
                <div style={{marginTop:10}}>
                  {skill.name}
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {skill.level}
                </Text>
              </div>
            ))}
          </Space>
          <Divider />
        </>
      )}

      {/* Certificates */}
      {certificateList.length > 0 && (
        <>
          <Title level={3}>Certificates</Title>
          <List
            dataSource={certificateList}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={
                    item.certificationLink ? (
                      <a href={item.certificationLink} target="_blank" rel="noreferrer">
                        {item.name}
                      </a>
                    ) : (
                      item.name
                    )
                  }
                  description={
                    <>
                      <div>{item.description}</div>
                      <div>
                        {dayjs(item.receivedDate).format("DD-MMM-YYYY")}
                        {item.expireDate && ` - ${dayjs(item.expireDate).format("DD-MMM-YYYY")}`}
                      </div>
                    </>
                  }
                />
                {item.certificationImage && (
                  <Image src={item.certificationImage} width={100} preview={false} />
                )}
              </List.Item>
            )}
          />
          <Divider />
        </>
      )}

      {/* Contact */}
      {contact && (
        <>
          <Title level={3}>Contact</Title>
          <Paragraph>
            {contact.email && (
              <>
                <strong>Email:</strong> {contact.email}
                <br />
              </>
            )}
            {contact.facebook && (
              <>
                <strong>Facebook:</strong>
                <a href={contact.github} target="_blank" rel="noreferrer">
                  {contact.facebook}
                </a>
                <br />
              </>
            )}
            {contact.line && (
              <>
                <strong>Line:</strong> {contact.line}
                <br />
              </>
            )}
            {contact.tel && (
              <>
                <strong>Phone:</strong> {contact.tel}
                <br />
              </>
            )}
            {contact.github && (
              <>
                <strong>Github:</strong>{" "}
                <a href={contact.github} target="_blank" rel="noreferrer">
                  {contact.github}
                </a>
                <br />
              </>
            )}
            {contact.linkedin && (
              <>
                <strong>LinkedIn:</strong>{" "}
                <a href={contact.linkedin} target="_blank" rel="noreferrer">
                  {contact.linkedin}
                </a>
              </>
            )}
          </Paragraph>
        </>
      )}
    </div>
  );
}

export default PortfolioPage;
