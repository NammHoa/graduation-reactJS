import React, { useEffect, useState, useRef } from "react";

const content = {
  university: {
    name: "ĐẠI HỌC",
    sub: "NGOẠI NGỮ TIN HỌC",
    en: "UNIVERSITY OF FOREIGN LANGUAGES AND INFORMATION TECHNOLOGY"
  },
  guestName: "Quý khách",
  eventTitle: "LỄ TỐT NGHIỆP",
  gradName: "Lâm Huỳnh Hòa Nam",
  day: "THỨ SÁU",
  date: "31.07.2026",
  time: "9:30 - 11:00",
  venueName: "Trường Đại học Ngoại ngữ Tin học TP.HCM",
  venueAddress: "số 806 Lê Quang Đạo, xã Hóc Môn, Thành phố Hồ Chí Minh. ",
  mapLink: "https://maps.app.goo.gl/Z5grm6YAS2h36K1WA",
  message: "Sự hiện diện của mọi người trong ngày lễ tốt nghiệp sắp tới sẽ là niềm vinh dự và niềm hạnh phúc to lớn đối với mình. Rất mong được gặp mọi người để cùng chia sẻ niềm vui và lưu giữ những kỷ niệm đẹp trong cột mốc đặc biệt này.",
};

export default function GraduationInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMusic = (e) => {
    if (e) e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  return (
    <div className={`gi-page ${isOpen ? 'opened' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Great+Vibes&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');

        .gi-page {
          --cream: #FDFBF7;
          --cream-deep: #F5EFEB;
          --maroon: #6B0F1D;
          --maroon-deep: #4A0D1A;
          --ink: #332B29;
          --ink-soft: #6A605B;
          --gold: #C5A566;

          position: relative;
          width: 100%;
          min-height: 100vh;
          box-sizing: border-box;
          background: linear-gradient(135deg, var(--cream) 0%, var(--cream-deep) 100%);
          font-family: 'Be Vietnam Pro', sans-serif;
          overflow: hidden;
        }

        .gi-page *, .gi-page *::before, .gi-page *::after {
          box-sizing: border-box;
        }

        /* ---------------- Ribbon Image Container ---------------- */
        .ribbon-image-wrapper {
          position: absolute;
          top: -20px;
          right: -40px; 
          width: 200px; 
          height: 85vh; 
          z-index: 10;
          perspective: 1000px;
          transform-origin: top center;
          transform: translateY(-120%) rotateZ(8deg); /* Trạng thái ẩn ban đầu */
          filter: drop-shadow(-12px 15px 12px rgba(0,0,0,0.4));
        }

        /* Khi mở thiệp, ruy băng mới rớt xuống */
        .gi-page.opened .ribbon-image-wrapper {
          animation: 
            dropRibbonSystem 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
            flutterImage 4s ease-in-out infinite alternate 1.5s;
        }

        @keyframes dropRibbonSystem {
          0% { transform: translateY(-120%) rotateZ(8deg); }
          100% { transform: translateY(0) rotateZ(8deg); }
        }

        /* 3D billow/flutter effect on the whole image */
        @keyframes flutterImage {
          0% { transform: rotateZ(8deg) rotateX(5deg) rotateY(15deg) skewX(2deg); }
          33% { transform: rotateZ(7deg) rotateX(-2deg) rotateY(-5deg) skewX(-1deg); }
          66% { transform: rotateZ(9deg) rotateX(3deg) rotateY(10deg) skewX(1.5deg); }
          100% { transform: rotateZ(8deg) rotateX(-5deg) rotateY(-15deg) skewX(-2deg); }
        }

        .ribbon-image {
          width: 100%;
          height: 100%;
          /* Allows the image to stretch slightly to fit the container without breaking */
          object-fit: fill; 
          display: block;
        }

        /* ---------------- Ribbon Rotated Text ---------------- */
        .ribbon-text-container {
          position: absolute;
          top: 50%;
          left: 50%;
          /* Rotate the whole container 90 degrees clockwise */
          transform: translate(-50%, -50%) rotate(90deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px; 
          width: 85vh; /* Plenty of width for the text to sit on one line */
          text-align: center;
          /* Move it slightly "up" in the rotated space */
          margin-top: -5px;
        }

        .ribbon-name {
          font-family: 'Great Vibes', cursive;
          font-size: 48px;
          color: #FFFFFF;
          text-shadow: 1px 2px 4px rgba(74,13,26,0.9);
          line-height: 1;
        }
        
        .ribbon-role {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 500;
          color: #F8E3AD;
          letter-spacing: 2px;
          text-shadow: 1px 1px 3px rgba(74,13,26,0.7);
          margin-top: 5px;
        }

        @media (max-width: 500px) {
          .ribbon-image-wrapper { right: -20px; width: 140px; height: 85vh; }
          .ribbon-name { font-size: 30px; }
          .ribbon-role { font-size: 11px; }
        }

        /* ---------------- Content Area ---------------- */
        .gi-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          padding: 50px 240px 50px 30px; /* Căn trái chuẩn 30px, chừa phải 240px cho ruy băng */
          height: 100vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start; /* Ép tất cả bám sát lề trái */
        }
        
        @media (max-width: 500px) {
          .gi-content { padding: 40px 160px 40px 25px; } 
        }

        .gi-content > * {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        /* Trigger content animation on mount */
        .gi-page.opened .gi-content > * {
          opacity: 1;
          transform: translateY(0);
        }
        
        .gi-content > *:nth-child(1) { transition-delay: 0.5s; }
        .gi-content > *:nth-child(2) { transition-delay: 0.7s; }
        .gi-content > *:nth-child(3) { transition-delay: 0.9s; }
        .gi-content > *:nth-child(4) { transition-delay: 1.1s; }
        .gi-content > *:nth-child(5) { transition-delay: 1.3s; }
        .gi-content > *:nth-child(6) { transition-delay: 1.5s; }

        /* Logo Area */
        .gi-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 50px;
        }
        .gi-logo-icon {
          height: 50px; /* Đặt chiều cao 50px để logo hiển thị rõ ràng */
          width: auto;
          object-fit: contain;
        }
        .gi-uni-text {
          display: flex;
          flex-direction: column;
        }
        .gi-uni-name-1 {
          font-size: 12px;
          font-weight: 700;
          color: var(--maroon);
          line-height: 1.2;
        }
        .gi-uni-name-2 {
          font-size: 12px;
          font-weight: 700;
          color: var(--maroon);
          line-height: 1.2;
        }
        .gi-uni-sub {
          font-size: 8px;
          color: var(--ink-soft);
          margin-top: 2px;
          letter-spacing: 0.5px;
        }

        /* Invitation Text */
        .gi-dear {
          font-size: 14px;
          color: var(--ink);
          margin-bottom: 40px; /* Tăng khoảng cách theo mẫu */
        }
        .gi-guest {
          font-weight: 600;
          border-bottom: 1.5px dashed var(--ink-soft);
          padding-bottom: 2px;
          margin-left: 8px;
          margin-right: 8px;
        }

        .gi-title-block {
          width: 100%;
          text-align: center; /* Căn giữa cụm Lễ Tốt Nghiệp */
          margin-bottom: 45px; /* Khoảng cách rộng phía dưới */
        }

        .gi-attend {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          color: var(--ink-soft);
          margin-bottom: 8px;
          font-style: italic;
        }

        .gi-title {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 700;
          color: var(--maroon);
          margin: 0 0 5px 0;
          letter-spacing: 1px;
          
          /* Bóng đổ cố định, KHÔNG chuyển động để tránh trình duyệt render lại liên tục gây khựng */
          text-shadow: 0 0 8px rgba(107, 15, 29, 0.15);
          
          /* Kích hoạt GPU Hardware Acceleration */
          will-change: transform;
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
          transform: translate3d(0, 0, 0);
          
          /* Hiệu ứng phóng to thu nhỏ siêu mượt */
          animation: titleScaleSmooth 3.5s ease-in-out infinite alternate;
        }

        @keyframes titleScaleSmooth {
          0% { 
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% { 
            transform: translate3d(0, 0, 0) scale(1.06);
          }
        }

        .gi-grad-name {
          font-family: 'Great Vibes', cursive;
          font-size: 42px;
          color: var(--gold);
          margin: 0;
          line-height: 1;
        }

        /* Details */
        .gi-details-box {
          margin-bottom: 45px; /* Tăng khoảng cách */
        }
        .gi-day {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink-soft);
          margin: 0 0 5px 0;
          letter-spacing: 1px;
        }
        .gi-date {
          font-size: 15px;
          font-weight: 700;
          color: var(--maroon);
          margin: 0 0 3px 0;
        }
        .gi-time {
          font-size: 15px;
          font-weight: 600;
          color: var(--maroon);
          margin: 0;
        }

        /* Venue */
        .gi-venue-box {
          margin-bottom: 45px;
        }
        .gi-venue-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink-soft);
          margin: 0 0 5px 0;
          letter-spacing: 1px;
        }
        .gi-venue-name {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--maroon);
          margin: 0 0 3px 0;
        }
        .gi-venue-address {
          font-size: 13px;
          color: var(--ink);
          margin: 0;
          line-height: 1.5;
          font-style: italic;
          white-space: pre-line;
        }
        
        /* Map Button */
        .gi-map-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          padding: 6px 14px;
          background-color: var(--maroon);
          color: #FFF;
          font-size: 11px;
          font-weight: 600;
          text-decoration: none;
          border-radius: 20px;
          letter-spacing: 0.5px;
          transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
          box-shadow: 0 3px 6px rgba(107, 15, 29, 0.2);
        }
        
        .gi-map-btn:hover {
          background-color: var(--maroon-deep);
          transform: translateY(-2px);
          box-shadow: 0 5px 10px rgba(107, 15, 29, 0.3);
        }

        /* Message */
        .gi-message {
          font-size: 13px;
          color: var(--ink-soft);
          line-height: 1.6;
          margin: 0;
          text-align: justify;
        }

        /* Music Button */
        .gi-music-btn {
          position: fixed;
          bottom: 30px;
          right: 40px; /* Chuyển sang bên phải theo yêu cầu */
          left: auto;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: var(--maroon);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
          box-shadow: 0 4px 10px rgba(107, 15, 29, 0.4);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .gi-music-btn:hover {
          transform: scale(1.1);
          background-color: var(--maroon-deep);
        }
        .gi-music-btn.playing svg {
          animation: spinMusic 4s linear infinite;
        }
        @keyframes spinMusic {
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 500px) {
          .gi-music-btn { bottom: 20px; right: 20px; left: auto; width: 40px; height: 40px; }
        }

        /* ---------------- Cover Screen ---------------- */
        .gi-cover {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, var(--cream) 0%, var(--cream-deep) 100%);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: transform 1.2s cubic-bezier(0.7, 0, 0.3, 1), opacity 1.2s ease;
        }
        
        .gi-cover.opened {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }

        .gi-cover-logo {
          height: 100px;
          margin-bottom: 30px;
          animation: titleScaleSmooth 3s ease-in-out infinite alternate;
        }

        .gi-cover-text {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--maroon);
          margin-bottom: 50px;
          letter-spacing: 2px;
        }

        .gi-cover-btn {
          padding: 14px 40px;
          background-color: var(--maroon);
          color: white;
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 1.5px;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(107, 15, 29, 0.3);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .gi-cover-btn:hover {
          background-color: var(--maroon-deep);
          transform: scale(1.05);
        }
      `}</style>

      {/* Welcome Cover Screen */}
      <div className={`gi-cover ${isOpen ? 'opened' : ''}`}>
        <img src="/logo-huflit.png" alt="HUFLIT Logo" className="gi-cover-logo" />
        <div className="gi-cover-text">THIỆP MỜI TỐT NGHIỆP</div>
        <button className="gi-cover-btn" onClick={handleOpen}>MỞ THIỆP</button>
      </div>

      {/* 3D Image Ribbon */}
      <div className="ribbon-image-wrapper">
        <img src="/ribbon.png" alt="Graduation Ribbon" className="ribbon-image" />
        <div className="ribbon-text-container">
          <span className="ribbon-name">{content.ribbonName}</span>
          <span className="ribbon-role">{content.ribbonRole}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="gi-content">
        <div className="gi-header">
          {/* HUFLIT Logo */}
          <img src="/logo-huflit.png" alt="University Logo" className="gi-logo-icon" />
          <div className="gi-uni-text">
            <span className="gi-uni-name-1">{content.university.name}</span>
            <span className="gi-uni-name-2">{content.university.sub}</span>
            <span className="gi-uni-sub">{content.university.en}</span>
          </div>
        </div>

        <div className="gi-title-block">
          <p className="gi-attend">Tới tham dự</p>
          <h1 className="gi-title">{content.eventTitle}</h1>
          <h2 className="gi-grad-name">{content.gradName}</h2>
        </div>

        <div className="gi-details-box">
          <p className="gi-day">{content.day}</p>
          <p className="gi-date">{content.date}</p>
          <p className="gi-time">{content.time}</p>
        </div>

        <div className="gi-venue-box">
          <p className="gi-venue-label">TẠI</p>
          <p className="gi-venue-name">{content.venueName}</p>
          <p className="gi-venue-address">{content.venueAddress}</p>
          
          <a href={content.mapLink} target="_blank" rel="noreferrer" className="gi-map-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Xem bản đồ
          </a>
        </div>

        <p className="gi-message">{content.message}</p>
      </div>

      {/* Background Audio Element */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/tiktok_audio.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Music Toggle Button */}
      <div className={`gi-music-btn ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic} title="Bật/Tắt Nhạc">
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        )}
      </div>

    </div>
  );
}