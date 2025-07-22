"use client"
import Header from "@/components/ui/header/Header";
import styles from "./page.module.css";
import codingImage from "../assets/coding-img.png"
import Image from "next/image";

export default function Home() {

  return (
    <div >
      <Header />
      <div className="homepage-content" style={{display: 'flex',padding:'20px 25px',justifyContent:'center',alignItems:'center',gap:'10px'}}>
        <div className="homepage-content-left" style={{width: '50%'}}>
          <h1 style={{marginBottom: '10px'}}>Portfolio Builder</h1>
          <p className={styles["highlight-paragraph"]} style={{fontSize: '18px'}}>
            Whether you're a developer, designer, student, or creative professional, your portfolio is your personal brand — and your first impression.

            With Portfolio Builder, you can easily create a beautiful, customizable online portfolio without writing any code. Highlight your projects, skills, and achievements using modern, mobile-friendly templates.

            Perfect for job seekers, freelancers, and creatives who want to get noticed.
          </p>
        </div>
        <div className="homepage-content-right" style={{width: '50%'}}>
          <Image 
            src={codingImage} 
            alt="coding" 
            // style={{width: '250px'}}
            width={550}
          />
        </div>
      </div>
    </div>
  );
}
