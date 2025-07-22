"use client"
import Header from '@/components/ui/header/Header'
import React from 'react'
import styles from './about.module.css';

function AboutPage() {
  return (
    <div >
      <Header />
      <div style={{padding: '20px'}}>
        <section className={styles.hero}>
            <h1>About Us</h1>
            <p>
            At Portfolio Builder, we empower creatives, developers, and professionals to showcase their talents online with ease and style.
            </p>
        </section>

        <section className={styles.mission}>
            <h2>Our Mission</h2>
            <p>
            To make portfolio creation simple, beautiful, and accessible for everyone — no coding required.
            </p>
        </section>

        <section className={styles.team}>
            <h2>Meet the Team</h2>
            <div className={styles.teamGrid}>
            <div className={styles.member}>
        <img
            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
            alt="Jane Doe"
            className={styles.avatar}
        />
        <h3>Jane Doe</h3>
        <p>Founder & CEO</p>
        </div>

        <div className={styles.member}>
        <img
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
            alt="John Smith"
            className={styles.avatar}
        />
        <h3>John Smith</h3>
        <p>Lead Developer</p>
        </div>

        <div className={styles.member}>
        <img
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
            alt="Emma Lee"
            className={styles.avatar}
        />
        <h3>Emma Lee</h3>
        <p>Product Designer</p>
        </div>
            </div>
        </section>

        <section className={styles.contact}>
            <h2>Contact Us</h2>
            <p>Email: support@portfoliobuilder.io</p>
            <p>Phone: +1 (555) 123-4567</p>
        </section>
      </div>
    </div>
  )
}

export default AboutPage