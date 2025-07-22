"use client"

import React from 'react'
import Header from '@/components/ui/header/Header'
import styles from "./contact.module.css";

function ContactPage() {
  return (
    <div className={styles.container}>
      <Header />
        <div style={{padding: '20px', display:'flex', flexDirection:'column',gap: '10px'}}>

            <div style={{fontSize:'30px',fontWeight:'600', color: "#444"}}>Contact Us</div>

            <div className={styles.info}>
                <p>
                If you have any questions or want to get in touch, feel free to reach out!
                </p>

                <p>
                <strong>Email:</strong> support@portfoliobuilder.io
                </p>

                <p>
                <strong>Phone:</strong> +1 (555) 123-4567
                </p>

                <p>
                <strong>Address:</strong> 123 Portfolio St., Creative City, USA
                </p>
            </div>

        </div>
    </div>
  )
}

export default ContactPage