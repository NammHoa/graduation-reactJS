import React, { useEffect, useState, useRef, useMemo } from "react";

const content = {
  university: {
    name: "ĐẠI HỌC",
    sub: "NGOẠI NGỮ TIN HỌC",
    en: "UNIVERSITY OF FOREIGN LANGUAGES AND INFORMATION TECHNOLOGY"
  },
  guestName: "Quý khách",
  eventTitle: "LỄ TỐT NGHIỆP",
  gradName1: "Lâm Huỳnh",
  gradName2: "Hòa Nam",
  day: "THỨ SÁU",
  date: "31.07.2026",
  time: "9:00 - 11:00",
  venueName: "Trường Đại học Ngoại ngữ Tin học TP.HCM",
  venueAddress: "số 806 Lê Quang Đạo, xã Hóc Môn, Thành phố Hồ Chí Minh.",
  mapLink: "https://maps.app.goo.gl/Z5grm6YAS2h36K1WA",
  message: "Sự hiện diện của mọi người trong ngày lễ tốt nghiệp sắp tới sẽ là niềm vinh dự và niềm hạnh phúc to lớn đối với mình. Rất mong được gặp mọi người để cùng chia sẻ niềm vui và lưu giữ những kỷ niệm đẹp trong cột mốc đặc biệt này.",
};

export default function GraduationInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const audioRef = useRef(null);
  const contentRef = useRef(null);
  
  const handleScroll = () => {
    if (contentRef.current) {
      if (contentRef.current.scrollTop > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    }
  };

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  
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

  // Tạo ra 30 đốm sáng ngẫu nhiên một lần duy nhất
  const sparkles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 3 + 2; // Kích thước từ 2px đến 5px
      const left = Math.random() * 100; // Vị trí ngẫu nhiên chiều ngang
      const animDuration = Math.random() * 8 + 8; // Tốc độ bay lên: 8s đến 16s
      const animDelay = Math.random() * 5; // Độ trễ xuất hiện ngẫu nhiên
      const twinkleDuration = Math.random() * 3 + 2; // Tốc độ chớp nháy: 2s đến 5s
      return (
        <div 
          key={i}
          className="gi-sparkle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            animationDuration: `${animDuration}s, ${twinkleDuration}s`,
            animationDelay: `${animDelay}s, ${animDelay}s`
          }}
        />
      );
    });
  }, []);

  return (
    <div className={`gi-page ${isOpen ? 'opened' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Great+Vibes&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');

        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden; /* Cực kỳ quan trọng: tắt thanh cuộn của trình duyệt */
          background-color: #E8E2D9; /* Màu nền phụ bên ngoài cho màn hình máy tính */
        }

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
          max-width: 1100px; /* Giới hạn độ rộng tối đa trên màn hình lớn */
          height: 100vh;
          margin: 0 auto; /* Căn giữa màn hình */
          box-shadow: 0 0 50px rgba(0,0,0,0.15); /* Đổ bóng tạo hiệu ứng thẻ cứng (card) */
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

        /* ---------------- Gold Sparkles ---------------- */
        .gi-sparkles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1; /* Nằm dưới nội dung nhưng trên nền chữ */
        }
        
        .gi-sparkle {
          position: absolute;
          bottom: -10px;
          background-color: #D4AF37; /* Màu vàng gold */
          border-radius: 50%;
          box-shadow: 0 0 8px 2px rgba(212, 175, 55, 0.5);
          opacity: 0;
          animation-name: floatUp, twinkle;
          animation-timing-function: linear, ease-in-out;
          animation-iteration-count: infinite, infinite;
          animation-direction: normal, alternate;
        }

        @keyframes floatUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-110vh); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.9; }
        }

        /* Nút Scroll To Top */
        .gi-scroll-top-btn {
          position: absolute;
          bottom: 95px;
          right: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--gold);
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(197, 165, 102, 0.5);
          z-index: 100;
          transition: all 0.3s ease;
          opacity: 0;
          pointer-events: none;
          transform: translateY(15px);
        }
        .gi-scroll-top-btn.visible {
          opacity: 0.9;
          pointer-events: auto;
          transform: translateY(0);
        }
        .gi-scroll-top-btn:hover {
          transform: translateY(-5px);
          opacity: 1;
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

        .gi-inner-content {
          margin-top: auto;
          margin-bottom: auto;
          width: 100%;
        }
        
        @media (max-width: 500px) {
          .ribbon-image-wrapper { right: -25px; width: 140px; height: 85vh; }
          .ribbon-name { font-size: 30px; }
          .ribbon-role { font-size: 11px; }
        }

        /* ---------------- Content Area ---------------- */
        .gi-content {
          position: relative;
          z-index: 2;
          padding: 60px 280px 20px 80px; 
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
        }
        
        @media (max-width: 500px) {
          .gi-content { 
            padding: 40px 180px 20px 20px; 
            overflow-x: hidden;
          } 
          .gi-title {
            font-size: 26px; /* Sẽ tự động xuống dòng khi thiếu chỗ */
            letter-spacing: 1px;
          }
          .gi-grad-name-line1, .gi-grad-name-line2 {
            font-size: clamp(24px, 7vw, 32px);
            white-space: nowrap;
          }
          .gi-scroll-top-btn {
            bottom: 75px !important;
            right: 20px !important;
            width: 45px !important;
            height: 45px !important;
          }
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
          font-weight: 700;
          font-size: 30px;
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

        .gi-grad-name-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 5px;
        }

        .gi-grad-name-line1, .gi-grad-name-line2 {
          font-family: 'Great Vibes', cursive;
          font-size: 42px;
          color: var(--gold);
          line-height: 0.85; /* Ép sát vào nhau một chút theo ý muốn */
          margin: 0;
        }

        /* Details */
        .gi-details-box {
          margin-bottom: 30px;
        }

        .gi-day, .gi-time {
          font-weight: 600;
          font-size: 14px;
          color: var(--ink-soft);
          margin: 0 0 5px 0;
          letter-spacing: 1px;
        }

        .gi-date {
          font-weight: 700;
          font-size: 16px;
          color: var(--maroon);
          margin: 0 0 5px 0;
          letter-spacing: 1px;
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
          font-size: 14px;
          color: var(--ink);
          line-height: 1.8;
          margin-top: 30px;
          text-align: justify;
        }

        /* Footer Nguồn */
        .gi-footer {
          text-align: center;
          font-size: 11px;
          color: var(--ink-soft);
          letter-spacing: 1px;
          opacity: 0.6;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 15px;
          margin-top: 40px; /* Khoảng cách dự phòng nếu nội dung quá dài */
        }
        .gi-footer strong {
          font-weight: 700;
          color: var(--maroon-deep);
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

      {/* Hiệu ứng hạt bụi vàng lấp lánh */}
      <div className="gi-sparkles-container">
        {sparkles}
      </div>

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
      <div 
        className="gi-content"
        ref={contentRef}
        onScroll={handleScroll}
      >
        <div className="gi-inner-content">
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
            <div className="gi-grad-name-container">
              <span className="gi-grad-name-line1">{content.gradName1}</span>
              <span className="gi-grad-name-line2">{content.gradName2}</span>
            </div>
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
        
        {/* Nguồn / Credit */}
        <div className="gi-footer">
          31/07 - <strong>h.namnam</strong>
        </div>
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

      {/* Floating Scroll To Top Button */}
      <button 
        className={`gi-scroll-top-btn ${showScrollTop ? 'visible' : ''}`} 
        onClick={scrollToTop} 
        title="Cuộn lên đầu trang"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

    </div>
  );
}